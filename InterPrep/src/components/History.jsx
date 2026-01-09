import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    History as HistoryIcon, Calendar, Clock, Target,
    ChevronRight, Trash2, Trophy, TrendingUp, Award,
    Flame, Star, Zap
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
        <div className="min-h-[80vh] py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                            <h1 className={`text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Your Progress
                            </h1>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Track your interview practice journey
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                {gamification && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10' : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                            }`}>
                            <Trophy size={24} className="mx-auto mb-2 text-indigo-500" />
                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {gamification.points}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Points</div>
                        </div>

                        <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10' : 'bg-gradient-to-br from-orange-50 to-red-50'
                            }`}>
                            <Flame size={24} className="mx-auto mb-2 text-orange-500" />
                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {gamification.streak}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Day Streak</div>
                        </div>

                        <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-white/10' : 'bg-gradient-to-br from-teal-50 to-emerald-50'
                            }`}>
                            <Target size={24} className="mx-auto mb-2 text-teal-500" />
                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {gamification.totalSessions}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Sessions</div>
                        </div>

                        <div className={`p-4 rounded-2xl text-center ${isDark ? 'bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-white/10' : 'bg-gradient-to-br from-yellow-50 to-amber-50'
                            }`}>
                            <Star size={24} className="mx-auto mb-2 text-yellow-500" />
                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Level {gamification.level}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Rank</div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className={`flex gap-2 p-1 rounded-xl mb-6 w-fit ${isDark ? 'bg-white/5' : 'bg-slate-100'
                    }`}>
                    {['history', 'badges'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab
                                    ? isDark ? 'bg-white text-slate-900' : 'bg-white text-slate-900 shadow'
                                    : isDark ? 'text-slate-400' : 'text-slate-600'
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
                            <div className={`text-center py-16 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-slate-50'
                                }`}>
                                <HistoryIcon size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    No practice history yet
                                </h3>
                                <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Complete your first interview to start tracking progress
                                </p>
                                <motion.button
                                    onClick={onStartNew}
                                    className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Start Practice
                                </motion.button>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center">
                                    <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                        {history.length} practice session{history.length !== 1 ? 's' : ''}
                                    </p>
                                    <button
                                        onClick={handleClear}
                                        className={`flex items-center gap-2 text-sm ${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
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
                                        className={`p-4 rounded-2xl ${isDark
                                                ? 'bg-white/5 border border-white/10'
                                                : 'bg-white border border-slate-200 shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${(session.score || 70) >= 80
                                                        ? 'bg-emerald-500/20 text-emerald-500'
                                                        : (session.score || 70) >= 60
                                                            ? 'bg-yellow-500/20 text-yellow-500'
                                                            : 'bg-red-500/20 text-red-500'
                                                    }`}>
                                                    {session.score || 70}
                                                </div>
                                                <div>
                                                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                        {session.config?.role || 'Interview'} - {session.config?.level || 'Practice'}
                                                    </h4>
                                                    <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {formatDate(session.date)}
                                                        </span>
                                                        <span className="flex items-center gap-1">
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
                        {BADGES.map((badge) => {
                            const earned = gamification?.badges?.includes(badge.id);
                            return (
                                <motion.div
                                    key={badge.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-4 rounded-2xl text-center transition-all ${earned
                                            ? isDark
                                                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30'
                                                : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'
                                            : isDark
                                                ? 'bg-white/5 border border-white/10 opacity-50'
                                                : 'bg-slate-50 border border-slate-200 opacity-50'
                                        }`}
                                >
                                    <div className="text-4xl mb-2">{badge.icon}</div>
                                    <h4 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {badge.name}
                                    </h4>
                                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {badge.description}
                                    </p>
                                    {earned && (
                                        <div className="mt-2">
                                            <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                                                Earned!
                                            </span>
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
