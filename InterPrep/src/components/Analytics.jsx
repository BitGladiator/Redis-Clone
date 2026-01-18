import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    TrendingUp, Calendar, Target, Award, ChevronRight,
    Clock, Zap, Brain, Code, Sparkles, BarChart3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getHistory, getGamification } from '../lib/storage';

export function Analytics({ onBack }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [history, setHistory] = useState([]);
    const [gamification, setGamification] = useState(null);
    const [timeRange, setTimeRange] = useState('week');

    useEffect(() => {
        setHistory(getHistory());
        setGamification(getGamification());
    }, []);

    // Process data for charts
    const getChartData = () => {
        const now = new Date();
        const ranges = {
            week: 7,
            month: 30,
            year: 365,
        };
        const days = ranges[timeRange];

        const dailyData = [];
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const daySessions = history.filter(s =>
                s.date?.startsWith(dateStr)
            );

            dailyData.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                sessions: daySessions.length,
                avgScore: daySessions.length > 0
                    ? Math.round(daySessions.reduce((a, s) => a + (s.score || 70), 0) / daySessions.length)
                    : 0,
                totalTime: daySessions.reduce((a, s) => a + (s.duration || 0), 0) / 60,
            });
        }

        return dailyData;
    };

    const getRoleDistribution = () => {
        const roles = {};
        history.forEach(s => {
            const role = s.config?.role || 'unknown';
            roles[role] = (roles[role] || 0) + 1;
        });

        return Object.entries(roles).map(([name, value]) => ({ name, value }));
    };

    const getWeakAreas = () => {
        const roleScores = {};
        history.forEach(s => {
            const role = s.config?.role || 'unknown';
            if (!roleScores[role]) roleScores[role] = [];
            roleScores[role].push(s.score || 70);
        });

        return Object.entries(roleScores)
            .map(([role, scores]) => ({
                role,
                avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
                sessions: scores.length,
            }))
            .sort((a, b) => a.avgScore - b.avgScore);
    };

    const chartData = getChartData();
    const roleData = getRoleDistribution();
    const weakAreas = getWeakAreas();

    // New color palette matching landing page
    const COLORS = ['#1a3c34', '#2d6254', '#6eb39d', '#f59d82', '#fcd5c8', '#8bc1af'];

    const totalSessions = history.length;
    const avgScore = history.length > 0
        ? Math.round(history.reduce((a, s) => a + (s.score || 70), 0) / history.length)
        : 0;
    const totalTime = Math.round(history.reduce((a, s) => a + (s.duration || 0), 0) / 60);
    const bestScore = history.length > 0
        ? Math.max(...history.map(s => s.score || 0))
        : 0;

    const stats = [
        { label: 'Total Sessions', value: totalSessions, icon: Target, gradient: 'from-[#1a3c34] to-[#2d6254]' },
        { label: 'Average Score', value: `${avgScore}%`, icon: TrendingUp, gradient: 'from-[#2d6254] to-[#6eb39d]' },
        { label: 'Practice Time', value: `${totalTime}m`, icon: Clock, gradient: 'from-[#6eb39d] to-[#8bc1af]' },
        { label: 'Best Score', value: `${bestScore}%`, icon: Award, gradient: 'from-[#f59d82] to-[#fcd5c8]' },
    ];

    return (
        <div className="min-h-[80vh] py-8 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                           
                            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Performance Insights
                            </h1>
                            <p className={`mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Track your performance and identify areas for improvement
                            </p>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className={`flex gap-2 p-1.5 rounded-2xl ${isDark ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
                        {['week', 'month', 'year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${timeRange === range
                                    ? isDark
                                        ? 'bg-[#2d6254] text-white'
                                        : 'bg-[#1a3c34] text-white shadow-lg'
                                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -4 }}
                            className={`p-5 rounded-2xl border transition-all ${isDark
                                ? 'bg-slate-800/40 border-slate-700/50'
                                : 'bg-white border-slate-100 shadow-lg shadow-slate-100/50'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${stat.gradient} text-white`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {stat.value}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Performance Trend */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-slate-800/40 border-slate-700/50'
                            : 'bg-white border-slate-100 shadow-lg shadow-slate-100/50'
                            }`}
                    >
                        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Score Trend
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2d6254" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#2d6254" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} />
                                <XAxis dataKey="date" stroke={isDark ? '#666' : '#9ca3af'} fontSize={12} />
                                <YAxis stroke={isDark ? '#666' : '#9ca3af'} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#fff',
                                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="avgScore"
                                    stroke="#2d6254"
                                    fillOpacity={1}
                                    fill="url(#scoreGradient)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Practice Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-slate-800/40 border-slate-700/50'
                            : 'bg-white border-slate-100 shadow-lg shadow-slate-100/50'
                            }`}
                    >
                        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Practice Activity
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#e5e7eb'} />
                                <XAxis dataKey="date" stroke={isDark ? '#666' : '#9ca3af'} fontSize={12} />
                                <YAxis stroke={isDark ? '#666' : '#9ca3af'} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#fff',
                                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                                    }}
                                />
                                <Bar dataKey="sessions" fill="#6eb39d" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Role Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-slate-800/40 border-slate-700/50'
                            : 'bg-white border-slate-100 shadow-lg shadow-slate-100/50'
                            }`}
                    >
                        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Practice by Category
                        </h3>
                        {roleData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={roleData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {roleData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                                <Sparkles size={32} className={`mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                                    No data yet. Start practicing!
                                </p>
                            </div>
                        )}
                    </motion.div>

                    {/* Weak Areas */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`p-6 rounded-2xl border ${isDark
                            ? 'bg-slate-800/40 border-slate-700/50'
                            : 'bg-white border-slate-100 shadow-lg shadow-slate-100/50'
                            }`}
                    >
                        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Areas to Improve
                        </h3>
                        {weakAreas.length > 0 ? (
                            <div className="space-y-5">
                                {weakAreas.map((area, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={`text-sm font-semibold capitalize ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                                {area.role}
                                            </span>
                                            <span className={`text-sm font-bold ${area.avgScore >= 80
                                                ? 'text-[#2d6254]'
                                                : area.avgScore >= 60
                                                    ? 'text-[#f59d82]'
                                                    : 'text-red-500'
                                                }`}>
                                                {area.avgScore}%
                                            </span>
                                        </div>
                                        <div className={`h-3 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${area.avgScore}%` }}
                                                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                                                className={`h-full rounded-full ${area.avgScore >= 80
                                                    ? 'bg-gradient-to-r from-[#2d6254] to-[#6eb39d]'
                                                    : area.avgScore >= 60
                                                        ? 'bg-gradient-to-r from-[#f59d82] to-[#fcd5c8]'
                                                        : 'bg-gradient-to-r from-red-500 to-red-400'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                                <Brain size={32} className={`mx-auto mb-3 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                                <p className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                                    Complete sessions to see analysis
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
