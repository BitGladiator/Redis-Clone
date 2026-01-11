import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoice } from '../hooks/useVoice';
import { Timer, XCircle, MessageSquare, Mic, MicOff, Volume2, VolumeX, Sparkles, Send } from 'lucide-react';
import { QUESTIONS } from '../lib/questions';
import { useTheme } from '../context/ThemeContext';

// Animated waveform visualization
const AudioWaveform = ({ isActive, color = "indigo" }) => (
    <div className="flex items-center justify-center gap-1 h-8">
        {[...Array(5)].map((_, i) => (
            <motion.div
                key={i}
                className={`w-1 rounded-full ${color === "indigo" ? "bg-indigo-500" : "bg-teal-500"
                    }`}
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

            // Wait a bit for final transcript to be captured
            setTimeout(() => {
                handleUserResponse();
            }, 500);
        } else {
            // Stop AI speech before starting to listen
            stopSpeaking();
            clearTranscript();

            // Small delay to ensure speech has stopped
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

        // If question doesn't have verification data (old format), use basic analysis
        if (!questionData || !questionData.expectedPoints) {
            return basicAnalysis(text);
        }

        const { expectedPoints, commonMistakes, keyTerms } = questionData;

        // Check which expected points were covered
        const coveredPoints = [];
        const missedPoints = [];

        expectedPoints.forEach(point => {
            const pointWords = point.toLowerCase().split(/\s+/);
            const keyWordsInPoint = pointWords.filter(w => w.length > 3); // Focus on meaningful words
            const matchCount = keyWordsInPoint.filter(word => userAnswer.includes(word)).length;

            if (matchCount >= Math.ceil(keyWordsInPoint.length * 0.4)) { // 40% match threshold
                coveredPoints.push(point);
            } else {
                missedPoints.push(point);
            }
        });

        // Check for common mistakes
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

        // Check for key terminology
        const usedKeyTerms = keyTerms ? keyTerms.filter(term =>
            userAnswer.includes(term.toLowerCase())
        ) : [];

        // Calculate correctness score
        const coverageScore = expectedPoints.length > 0
            ? (coveredPoints.length / expectedPoints.length) * 100
            : 50;

        // Build detailed feedback
        let feedback = [];

        // Overall assessment
        if (coverageScore >= 80) {
            feedback.push("Excellent answer!");
        } else if (coverageScore >= 60) {
            feedback.push("Good answer, but there's room for improvement.");
        } else if (coverageScore >= 40) {
            feedback.push("You're on the right track, but you missed some key points.");
        } else {
            feedback.push("Your answer needs more detail and accuracy.");
        }

        // What was correct
        if (coveredPoints.length > 0) {
            feedback.push(`\n\n✅ What you got right: ${coveredPoints.slice(0, 3).join(', ')}.`);
        }

        // What was missed
        if (missedPoints.length > 0) {
            const topMissed = missedPoints.slice(0, 2);
            feedback.push(`\n\n❌ What you missed: ${topMissed.join(', ')}.`);
        }

        // Detected mistakes
        if (detectedMistakes.length > 0) {
            feedback.push(`\n\n⚠️ Common misconception detected: ${detectedMistakes[0]}.`);
        }

        // Improvement suggestions
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

        // Show expected answer elements if score is low
        if (coverageScore < 60 && missedPoints.length > 0) {
            feedback.push(`\n\n📝 Key points to remember: ${missedPoints.slice(0, 3).join('; ')}.`);
        }

        return feedback.join(' ');
    };

    // Fallback basic analysis for questions without verification data
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
        // Get the current transcript
        const userText = getCurrentTranscript();

        console.log('Processing user response:', userText);

        if (!userText || userText.trim().length === 0) {
            setMessages(prev => [...prev, { role: 'user', text: '(No speech detected)' }]);
        } else {
            setMessages(prev => [...prev, { role: 'user', text: userText }]);
        }

        // Process after a short delay to show the processing state
        processingTimeoutRef.current = setTimeout(() => {
            const nextIdx = currentIdx + 1;

            // Get current question data for verification
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
        <div className="min-h-[80vh] py-8">
            {/* Header Bar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 mb-6 flex items-center justify-between ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full text-sm font-medium ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                        {config.role}
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'
                        }`}>
                        {config.level}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg font-semibold ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'
                        }`}>
                        <Timer size={18} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
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

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Main Interview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`lg:col-span-3 rounded-3xl p-8 relative overflow-hidden ${isDark
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                        }`}
                >
                    {/* Decorative elements */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-200/50'
                        }`} />
                    <div className={`absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl ${isDark ? 'bg-purple-500/10' : 'bg-purple-200/50'
                        }`} />

                    <div className="relative z-10">
                        {/* Status Badge */}
                        <div className="flex justify-center mb-6">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${interviewState === 'listening'
                                ? isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-700'
                                : interviewState === 'processing'
                                    ? isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                                    : isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                                }`}>
                                <span className={`w-2 h-2 rounded-full animate-pulse ${interviewState === 'listening' ? 'bg-teal-500'
                                    : interviewState === 'processing' ? 'bg-yellow-500'
                                        : 'bg-indigo-500'
                                    }`} />
                                {interviewState === 'listening' ? 'Listening...'
                                    : interviewState === 'processing' ? 'Processing...'
                                        : isSpeaking ? 'AI Speaking...' : 'Ready'}
                            </div>
                        </div>

                        {/* Current Question */}
                        <div className="text-center mb-10">
                            <p className={`text-sm uppercase tracking-wider mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'
                                }`}>
                                Question {currentIdx + 1} of {questions.length}
                            </p>
                            <h2 className={`text-2xl md:text-3xl font-display font-semibold leading-relaxed ${isDark ? 'text-white' : 'text-slate-900'
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
                            <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-white shadow-lg'
                                }`}>
                                {/* Pulse rings */}
                                {(isListening || isSpeaking) && (
                                    <>
                                        <motion.div
                                            className={`absolute inset-0 rounded-full ${isListening ? 'bg-teal-500/20' : 'bg-indigo-500/20'
                                                }`}
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.div
                                            className={`absolute inset-0 rounded-full ${isListening ? 'bg-teal-500/20' : 'bg-indigo-500/20'
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
                                        ? 'bg-gradient-to-br from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/30'
                                        : isDark
                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                                            : 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
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
                                        className={`max-w-lg text-center p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'
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
                    className={`lg:col-span-2 rounded-3xl overflow-hidden ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-lg'
                        }`}
                >
                    <div className={`p-4 border-b flex items-center gap-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'
                        }`}>
                        <MessageSquare size={18} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
                                        ? 'bg-indigo-500/20 text-slate-200'
                                        : 'bg-indigo-50 text-slate-800'
                                    : isDark
                                        ? 'bg-teal-500/20 text-slate-200'
                                        : 'bg-teal-50 text-slate-800'
                                    }`}>
                                    <p className="text-xs font-medium mb-1 opacity-60">
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
