import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '../hooks/useVoice';
import { Timer, XCircle, MessageSquare, Mic, MicOff, Volume2, VolumeX, Sparkles, Send } from 'lucide-react';
import { QUESTIONS } from '../lib/questions';
import { useTheme } from '../context/ThemeContext';

// Animated waveform visualization
const AudioWaveform = ({ isActive, color = "forest" }) => (
    <div className="flex items-center justify-center gap-1 h-8">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className={`w-1 rounded-full ${color === "forest" ? "bg-[#2d6254]" : "bg-[#8bc1af]"}`}
                animate={isActive ? {
                    height: [8, 24, 8],
                } : { height: 8 }}
                transition={{
                    duration: 0.5,
                    repeat: isActive ? Infinity : 0,
                    delay: i * 0.1,
                }}
            />
        ))}
    </div>
);

export function InterviewSession({ config, onEnd }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const {
        isListening,
        isSpeaking,
        speak,
        startListening,
        stopListening,
        stopSpeaking,
        transcript,
        finalTranscript,
        getCurrentTranscript,
        clearTranscript
    } = useVoice();

    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [timer, setTimer] = useState(0);
    const [interviewState, setInterviewState] = useState('intro');
    const messagesEndRef = useRef(null);
    const processingTimeoutRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const roleQuestions = QUESTIONS[config.role]?.[config.level] || QUESTIONS['frontend']['junior'];
        const shuffled = [...roleQuestions].sort(() => 0.5 - Math.random()).slice(0, 3);
        setQuestions(shuffled);
    }, [config]);

    useEffect(() => {
        if (questions.length === 0) return;
        if (interviewState === 'intro') {
            const firstQuestion = questions[0];
            const questionText = typeof firstQuestion === 'object' ? firstQuestion.question : firstQuestion;
            const greeting = `Hello! I'm ready to interview you for the ${config.level} ${config.role} position. Let's begin. ${questionText}`;
            setMessages([{ role: 'ai', text: greeting }]);
            speak(greeting);
            setInterviewState('asking');
        }
    }, [questions]);

    useEffect(() => {
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => {
            clearInterval(interval);
            if (processingTimeoutRef.current) {
                clearTimeout(processingTimeoutRef.current);
            }
        };
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEnd = () => {
        stopListening();
        stopSpeaking();
        onEnd({ messages, duration: timer });
    };

    const handleMicToggle = () => {
        if (isListening) {
            stopListening();
            setInterviewState('processing');
            setTimeout(() => {
                handleUserResponse();
            }, 500);
        } else {
            stopSpeaking();
            clearTranscript();
            setTimeout(() => {
                startListening();
                setInterviewState('listening');
            }, 150);
        }
    };

    const analyzeResponse = (text, questionData) => {
        if (!text || text.trim().length === 0) {
            return "I didn't catch that. Could you please speak louder or try again? ";
        }

        const userAnswer = text.toLowerCase();
        const words = userAnswer.split(/\s+/);

        if (!questionData || !questionData.expectedPoints) {
            return basicAnalysis(text);
        }

        const { expectedPoints, commonMistakes, keyTerms } = questionData;

        const coveredPoints = [];
        const missedPoints = [];

        expectedPoints.forEach(point => {
            const pointWords = point.toLowerCase().split(/\s+/);
            const keyWordsInPoint = pointWords.filter(w => w.length > 3);
            const matchCount = keyWordsInPoint.filter(word => userAnswer.includes(word)).length;

            if (matchCount >= Math.ceil(keyWordsInPoint.length * 0.4)) {
                coveredPoints.push(point);
            } else {
                missedPoints.push(point);
            }
        });

        const detectedMistakes = [];
        if (commonMistakes) {
            commonMistakes.forEach(mistake => {
                const mistakeWords = mistake.toLowerCase().split(/\s+/);
                const mistakeKeyWords = mistakeWords.filter(w => w.length > 3);
                const matchCount = mistakeKeyWords.filter(word => userAnswer.includes(word)).length;

                if (matchCount >= Math.ceil(mistakeKeyWords.length * 0.5)) {
                    detectedMistakes.push(mistake);
                }
            });
        }

        const usedKeyTerms = keyTerms ? keyTerms.filter(term =>
            userAnswer.includes(term.toLowerCase())
        ) : [];

        const coverageScore = expectedPoints.length > 0
            ? (coveredPoints.length / expectedPoints.length) * 100
            : 50;

        let feedback = [];

        if (coverageScore >= 80) {
            feedback.push("Excellent answer!");
        } else if (coverageScore >= 60) {
            feedback.push("Good answer, but there's room for improvement.");
        } else if (coverageScore >= 40) {
            feedback.push("You're on the right track, but you missed some key points.");
        } else {
            feedback.push("Your answer needs more detail and accuracy.");
        }

        if (coveredPoints.length > 0) {
            feedback.push(`\n\n✅ What you got right: ${coveredPoints.slice(0, 3).join(', ')}.`);
        }

        if (missedPoints.length > 0) {
            const topMissed = missedPoints.slice(0, 2);
            feedback.push(`\n\n❌ What you missed: ${topMissed.join(', ')}.`);
        }

        if (detectedMistakes.length > 0) {
            feedback.push(`\n\n⚠️ Common misconception detected: ${detectedMistakes[0]}.`);
        }

        const suggestions = [];
        if (usedKeyTerms.length < keyTerms.length / 2) {
            suggestions.push("use more technical terminology");
        }
        if (!/example|for instance|such as/i.test(text)) {
            suggestions.push("provide a concrete example");
        }
        if (text.length < 100) {
            suggestions.push("elaborate more on your points");
        }

        if (suggestions.length > 0) {
            feedback.push(`\n\n💡 Suggestion: Try to ${suggestions.slice(0, 2).join(' and ')}.`);
        }

        if (coverageScore < 60 && missedPoints.length > 0) {
            feedback.push(`\n\n📝 Key points to remember: ${missedPoints.slice(0, 3).join('; ')}.`);
        }

        return feedback.join(' ');
    };

    const basicAnalysis = (text) => {
        const words = text.toLowerCase().split(/\s+/);
        const charCount = text.trim().length;

        const technicalTerms = [
            'api', 'component', 'function', 'database', 'server', 'react', 'node',
            'javascript', 'python', 'algorithm', 'async', 'await', 'promise', 'closure',
            'prototype', 'inheritance', 'framework', 'library', 'rest', 'graphql',
            'authentication', 'authorization', 'optimization', 'performance', 'scalability',
            'microservices', 'cache', 'redux', 'state', 'props', 'hooks', 'lifecycle'
        ];
        const technicalCount = words.filter(w => technicalTerms.includes(w)).length;

        const hasExample = /example|for instance|such as|like when/i.test(text);
        const hasExplanation = /because|since|therefore|thus|so that/i.test(text);

        let feedback = [];

        if (charCount < 30) {
            feedback.push("That's quite brief. I'd love to hear more detail");
        } else if (charCount < 100) {
            feedback.push("Good start");
        } else {
            feedback.push("Great detailed response");
        }

        if (technicalCount >= 3) {
            feedback.push("I appreciate the technical terminology");
        }
        if (hasExample) {
            feedback.push("providing examples strengthens your answer");
        }
        if (hasExplanation) {
            feedback.push("your reasoning is clear");
        }

        return feedback.join(", ") + ".";
    };

    const handleUserResponse = () => {
        const userText = getCurrentTranscript();

        console.log('Processing user response:', userText);

        if (!userText || userText.trim().length === 0) {
            setMessages(prev => [...prev, { role: 'user', text: '(No speech detected)' }]);
        } else {
            setMessages(prev => [...prev, { role: 'user', text: userText }]);
        }

        processingTimeoutRef.current = setTimeout(() => {
            const nextIdx = currentIdx + 1;

            const currentQuestion = questions[currentIdx];
            const questionData = typeof currentQuestion === 'object' ? currentQuestion : null;

            const feedback = analyzeResponse(userText, questionData);

            if (nextIdx < questions.length) {
                setCurrentIdx(nextIdx);
                const nextQuestion = questions[nextIdx];
                const nextQuestionText = typeof nextQuestion === 'object' ? nextQuestion.question : nextQuestion;
                const text = `${feedback} Let's move on. ${nextQuestionText}`;
                setMessages(prev => [...prev, { role: 'ai', text }]);
                speak(text);
                setInterviewState('asking');
            } else {
                const closing = `${feedback} That wraps up our interview. You did well! I'm now generating your detailed performance report.`;
                setMessages(prev => [...prev, { role: 'ai', text: closing }]);
                speak(closing);
                setInterviewState('done');
                setTimeout(() => handleEnd(), 6000);
            }
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] py-8 px-6">
            {/* Header Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-6xl mx-auto rounded-2xl p-4 mb-6 flex items-center justify-between ${isDark
                    ? 'bg-slate-800/50 border border-slate-700/50'
                    : 'bg-white border border-slate-100 shadow-lg shadow-slate-100/50'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${isDark
                        ? 'bg-[#2d6254]/30 text-[#8bc1af]'
                        : 'bg-[#c5ddd4] text-[#1a3c34]'
                        }`}>
                        {config.role}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark
                        ? 'bg-slate-700 text-slate-400'
                        : 'bg-slate-100 text-slate-600'
                        }`}>
                        {config.level}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold ${isDark
                        ? 'bg-slate-700/50 text-white'
                        : 'bg-[#e8f5f0] text-[#1a3c34]'
                        }`}>
                        <Timer size={18} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                        {formatTime(timer)}
                    </div>
                    <motion.button
                        onClick={handleEnd}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isDark
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <XCircle size={16} />
                        End Session
                    </motion.button>
                </div>
            </motion.div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
                {/* Main Interview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`lg:col-span-3 rounded-3xl p-8 relative overflow-hidden ${isDark
                        ? 'bg-gradient-to-br from-[#1a3c34]/40 to-[#2d6254]/20 border border-[#2d6254]/30'
                        : 'bg-gradient-to-br from-[#e8f5f0] to-[#c5ddd4]/30 border border-[#c5ddd4]'
                        }`}
                >
                    {/* Decorative elements */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-[#2d6254]/20' : 'bg-[#8bc1af]/30'
                        }`} />
                    <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl ${isDark ? 'bg-[#f59d82]/10' : 'bg-[#fcd5c8]/50'
                        }`} />

                    <div className="relative z-10">
                        {/* Status Badge */}
                        <div className="flex justify-center mb-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${interviewState === 'listening'
                                ? isDark ? 'bg-[#8bc1af]/20 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]'
                                : interviewState === 'processing'
                                    ? isDark ? 'bg-[#f59d82]/20 text-[#f59d82]' : 'bg-[#fef0ec] text-[#e07b5d]'
                                    : isDark ? 'bg-[#2d6254]/30 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]'
                                }`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${interviewState === 'listening' ? 'bg-[#8bc1af]'
                                    : interviewState === 'processing' ? 'bg-[#f59d82]'
                                        : 'bg-[#2d6254]'
                                    }`} />
                                {interviewState === 'listening' ? 'Listening...'
                                    : interviewState === 'processing' ? 'Processing...'
                                        : isSpeaking ? 'AI Speaking...' : 'Ready'}
                            </div>
                        </div>

                        {/* Current Question */}
                        <div className="text-center mb-10">
                            <p className={`text-sm uppercase tracking-wider mb-3 ${isDark ? 'text-slate-500' : 'text-[#2d6254]'
                                }`}>
                                Question {currentIdx + 1} of {questions.length}
                            </p>
                            <h2 className={`text-2xl md:text-3xl font-bold leading-relaxed ${isDark ? 'text-white' : 'text-[#1a1a1a]'
                                }`}>
                                {questions[currentIdx]
                                    ? (typeof questions[currentIdx] === 'object'
                                        ? questions[currentIdx].question
                                        : questions[currentIdx])
                                    : "Preparing next question..."}
                            </h2>
                        </div>

                        {/* Voice Visualizer */}
                        <div className="flex flex-col items-center gap-6">
                            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-xl shadow-slate-200/50'
                                }`}>
                                {/* Pulse rings */}
                                {(isListening || isSpeaking) && (
                                    <>
                                        <motion.div
                                            className={`absolute inset-0 rounded-full ${isListening ? 'bg-[#8bc1af]/20' : 'bg-[#2d6254]/20'
                                                }`}
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className={`absolute inset-0 rounded-full ${isListening ? 'bg-[#8bc1af]/20' : 'bg-[#2d6254]/20'
                                                }`}
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        />
                                    </>
                                )}

                                <motion.button
                                    onClick={handleMicToggle}
                                    disabled={isSpeaking || interviewState === 'processing'}
                                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all ${isListening
                                        ? 'bg-gradient-to-br from-[#8bc1af] to-[#6eb39d] text-white shadow-lg shadow-[#8bc1af]/30'
                                        : isDark
                                            ? 'bg-gradient-to-br from-[#1a3c34] to-[#2d6254] text-white shadow-lg shadow-[#1a3c34]/30'
                                            : 'bg-gradient-to-br from-[#1a3c34] to-[#2d6254] text-white shadow-lg shadow-[#1a3c34]/30'
                                        } ${(isSpeaking || interviewState === 'processing') ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isListening ? <MicOff size={28} /> : <Mic size={28} />}
                                </motion.button>
                            </div>

                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {isListening
                                    ? "Listening... Click to stop"
                                    : isSpeaking
                                        ? "AI is speaking..."
                                        : "Click to start speaking"}
                            </p>

                            {/* Live transcription */}
                            <AnimatePresence>
                                {transcript && isListening && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`max-w-lg text-center p-4 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                                            }`}
                                    >
                                        <p className={`italic ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                            "{transcript}"
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Transcript Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`lg:col-span-2 rounded-3xl overflow-hidden ${isDark
                        ? 'bg-slate-800/50 border border-slate-700/50'
                        : 'bg-white border border-slate-100 shadow-xl shadow-slate-100/50'
                        }`}
                >
                    <div className={`p-4 border-b flex items-center gap-2 ${isDark
                        ? 'border-slate-700/50 bg-slate-800/50'
                        : 'border-slate-100 bg-[#e8f5f0]'
                        }`}>
                        <MessageSquare size={18} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Transcript
                        </h3>
                    </div>

                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Sparkles className="mx-auto mb-3 opacity-50" size={32} />
                                <p className="text-sm">Conversation will appear here...</p>
                            </div>
                        )}

                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'ai'
                                    ? isDark
                                        ? 'bg-[#2d6254]/30 text-slate-200'
                                        : 'bg-[#e8f5f0] text-slate-800'
                                    : isDark
                                        ? 'bg-[#8bc1af]/20 text-slate-200'
                                        : 'bg-[#c5ddd4] text-slate-800'
                                    }`}>
                                    <p className={`text-xs font-semibold mb-1 ${msg.role === 'ai'
                                        ? isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'
                                        : isDark ? 'text-[#8bc1af]' : 'text-[#1a3c34]'
                                        }`}>
                                        {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
                                    </p>
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
