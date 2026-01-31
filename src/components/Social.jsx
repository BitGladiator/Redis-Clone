import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Share2, MessageSquare, Trophy, Globe,
    ChevronRight, Heart, Send, ExternalLink, Copy, Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getGamification, getHistory } from '../lib/storage';

// Community questions (mock data)
const COMMUNITY_QUESTIONS = [
    {
        id: 1,
        author: 'Alex Chen',
        avatar: '👨‍💻',
        role: 'SWE at Google',
        question: 'How would you design a distributed rate limiter?',
        category: 'System Design',
        likes: 45,
        answers: 12,
        timeAgo: '2h ago',
    },
    {
        id: 2,
        author: 'Sarah Kim',
        avatar: '👩‍💻',
        role: 'Frontend at Meta',
        question: 'Best practices for optimizing React performance in large apps?',
        category: 'Frontend',
        likes: 38,
        answers: 8,
        timeAgo: '5h ago',
    },
    {
        id: 3,
        author: 'Mike Johnson',
        avatar: '🧑‍💻',
        role: 'Backend at Netflix',
        question: 'How do you handle database migrations in a microservices architecture?',
        category: 'Backend',
        likes: 29,
        answers: 6,
        timeAgo: '1d ago',
    },
    {
        id: 4,
        author: 'Priya Patel',
        avatar: '👩‍🔬',
        role: 'ML Engineer at OpenAI',
        question: 'What are the best techniques for handling imbalanced datasets?',
        category: 'Data Science',
        likes: 52,
        answers: 15,
        timeAgo: '2d ago',
    },
];

const LEADERBOARD = [
    { rank: 1, name: 'TechNinja', score: 15420, streak: 45, badge: '🏆' },
    { rank: 2, name: 'CodeMaster', score: 14850, streak: 38, badge: '🥈' },
    { rank: 3, name: 'AlgoQueen', score: 13920, streak: 42, badge: '🥉' },
    { rank: 4, name: 'DevPro', score: 12650, streak: 30, badge: '' },
    { rank: 5, name: 'ByteWizard', score: 11890, streak: 28, badge: '' },
];

