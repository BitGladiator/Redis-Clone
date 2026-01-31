import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, Zap, PenTool, ChevronRight, Play, Pause,
    SkipForward, AlertTriangle, Target, Brain, Users,
    Timer, ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useVoice } from '../hooks/useVoice';
import { QUESTIONS } from '../lib/questions';

const SIMULATION_MODES = [
    {
        id: 'full',
        title: 'Full Interview',
        description: '45-minute complete interview simulation with multiple rounds',
        icon: Target,
        duration: 45 * 60,
        rounds: ['Intro', 'Technical', 'Behavioral', 'Q&A'],
        color: 'indigo',
    },
    {
        id: 'speed',
        title: 'Speed Round',
        description: '30 seconds per answer - test your quick thinking',
        icon: Zap,
        duration: 30,
        questions: 10,
        color: 'orange',
    },
    {
        id: 'whiteboard',
        title: 'Whiteboard Mode',
        description: 'System design with drawing canvas',
        icon: PenTool,
        duration: 30 * 60,
        color: 'purple',
    },
];

// Speed Round Component
function SpeedRound({ config, onEnd }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const { speak, startListening, stopListening, isListening, lastUserMessage } = useVoice();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [answers, setAnswers] = useState([]);
    const [phase, setPhase] = useState('ready');
    const [questions, setQuestions] = useState([]);
    const timerRef = useRef(null);

    useEffect(() => {
        // Get random questions
        const allQuestions = Object.values(QUESTIONS)
            .flatMap(category => Object.values(category))
            .flat();
        const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
    }, []);

    useEffect(() => {
        if (phase === 'answering') {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        nextQuestion();
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [phase, currentQuestion]);

    const startRound = () => {
        setPhase('answering');
        speak("Let's begin! 30 seconds per question. Go!");
        startListening();
    };

    const nextQuestion = () => {
        stopListening();
        setAnswers(prev => [...prev, {
            question: questions[currentQuestion],
            answer: lastUserMessage || '(No answer)',
            time: 30 - timeLeft,
        }]);

        if (currentQuestion >= questions.length - 1) {
            setPhase('complete');
            speak("Speed round complete! Great job!");
            onEnd({ answers, mode: 'speed' });
        } else {
            setCurrentQuestion(prev => prev + 1);
            setTimeLeft(30);
            startListening();
        }
    };

    const progress = (currentQuestion / questions.length) * 100;
    const timeProgress = (timeLeft / 30) * 100;

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
            {phase === 'ready' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <Zap size={64} className="mx-auto mb-6 text-orange-500" />
                    <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Speed Round
                    </h2>
                    <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        You'll have 30 seconds to answer each question.
                        10 questions total. Ready?
                    </p>
                    <motion.button
                        onClick={startRound}
                        className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play className="inline mr-2" size={24} /> Start Speed Round
                    </motion.button>
                </motion.div>
            )}

            {phase === 'answering' && questions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full max-w-2xl"
                >
                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                Question {currentQuestion + 1} of {questions.length}
                            </span>
                            <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                {Math.round(progress)}% complete
                            </span>
                        </div>
                        <div className={`h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
                            <div
                                className="h-full rounded-full bg-orange-500 transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Timer */}
                    <div className={`relative w-32 h-32 mx-auto mb-8`}>
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                strokeWidth="8"
                                fill="none"
                                className={isDark ? 'stroke-white/10' : 'stroke-slate-200'}
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="56"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                className={timeLeft <= 10 ? 'stroke-red-500' : 'stroke-orange-500'}
                                style={{
                                    strokeDasharray: 352,
                                    strokeDashoffset: 352 - (352 * timeProgress) / 100,
                                    transition: 'stroke-dashoffset 1s linear',
                                }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-500' : isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                {timeLeft}
                            </span>
                        </div>
                    </div>

                    {/* Question */}
                    <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
                        }`}>
                        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {questions[currentQuestion]}
                        </h3>
                    </div>

                    {/* Status */}
                    <div className="flex justify-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isListening
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                            {isListening ? 'Listening...' : 'Not listening'}
                        </div>
                        <motion.button
                            onClick={nextQuestion}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500 text-white"
                            whileHover={{ scale: 1.05 }}
                        >
                            Skip <SkipForward size={16} />
                        </motion.button>
                    </div>
                </motion.div>
            )}

            {phase === 'complete' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Speed Round Complete!
                    </h2>
                    <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        You answered {answers.length} questions
                    </p>
                </motion.div>
            )}
        </div>
    );
}

