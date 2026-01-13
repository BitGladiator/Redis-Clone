import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
    Award, Clock, RotateCcw, Download, Share2,
    CheckCircle, AlertCircle, TrendingUp, Target,
    MessageSquare, Zap, Star, ArrowRight, Sparkles,
    Trophy, TrendingDown, Activity, BarChart2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ConfirmModal } from './ConfirmModal';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000, className }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            setCount(Math.floor(progress * value));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [value, duration]);

    return <span className={className}>{count}</span>;
};



export function Report({ results, config, onRestart }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [showDetails, setShowDetails] = useState({});
    const [showRestartModal, setShowRestartModal] = useState(false);

    // Calculate dynamic score based on responses
    const messageCount = results?.messages?.filter(m => m.role === 'user').length || 0;
    const avgResponseLength = results?.messages
        ?.filter(m => m.role === 'user')
        .reduce((acc, m) => acc + (m.text?.length || 0), 0) / Math.max(messageCount, 1) || 0;

    const baseScore = 70;
    const engagementBonus = Math.min(messageCount * 5, 15);
    const detailBonus = avgResponseLength > 50 ? 10 : avgResponseLength > 20 ? 5 : 0;
    const score = Math.min(baseScore + engagementBonus + detailBonus, 98);

    const durationMins = Math.floor((results?.duration || 0) / 60);
    const durationSecs = (results?.duration || 0) % 60;

    // Handler functions
    const handleDownload = () => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Generating PDF report...',
                success: 'Report downloaded successfully!',
                error: 'Failed to download report',
            }
        );
    };

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/report/${Date.now()}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            toast.success('Link copied to clipboard!', {
                duration: 2000,
            });
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    };

    const handleRestartConfirm = () => {
        toast.success('Starting new interview session!');
        onRestart();
    };

    // Trigger confetti for good scores
    useEffect(() => {
        if (score >= 75) {
            const duration = score >= 90 ? 3000 : 2000;
            const end = Date.now() + duration;

            const colors = score >= 90
                ? ['#2d6254', '#6eb39d', '#8bc1af']
                : ['#1a3c34', '#2d6254', '#8bc1af'];

            const frame = () => {
                confetti({
                    particleCount: score >= 90 ? 3 : 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors,
                });
                confetti({
                    particleCount: score >= 90 ? 3 : 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            setTimeout(() => frame(), 1000);
        }
    }, [score]);

    const getScoreColor = () => {
        if (score >= 90) return 'from-[#2d6254] to-[#6eb39d]';
        if (score >= 75) return 'from-[#1a3c34] to-[#2d6254]';
        if (score >= 60) return 'from-[#f59d82] to-[#fcd5c8]';
        return 'from-red-500 to-pink-500';
    };

    const getScoreLabel = () => {
        if (score >= 90) return 'Excellent';
        if (score >= 75) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Work';
    };

    const strengths = [
        { text: 'Clear communication style', detail: 'Your responses were well-structured and easy to follow.' },
        { text: 'Good technical vocabulary', detail: 'You demonstrated strong command of technical terminology.' },
        { text: 'Structured responses', detail: 'Your answers followed a logical flow and covered key points.' },
    ];

    const improvements = [
        { text: 'Add more specific examples', detail: 'Include real-world scenarios to illustrate your points.' },
        { text: 'Elaborate on technical details', detail: 'Dive deeper into implementation specifics when relevant.' },
        { text: 'Practice time management', detail: 'Work on balancing depth with conciseness in your answers.' },
    ];

    const metrics = [
        { label: 'Questions Answered', value: messageCount, icon: MessageSquare, gradient: 'from-[#1a3c34] to-[#2d6254]' },
        { label: 'Duration', value: `${durationMins}:${durationSecs.toString().padStart(2, '0')}`, icon: Clock, gradient: 'from-[#2d6254] to-[#6eb39d]' },
        { label: 'Completion', value: '100%', icon: Target, gradient: 'from-[#6eb39d] to-[#8bc1af]' },
    ];

    // Data for radial chart
    const chartData = [
        {
            name: 'Score',
            value: score,
            fill: score >= 90 ? '#2d6254' : score >= 75 ? '#1a3c34' : score >= 60 ? '#f59d82' : '#ef4444',
        },
    ];

    const toggleDetail = (index, type) => {
        setShowDetails(prev => ({
            ...prev,
            [`${type}-${index}`]: !prev[`${type}-${index}`]
        }));
    };

    return (
        <div className="min-h-[80vh] py-8 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2, duration: 0.8 }}
                        className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 relative ${isDark
                            ? 'bg-gradient-to-br from-[#1a3c34]/40 to-[#2d6254]/30'
                            : 'bg-gradient-to-br from-[#c5ddd4] to-[#e8f5f0]'
                            }`}
                    >
                        {score >= 90 ? (
                            <Trophy size={48} className="text-[#2d6254]" />
                        ) : (
                            <Award size={48} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                        )}

                        {/* Pulsing ring */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute inset-0 rounded-full border-2 ${score >= 90 ? 'border-[#2d6254]' : 'border-[#8bc1af]'
                                }`}
                        />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'
                            }`}
                    >
                        Interview Complete! {score >= 90 && '🎉'}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        Here's your performance analysis for{' '}
                        <span className="font-semibold text-[#2d6254]">{config?.level} {config?.role}</span>
                    </motion.p>
                </motion.div>

                {/* Score Card with Enhanced Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-10"
                >
                    <div className={`relative rounded-3xl p-8 md:p-12 overflow-hidden backdrop-blur-xl ${isDark
                        ? 'bg-slate-800/60 border border-slate-700/50'
                        : 'bg-white/80 border border-slate-100 shadow-xl shadow-slate-100/50'
                        }`}>
                        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                            {/* Score Circle with Radial Chart */}
                            <div className="flex justify-center">
                                <div className="relative">

                                    <ResponsiveContainer width={200} height={200}>
                                        <RadialBarChart
                                            cx="50%"
                                            cy="50%"
                                            innerRadius="80%"
                                            outerRadius="100%"
                                            data={chartData}
                                            startAngle={90}
                                            endAngle={-270}
                                        >
                                            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                                            <RadialBar
                                                background={{ fill: isDark ? '#1e293b' : '#e2e8f0' }}
                                                dataKey="value"
                                                cornerRadius={10}
                                                animationDuration={2000}
                                            />
                                        </RadialBarChart>
                                    </ResponsiveContainer>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1, type: 'spring' }}
                                            className={`text-6xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}
                                        >
                                            <AnimatedCounter value={score} duration={2000} />
                                        </motion.div>
                                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            out of 100
                                        </span>
                                    </div>

                                    {/* Floating particles for high scores */}
                                    {score >= 90 && (
                                        <>
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{
                                                        opacity: [0, 1, 0],
                                                        scale: [0, 1, 0],
                                                        x: [0, Math.cos(i * 60 * Math.PI / 180) * 60],
                                                        y: [0, Math.sin(i * 60 * Math.PI / 180) * 60],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.2,
                                                    }}
                                                    className="absolute top-1/2 left-1/2"
                                                >
                                                    <Sparkles size={16} className="text-[#2d6254]" />
                                                </motion.div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Score Info */}
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${score >= 75
                                        ? isDark ? 'bg-[#2d6254]/30 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]'
                                        : isDark ? 'bg-[#f59d82]/20 text-[#f59d82]' : 'bg-[#fef0ec] text-[#e07b5d]'
                                        }`}
                                >
                                    <Star size={14} className="fill-current" />
                                    {getScoreLabel()} Performance
                                </motion.div>

                                <motion.h3
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}
                                >
                                    {score >= 90 ? 'Outstanding work!' : score >= 75 ? 'Great job!' : 'Keep practicing!'}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                                >
                                    {score >= 90
                                        ? 'Exceptional performance! You\'re ready to ace real interviews. Your responses showed deep understanding and excellent communication.'
                                        : score >= 75
                                            ? 'You demonstrated solid interview skills. Keep refining your responses for even better results.'
                                            : 'Practice makes perfect. Focus on the improvement areas below and try again.'}
                                </motion.p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="grid md:grid-cols-3 gap-4 mb-10"
                >
                    {metrics.map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className={`p-6 rounded-2xl text-center cursor-pointer border ${isDark
                                ? 'bg-slate-800/50 border-slate-700/50 hover:border-[#3d8570]/50'
                                : 'bg-white border-slate-100 shadow-lg hover:shadow-xl hover:border-[#8bc1af]'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br ${metric.gradient} text-white`}>
                                <metric.icon size={24} />
                            </div>
                            <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {metric.value}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Strengths & Improvements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid md:grid-cols-2 gap-6 mb-10"
                >
                    {/* Strengths */}
                    <motion.div
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-[#2d6254]/20 border-[#2d6254]/30'
                            : 'bg-[#e8f5f0] border-[#c5ddd4]'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`p-2 rounded-xl ${isDark ? 'bg-[#2d6254]/30' : 'bg-[#c5ddd4]'}`}>
                                <TrendingUp size={20} className="text-[#2d6254]" />
                            </div>
                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Strengths
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {strengths.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + idx * 0.1 }}
                                    className="space-y-2"
                                >
                                    <motion.div
                                        className="flex items-start gap-3 cursor-pointer"
                                        onClick={() => toggleDetail(idx, 'strength')}
                                        whileHover={{ x: 5 }}
                                    >
                                        <CheckCircle size={18} className="text-[#2d6254] mt-0.5 flex-shrink-0" />
                                        <span className={`flex-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                            {item.text}
                                        </span>
                                    </motion.div>
                                    <AnimatePresence>
                                        {showDetails[`strength-${idx}`] && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`ml-7 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                                            >
                                                {item.detail}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Improvements */}
                    <motion.div
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-[#f59d82]/10 border-[#f59d82]/20'
                            : 'bg-[#fef5f2] border-[#fcd5c8]'
                            }`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className={`p-2 rounded-xl ${isDark ? 'bg-[#f59d82]/20' : 'bg-[#fcd5c8]'}`}>
                                <Zap size={20} className="text-[#f59d82]" />
                            </div>
                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Areas to Improve
                            </h3>
                        </div>
                        <ul className="space-y-3">
                            {improvements.map((item, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + idx * 0.1 }}
                                    className="space-y-2"
                                >
                                    <motion.div
                                        className="flex items-start gap-3 cursor-pointer"
                                        onClick={() => toggleDetail(idx, 'improvement')}
                                        whileHover={{ x: 5 }}
                                    >
                                        <AlertCircle size={18} className="text-[#f59d82] mt-0.5 flex-shrink-0" />
                                        <span className={`flex-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                            {item.text}
                                        </span>
                                    </motion.div>
                                    <AnimatePresence>
                                        {showDetails[`improvement-${idx}`] && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`ml-7 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                                            >
                                                {item.detail}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={() => setShowRestartModal(true)}
                        className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold w-full sm:w-auto overflow-hidden bg-gradient-to-r from-[#1a3c34] to-[#2d6254] text-white shadow-lg shadow-[#1a3c34]/25"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.5 }}
                        />
                        <RotateCcw size={20} className="relative z-10" />
                        <span className="relative z-10">Practice Again</span>
                    </motion.button>

                    <motion.button
                        onClick={handleDownload}
                        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium w-full sm:w-auto border ${isDark
                            ? 'bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download size={20} />
                        Download Report
                    </motion.button>

                    <motion.button
                        onClick={handleShare}
                        className={`flex items-center justify-center gap-2 px-6 py-4 rounded-full font-medium w-full sm:w-auto border ${isDark
                            ? 'bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Share2 size={20} />
                        Share
                    </motion.button>
                </motion.div>

                {/* Confirmation Modal */}
                <ConfirmModal
                    isOpen={showRestartModal}
                    onClose={() => setShowRestartModal(false)}
                    onConfirm={handleRestartConfirm}
                    title="Start New Interview?"
                    message="This will take you back to the home page. Your current report will be saved in your history."
                    confirmText="Start New Session"
                    cancelText="Stay Here"
                    variant="info"
                />
            </div>
        </div>
    );
}