export function Social({ onBack }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('community');
    const [copied, setCopied] = useState(false);

    const gamification = getGamification();
    const history = getHistory();
    const totalScore = gamification?.points || 0;
    const bestScore = history.length > 0 ? Math.max(...history.map(s => s.score || 0)) : 0;

    const shareToLinkedIn = () => {
        const text = `I've been practicing tech interviews with InterPrep! 🎯\n\n📊 My stats:\n• ${history.length} practice sessions\n• Best score: ${bestScore}%\n• ${gamification?.badges?.length || 0} badges earned\n\nCheck it out: `;
        const url = 'https://interprep.app'; // placeholder
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`;
        window.open(linkedInUrl, '_blank');
    };

    const shareToTwitter = () => {
        const text = `Leveling up my interview skills with @InterPrep! 🚀\n\n${history.length} sessions completed with a best score of ${bestScore}%\n\n#TechInterviews #CareerGrowth`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const copyShareLink = () => {
        navigator.clipboard.writeText(`Check out InterPrep - AI Interview Practice! https://interprep.app`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                                Community
                            </h1>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Connect, share, and learn with others
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex gap-2 p-1 rounded-xl mb-8 w-fit ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    {[
                        { id: 'community', label: 'Questions', icon: MessageSquare },
                        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                        { id: 'share', label: 'Share Progress', icon: Share2 },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id
                                    ? isDark ? 'bg-white text-slate-900' : 'bg-white text-slate-900 shadow'
                                    : isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Community Questions */}
                {activeTab === 'community' && (
                    <div className="space-y-4">
                        {/* Ask Question Button */}
                        <div className={`p-4 rounded-2xl flex items-center gap-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
                            }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'
                                }`}>
                                💭
                            </div>
                            <input
                                type="text"
                                placeholder="Ask the community a question..."
                                className={`flex-1 bg-transparent outline-none ${isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-900 placeholder:text-slate-400'
                                    }`}
                            />
                            <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-medium">
                                <Send size={18} />
                            </button>
                        </div>

                        {/* Questions List */}
                        {COMMUNITY_QUESTIONS.map((q) => (
                            <motion.div
                                key={q.id}
                                whileHover={{ scale: 1.01 }}
                                className={`p-5 rounded-2xl ${isDark
                                        ? 'bg-white/5 border border-white/10'
                                        : 'bg-white border border-slate-200 shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">{q.avatar}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                {q.author}
                                            </span>
                                            <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                                • {q.role}
                                            </span>
                                            <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                                • {q.timeAgo}
                                            </span>
                                        </div>
                                        <p className={`text-lg mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                            {q.question}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                                                }`}>
                                                {q.category}
                                            </span>
                                            <button className={`flex items-center gap-1 text-sm ${isDark ? 'text-slate-400 hover:text-pink-400' : 'text-slate-500 hover:text-pink-500'
                                                }`}>
                                                <Heart size={16} /> {q.likes}
                                            </button>
                                            <button className={`flex items-center gap-1 text-sm ${isDark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-500 hover:text-indigo-500'
                                                }`}>
                                                <MessageSquare size={16} /> {q.answers} answers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Leaderboard */}
                {activeTab === 'leaderboard' && (
                    <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
                        }`}>
                        <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                🏆 Global Leaderboard
                            </h3>
                        </div>
                        <div className="divide-y divide-white/10">
                            {LEADERBOARD.map((user, idx) => (
                                <div
                                    key={user.rank}
                                    className={`flex items-center gap-4 p-4 ${user.rank <= 3
                                            ? isDark ? 'bg-yellow-500/5' : 'bg-yellow-50'
                                            : ''
                                        }`}
                                >
                                    <div className={`w-8 text-center font-bold ${user.rank === 1 ? 'text-yellow-500' :
                                            user.rank === 2 ? 'text-slate-400' :
                                                user.rank === 3 ? 'text-orange-500' :
                                                    isDark ? 'text-slate-500' : 'text-slate-400'
                                        }`}>
                                        {user.badge || `#${user.rank}`}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            {user.name}
                                        </div>
                                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                            🔥 {user.streak} day streak
                                        </div>
                                    </div>
                                    <div className={`font-bold text-lg ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                        {user.score.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Your Position */}
                        <div className={`p-4 border-t ${isDark ? 'border-white/10 bg-indigo-500/10' : 'border-slate-200 bg-indigo-50'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-8 text-center font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    #42
                                </div>
                                <div className="flex-1">
                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        You
                                    </div>
                                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        🔥 {gamification?.streak || 0} day streak
                                    </div>
                                </div>
                                <div className={`font-bold text-lg ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                    {totalScore.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Share Progress */}
                {activeTab === 'share' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Share Card Preview */}
                        <div className={`p-6 rounded-2xl ${isDark
                                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10'
                                : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                            }`}>
                            <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Your Achievement Card
                            </h3>
                            <div className={`p-6 rounded-xl ${isDark ? 'bg-black/30' : 'bg-white shadow'}`}>
                                <div className="text-center">
                                    <div className="text-4xl mb-2">🎯</div>
                                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Interview Practice Pro
                                    </h4>
                                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        InterPrep
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div>
                                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                {history.length}
                                            </div>
                                            <div className="text-xs text-slate-500">Sessions</div>
                                        </div>
                                        <div>
                                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                {bestScore}%
                                            </div>
                                            <div className="text-xs text-slate-500">Best Score</div>
                                        </div>
                                        <div>
                                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                {gamification?.badges?.length || 0}
                                            </div>
                                            <div className="text-xs text-slate-500">Badges</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Share Options */}
                        <div className="space-y-4">
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Share Your Progress
                            </h3>

                            <motion.button
                                onClick={shareToLinkedIn}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-slate-50 border border-slate-200'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                                    in
                                </div>
                                <div className="flex-1 text-left">
                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Share on LinkedIn
                                    </div>
                                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Show your network you're preparing
                                    </div>
                                </div>
                                <ExternalLink size={20} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                            </motion.button>

                            <motion.button
                                onClick={shareToTwitter}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-slate-50 border border-slate-200'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-lg bg-black flex items-center justify-center text-white font-bold">
                                    𝕏
                                </div>
                                <div className="flex-1 text-left">
                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        Share on X (Twitter)
                                    </div>
                                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Tweet your achievements
                                    </div>
                                </div>
                                <ExternalLink size={20} className={isDark ? 'text-slate-400' : 'text-slate-500'} />
                            </motion.button>

                            <motion.button
                                onClick={copyShareLink}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-slate-50 border border-slate-200'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'
                                    }`}>
                                    {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {copied ? 'Copied!' : 'Copy Link'}
                                    </div>
                                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        Share with friends directly
                                    </div>
                                </div>
                            </motion.button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
