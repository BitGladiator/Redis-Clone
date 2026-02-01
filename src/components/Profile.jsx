import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Calendar, Trophy, Target, Flame, Star,
    ChevronRight, Edit2, Save, X, Award, TrendingUp,
    Clock, CheckCircle, Camera, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { getHistory, getGamification, BADGES } from '../lib/storage';

export function Profile({ onBack }) {
    const { theme } = useTheme();
    const { user, isAuthenticated, updateUserProfile } = useAuth();
    const isDark = theme === 'dark';

    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({ name: '', email: '' });
    const [history, setHistory] = useState([]);
    const [gamification, setGamification] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setHistory(getHistory().slice(0, 5)); // Get last 5 sessions
        setGamification(getGamification());
        if (user) {
            setEditData({ name: user.name || '', email: user.email || '' });
        }
    }, [user]);

    const handleSave = async () => {
        setLoading(true);
        const result = await updateUserProfile(editData);
        setLoading(false);

        if (result.success) {
            setEditMode(false);
        } else {
            alert(result.error || 'Failed to update profile');
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

    const calculateProgress = () => {
        if (!gamification) return 0;
        const currentLevelPoints = (gamification.level - 1) * 500;
        const pointsInLevel = gamification.points - currentLevelPoints;
        return (pointsInLevel / 500) * 100;
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-center">
                    <Shield size={48} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                    <h2 className={`text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Please Log In
                    </h2>
                    <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        You need to be logged in to view your profile
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] py-8 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                    >
                        <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            My Profile
                        </h1>
                        <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Manage your profile and track your progress
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`p-6 rounded-3xl border ${isDark
                                    ? 'bg-slate-800/40 border-slate-700/50'
                                    : 'bg-white border-slate-200 shadow-lg'
                                }`}
                        >
                            <div className="text-center">
                                {/* Avatar */}
                                <div className="relative inline-block mb-4">
                                    <div
                                        className={`w-28 h-28 rounded-2xl flex items-center justify-center text-3xl font-bold ${isDark
                                                ? 'bg-gradient-to-br from-[#2d6254] to-[#1a3c34]'
                                                : 'bg-gradient-to-br from-[#c5ddd4] to-[#8bc1af]'
                                            } ${isDark ? 'text-white' : 'text-[#1a3c34]'}`}
                                    >
                                        {getInitials(user.name)}
                                    </div>
                                    <div
                                        className={`absolute -bottom-2 -right-2 p-2 rounded-xl border-2 ${isDark
                                                ? 'bg-[#2d6254] border-slate-800'
                                                : 'bg-[#1a3c34] border-white'
                                            }`}
                                    >
                                        <Camera size={16} className="text-white" />
                                    </div>
                                </div>

                                {/* User Info */}
                                <h2 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    {user.name}
                                </h2>
                                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {user.email}
                                </p>

                                {/* Join Date */}
                                <div
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${isDark ? 'bg-white/5' : 'bg-slate-100'
                                        }`}
                                >
                                    <Calendar size={14} />
                                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                        Joined {formatDate(user.createdAt || new Date())}
                                    </span>
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => setEditMode(true)}
                                    className={`w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${isDark
                                            ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white'
                                            : 'bg-[#1a3c34] hover:bg-[#234e44] text-white'
                                        }`}
                                >
                                    <Edit2 size={18} />
                                    Edit Profile
                                </button>
                            </div>
                        </motion.div>

                        {/* Quick Stats */}
                        {gamification && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`p-6 rounded-3xl border ${isDark
                                        ? 'bg-slate-800/40 border-slate-700/50'
                                        : 'bg-white border-slate-200 shadow-lg'
                                    }`}
                            >
                                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    Level Progress
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                            Level {gamification.level}
                                        </span>
                                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                            {gamification.points} pts
                                        </span>
                                    </div>
                                    <div className="relative h-3 bg-slate-700/30 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${calculateProgress()}%` }}
                                            transition={{ duration: 1, delay: 0.3 }}
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2d6254] to-[#8bc1af] rounded-full"
                                        />
                                    </div>
                                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {500 - (gamification.points % 500)} points to Level {gamification.level + 1}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Stats & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Grid */}
                        {gamification && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f59d82] to-[#fcd5c8]">
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
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2d6254] to-[#6eb39d]">
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
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#1a3c34]">
                                        <Star size={24} className="text-[#f59d82]" />
                                    </div>
                                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                        Level {gamification.level}
                                    </div>
                                    <div className={`text-sm ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>Rank</div>
                                </motion.div>
                            </div>
                        )}

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`p-6 rounded-3xl border ${isDark
                                    ? 'bg-slate-800/40 border-slate-700/50'
                                    : 'bg-white border-slate-200 shadow-lg'
                                }`}
                        >
                            <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Recent Activity
                            </h3>
                            {history.length === 0 ? (
                                <div className="text-center py-8">
                                    <TrendingUp size={32} className={isDark ? 'text-slate-600 mx-auto mb-2' : 'text-slate-300 mx-auto mb-2'} />
                                    <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                        No interviews yet. Start practicing!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {history.map((session, idx) => (
                                        <motion.div
                                            key={session.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.35 + idx * 0.05 }}
                                            className={`p-4 rounded-xl border transition-all ${isDark
                                                    ? 'bg-slate-700/30 border-slate-600/50 hover:border-[#2d6254]/50'
                                                    : 'bg-slate-50 border-slate-200 hover:border-[#8bc1af]'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${(session.score || 70) >= 80
                                                                ? 'bg-[#c5ddd4] text-[#1a3c34]'
                                                                : (session.score || 70) >= 60
                                                                    ? 'bg-[#fef0ec] text-[#f59d82]'
                                                                    : 'bg-red-100 text-red-600'
                                                            }`}
                                                    >
                                                        {session.score || 70}
                                                    </div>
                                                    <div>
                                                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                                            {session.config?.role || 'Interview'}
                                                        </h4>
                                                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                            {formatDate(session.date)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight size={20} className={isDark ? 'text-slate-600' : 'text-slate-300'} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Achievements */}
                        {gamification && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`p-6 rounded-3xl border ${isDark
                                        ? 'bg-slate-800/40 border-slate-700/50'
                                        : 'bg-white border-slate-200 shadow-lg'
                                    }`}
                            >
                                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    Achievements
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {BADGES.slice(0, 4).map((badge, idx) => {
                                        const earned = gamification.badges.includes(badge.id);
                                        return (
                                            <motion.div
                                                key={badge.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.45 + idx * 0.05 }}
                                                className={`p-4 rounded-xl text-center border ${earned
                                                        ? isDark
                                                            ? 'bg-[#1a3c34]/30 border-[#2d6254]/50'
                                                            : 'bg-gradient-to-br from-[#e8f5f0] to-[#c5ddd4]/30 border-[#8bc1af]'
                                                        : isDark
                                                            ? 'bg-slate-800/30 border-slate-700/50 opacity-40'
                                                            : 'bg-slate-50 border-slate-200 opacity-40'
                                                    }`}
                                            >
                                                <Award size={24} className={`mx-auto mb-2 ${earned ? (isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]') : (isDark ? 'text-slate-600' : 'text-slate-300')}`} />
                                                <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                                    {badge.name}
                                                </p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Edit Profile Modal */}
            <AnimatePresence>
                {editMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setEditMode(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-md p-6 rounded-3xl border ${isDark
                                    ? 'bg-slate-900 border-slate-700'
                                    : 'bg-white border-slate-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                    Edit Profile
                                </h2>
                                <button
                                    onClick={() => setEditMode(false)}
                                    className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                                        }`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark
                                                ? 'bg-slate-800 border-slate-700 text-white focus:border-[#2d6254]'
                                                : 'bg-white border-slate-300 text-slate-900 focus:border-[#8bc1af]'
                                            } focus:outline-none focus:ring-2 focus:ring-[#2d6254]/20`}
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border transition-all ${isDark
                                                ? 'bg-slate-800 border-slate-700 text-white focus:border-[#2d6254]'
                                                : 'bg-white border-slate-300 text-slate-900 focus:border-[#8bc1af]'
                                            } focus:outline-none focus:ring-2 focus:ring-[#2d6254]/20`}
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${isDark
                                                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${isDark
                                                ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white'
                                                : 'bg-[#1a3c34] hover:bg-[#234e44] text-white'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Save size={18} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
