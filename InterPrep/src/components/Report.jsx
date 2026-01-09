import React from 'react';
import { motion } from 'framer-motion';
import {
    Award, Clock, RotateCcw, Download, Share2,
    CheckCircle, AlertCircle, TrendingUp, Target,
    MessageSquare, Zap, Star, ArrowRight, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Report({ results, config, onRestart }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

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

    const getScoreColor = () => {
        if (score >= 90) return 'from-emerald-500 to-teal-500';
        if (score >= 75) return 'from-indigo-500 to-purple-500';
        if (score >= 60) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };

    const getScoreLabel = () => {
        if (score >= 90) return 'Excellent';
        if (score >= 75) return 'Good';
        if (score >= 60) return 'Fair';
        return 'Needs Work';
    };

    const strengths = [
        'Clear communication style',
        'Good technical vocabulary',
        'Structured responses',
    ];

    const improvements = [
        'Add more specific examples',
        'Elaborate on technical details',
        'Practice time management',
    ];

    const metrics = [
        { label: 'Questions Answered', value: messageCount, icon: MessageSquare },
        { label: 'Duration', value: `${durationMins}:${durationSecs.toString().padStart(2, '0')}`, icon: Clock },
        { label: 'Completion', value: '100%', icon: Target },
    ];

    return (
        <div className="min-h-[80vh] py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'
                        }`}
                >
                    <Award size={40} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                </motion.div>

                <h1 className={`text-4xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                    Interview Complete!
                </h1>
                <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Here's your performance analysis for
                    <span className="font-semibold"> {config?.level} {config?.role}</span>
                </p>
            </motion.div>

            {/* Score Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-4xl mx-auto mb-10"
            >
                <div className={`relative rounded-3xl p-8 md:p-12 overflow-hidden ${isDark
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                    }`}>
                    {/* Decorative */}
                    <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-50 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-200'
                        }`} />

                    <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                        {/* Score Circle */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <svg className="w-48 h-48 transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        strokeWidth="12"
                                        fill="none"
                                        className={isDark ? 'stroke-white/10' : 'stroke-slate-200'}
                                    />
                                    <motion.circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeLinecap="round"
                                        className={`stroke-current text-indigo-500`}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: score / 100 }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        style={{
                                            strokeDasharray: 553,
                                            strokeDashoffset: 553 - (553 * score) / 100,
                                        }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className={`text-5xl font-bold font-display bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}
                                    >
                                        {score}
                                    </motion.span>
                                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        out of 100
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Score Info */}
                        <div>
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${score >= 75
                                    ? isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                                    : isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                <Star size={14} className="fill-current" />
                                {getScoreLabel()} Performance
                            </div>

                            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {score >= 75 ? 'Great job!' : 'Keep practicing!'}
                            </h3>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                {score >= 75
                                    ? 'You demonstrated solid interview skills. Keep refining your responses for even better results.'
                                    : 'Practice makes perfect. Focus on the improvement areas below and try again.'}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10"
            >
                {metrics.map((metric, idx) => (
                    <div
                        key={idx}
                        className={`p-6 rounded-2xl text-center ${isDark
                                ? 'bg-white/5 border border-white/10'
                                : 'bg-white border border-slate-200 shadow-sm'
                            }`}
                    >
                        <metric.icon size={24} className={`mx-auto mb-3 ${isDark ? 'text-indigo-400' : 'text-indigo-600'
                            }`} />
                        <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {metric.value}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {metric.label}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Strengths & Improvements */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10"
            >
                {/* Strengths */}
                <div className={`p-6 rounded-2xl ${isDark
                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                        : 'bg-emerald-50 border border-emerald-100'
                    }`}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'
                            }`}>
                            <TrendingUp size={20} className="text-emerald-500" />
                        </div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Strengths
                        </h3>
                    </div>
                    <ul className="space-y-3">
                        {strengths.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Improvements */}
                <div className={`p-6 rounded-2xl ${isDark
                        ? 'bg-amber-500/10 border border-amber-500/20'
                        : 'bg-amber-50 border border-amber-100'
                    }`}>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`p-2 rounded-lg ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'
                            }`}>
                            <Zap size={20} className="text-amber-500" />
                        </div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Areas to Improve
                        </h3>
                    </div>
                    <ul className="space-y-3">
                        {improvements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
            >
                <motion.button
                    onClick={onRestart}
                    className={`flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold w-full sm:w-auto ${isDark
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <RotateCcw size={20} />
                    Practice Again
                </motion.button>

                <motion.button
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium w-full sm:w-auto ${isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Download size={20} />
                    Download Report
                </motion.button>

                <motion.button
                    className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium w-full sm:w-auto ${isDark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Share2 size={20} />
                    Share
                </motion.button>
            </motion.div>
        </div>
    );
}