// Whiteboard Mode Component
function WhiteboardMode({ onEnd }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#6366f1');
    const [brushSize, setBrushSize] = useState(3);
    const [timer, setTimer] = useState(30 * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prev => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = isDark ? '#1a1a2e' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, [isDark]);

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = isDark ? '#1a1a2e' : '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const colors = ['#6366f1', '#ef4444', '#22c55e', '#f59e0b', '#000000', '#ffffff'];

    return (
        <div className="min-h-[80vh] py-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <PenTool className="inline mr-2" /> System Design Whiteboard
                </h2>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg ${isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'
                        }`}>
                        <Timer size={20} /> {formatTime(timer)}
                    </div>
                    <motion.button
                        onClick={() => onEnd({ mode: 'whiteboard' })}
                        className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium"
                        whileHover={{ scale: 1.02 }}
                    >
                        Finish
                    </motion.button>
                </div>
            </div>

            {/* Prompt */}
            <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200'
                }`}>
                <h3 className={`font-semibold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                    Design Challenge: Design a URL Shortener (like bit.ly)
                </h3>
                <p className={`text-sm ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    Consider: High availability, scalability, analytics, expiration
                </p>
            </div>

            {/* Toolbar */}
            <div className={`flex items-center gap-4 mb-4 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'
                }`}>
                <div className="flex gap-2">
                    {colors.map((c) => (
                        <button
                            key={c}
                            onClick={() => setColor(c)}
                            className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-indigo-500 scale-110' : 'border-transparent'
                                }`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
                <div className="h-8 w-px bg-slate-300" />
                <div className="flex items-center gap-2">
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Size:</span>
                    {[2, 4, 8].map((size) => (
                        <button
                            key={size}
                            onClick={() => setBrushSize(size)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${brushSize === size
                                    ? 'bg-indigo-500 text-white'
                                    : isDark ? 'bg-white/10 text-white' : 'bg-white text-slate-700'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div className="h-8 w-px bg-slate-300" />
                <button
                    onClick={clearCanvas}
                    className={`px-4 py-2 rounded-lg ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-600'
                        }`}
                >
                    Clear
                </button>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                width={800}
                height={500}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
                onMouseLeave={stopDrawing}
                className={`w-full rounded-2xl cursor-crosshair ${isDark ? 'border border-white/10' : 'border border-slate-200'
                    }`}
                style={{ touchAction: 'none' }}
            />
        </div>
    );
}

export function SimulationModes({ onBack, onStart }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [selectedMode, setSelectedMode] = useState(null);
    const [activeSimulation, setActiveSimulation] = useState(null);

    const startSimulation = (mode) => {
        setActiveSimulation(mode);
    };

    const handleEnd = (results) => {
        setActiveSimulation(null);
        onStart && onStart(results);
    };

    if (activeSimulation === 'speed') {
        return <SpeedRound config={{}} onEnd={handleEnd} />;
    }

    if (activeSimulation === 'whiteboard') {
        return <WhiteboardMode onEnd={handleEnd} />;
    }

    return (
        <div className="min-h-[80vh] py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                    >
                        <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className={`text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Interview Simulations
                        </h1>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Practice with different interview formats
                        </p>
                    </div>
                </div>

                {/* Mode Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {SIMULATION_MODES.map((mode) => (
                        <motion.div
                            key={mode.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-6 rounded-2xl cursor-pointer ${selectedMode === mode.id
                                    ? isDark
                                        ? 'bg-indigo-500/20 border-2 border-indigo-500'
                                        : 'bg-indigo-50 border-2 border-indigo-500'
                                    : isDark
                                        ? 'bg-white/5 border border-white/10 hover:border-white/20'
                                        : 'bg-white border border-slate-200 hover:shadow-lg'
                                }`}
                            onClick={() => setSelectedMode(mode.id)}
                        >
                            <mode.icon size={48} className={`mb-4 text-${mode.color}-500`} />
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {mode.title}
                            </h3>
                            <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {mode.description}
                            </p>
                            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'
                                }`}>
                                <Clock size={14} />
                                {mode.id === 'speed'
                                    ? `${mode.duration}s per question`
                                    : `${mode.duration / 60} minutes`}
                            </div>
                            {mode.rounds && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {mode.rounds.map((round) => (
                                        <span
                                            key={round}
                                            className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            {round}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Start Button */}
                <AnimatePresence>
                    {selectedMode && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-8 text-center"
                        >
                            <motion.button
                                onClick={() => startSimulation(selectedMode)}
                                className="px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Start {SIMULATION_MODES.find(m => m.id === selectedMode)?.title}
                                <ArrowRight className="inline ml-2" size={20} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
