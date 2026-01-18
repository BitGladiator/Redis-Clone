import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    History as HistoryIcon, Calendar, Clock, Target,
    ChevronRight, Trash2, Trophy, TrendingUp, Award,
    Flame, Star, Zap, Sparkles, CheckCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getHistory, clearHistory, getGamification, BADGES } from '../lib/storage';

export function History({ onBack, onStartNew }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [history, setHistory] = useState([]);
    const [gamification, setGamification] = useState(null);
    const [activeTab, setActiveTab] = useState('history');

    useEffect(() => {
        setHistory(getHistory());
        setGamification(getGamification());
    }, []);

    const handleClear = () => {
        if (confirm('Clear all practice history?')) {
            clearHistory();
            setHistory([]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-[80vh] py-8 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                           
                            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Track Your Journey
                            </h1>
                            <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Monitor your interview practice progress and achievements
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                {gamification && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`p-5 rounded-2xl text-center border ${isDark
                                ? 'bg-[#1a3c34]/30 border-[#2d6254]/30'
                                : 'bg-gradient-to-br from-[#e8f5f0] to-[#c5ddd4]/50 border-[#c5ddd4]'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${isDark ? 'bg-[#2d6254]' : 'bg-[#2d6254]'}`}>
                                <Trophy size={24} className="text-white" />
                            </div>
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {gamification.points}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>Points</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className={`p-5 rounded-2xl text-center border ${isDark
                                ? 'bg-[#f59d82]/10 border-[#f59d82]/20'
                                : 'bg-gradient-to-br from-[#fef5f2] to-[#fcd5c8]/50 border-[#fcd5c8]'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f59d82] to-[#fcd5c8]`}>
                                <Flame size={24} className="text-white" />
                            </div>
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {gamification.streak}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-[#f59d82]' : 'text-[#e07b5d]'}`}>Day Streak</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`p-5 rounded-2xl text-center border ${isDark
                                ? 'bg-[#2d6254]/20 border-[#3d8570]/30'
                                : 'bg-gradient-to-br from-[#f0f9f6] to-[#e8f5f0] border-[#c5ddd4]'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d6254] to-[#6eb39d]`}>
                                <Target size={24} className="text-white" />
                            </div>
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {gamification.totalSessions}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>Sessions</div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className={`p-5 rounded-2xl text-center border ${isDark
                                ? 'bg-[#1a3c34]/30 border-[#2d6254]/30'
                                : 'bg-gradient-to-br from-[#e8f5f0] to-white border-[#c5ddd4]'
                                }`}
                        >
                            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#1a3c34]`}>
                                <Star size={24} className="text-[#f59d82]" />
                            </div>
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Level {gamification.level}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>Rank</div>
                        </motion.div>
                    </div>
                )}

                {/* Tabs */}
                <div className={`flex gap-2 p-1.5 rounded-2xl mb-6 w-fit ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                    {['history', 'badges'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab
                                ? isDark
                                    ? 'bg-[#2d6254] text-white'
                                    : 'bg-[#1a3c34] text-white shadow-lg'
                                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="space-y-4">
                        {history.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`text-center py-16 rounded-3xl border ${isDark
                                    ? 'bg-slate-800/30 border-slate-700/50'
                                    : 'bg-white border-slate-200 shadow-lg shadow-slate-100/50'
                                    }`}
                            >
                                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${isDark ? 'bg-[#2d6254]/20' : 'bg-[#c5ddd4]/50'}`}>
                                    <HistoryIcon size={40} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    No practice history yet
                                </h3>
                                <p className={`mb-8 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Complete your first interview to start tracking your progress
                                </p>
                                <motion.button
                                    onClick={onStartNew}
                                    className="px-8 py-4 bg-[#1a3c34] hover:bg-[#234e44] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Start Practice
                                </motion.button>
                            </motion.div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                        {history.length} practice session{history.length !== 1 ? 's' : ''}
                                    </p>
                                    <button
                                        onClick={handleClear}
                                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all ${isDark
                                            ? 'text-red-400 hover:bg-red-500/10'
                                            : 'text-red-600 hover:bg-red-50'
                                            }`}
                                    >
                                        <Trash2 size={16} />
                                        Clear All
                                    </button>
                                </div>

                                {history.map((session, idx) => (
                                    <motion.div
                                        key={session.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        whileHover={{ y: -2 }}
                                        className={`p-5 rounded-2xl transition-all cursor-pointer border ${isDark
                                            ? 'bg-slate-800/40 border-slate-700/50 hover:border-[#3d8570]/50'
                                            : 'bg-white border-slate-100 shadow-md hover:shadow-lg hover:border-[#8bc1af]'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold ${(session.score || 70) >= 80
                                                    ? 'bg-[#c5ddd4] text-[#1a3c34]'
                                                    : (session.score || 70) >= 60
                                                        ? 'bg-[#fef0ec] text-[#f59d82]'
                                                        : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {session.score || 70}
                                                </div>
                                                <div>
                                                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                                        {session.config?.role || 'Interview'} - {session.config?.level || 'Practice'}
                                                    </h4>
                                                    <div className={`flex items-center gap-4 text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar size={14} />
                                                            {formatDate(session.date)}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Clock size={14} />
                                                            {formatDuration(session.duration || 0)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                                        </div>
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </div>
                )}

                {/* Badges Tab */}
                {activeTab === 'badges' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {BADGES.map((badge, idx) => {
                            const earned = gamification?.badges?.includes(badge.id);
                            return (
                                <motion.div
                                    key={badge.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -4 }}
                                    className={`p-5 rounded-2xl text-center transition-all border ${earned
                                        ? isDark
                                            ? 'bg-[#1a3c34]/30 border-[#2d6254]/50'
                                            : 'bg-gradient-to-br from-[#e8f5f0] to-[#c5ddd4]/30 border-[#8bc1af]'
                                        : isDark
                                            ? 'bg-slate-800/30 border-slate-700/50 opacity-50'
                                            : 'bg-slate-50 border-slate-200 opacity-50'
                                        }`}
                                >
                                    <div className="text-4xl mb-3">{badge.icon}</div>
                                    <h4 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                        {badge.name}
                                    </h4>
                                    <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {badge.description}
                                    </p>
                                    {earned && (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2d6254] text-white text-xs font-medium">
                                            <CheckCircle size={12} />
                                            Earned!
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
