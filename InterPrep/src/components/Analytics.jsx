import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    TrendingUp, Calendar, Target, Award, ChevronRight,
    Clock, Zap, Brain, Code
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

        // Create daily data
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

    const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'];

    const totalSessions = history.length;
    const avgScore = history.length > 0
        ? Math.round(history.reduce((a, s) => a + (s.score || 70), 0) / history.length)
        : 0;
    const totalTime = Math.round(history.reduce((a, s) => a + (s.duration || 0), 0) / 60);
    const bestScore = history.length > 0
        ? Math.max(...history.map(s => s.score || 0))
        : 0;

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
                                Analytics Dashboard
                            </h1>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Track your performance and identify areas for improvement
                            </p>
                        </div>
                    </div>

                    {/* Time Range Selector */}
                    <div className={`flex gap-2 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                        {['week', 'month', 'year'].map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${timeRange === range
                                        ? isDark ? 'bg-white text-slate-900' : 'bg-white text-slate-900 shadow'
                                        : isDark ? 'text-slate-400' : 'text-slate-600'
                                    }`}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Sessions', value: totalSessions, icon: Target, color: 'indigo' },
                        { label: 'Average Score', value: `${avgScore}%`, icon: TrendingUp, color: 'emerald' },
                        { label: 'Total Practice Time', value: `${totalTime}m`, icon: Clock, color: 'purple' },
                        { label: 'Best Score', value: `${bestScore}%`, icon: Award, color: 'yellow' },
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`p-4 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                                }`}
                        >
                            <stat.icon size={24} className={`mb-2 text-${stat.color}-500`} />
                            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Score Trend
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#eee'} />
                                <XAxis dataKey="date" stroke={isDark ? '#666' : '#999'} fontSize={12} />
                                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e1e1e' : '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="avgScore"
                                    stroke="#6366f1"
                                    fillOpacity={1}
                                    fill="url(#scoreGradient)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Practice Activity */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Practice Activity
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#333' : '#eee'} />
                                <XAxis dataKey="date" stroke={isDark ? '#666' : '#999'} fontSize={12} />
                                <YAxis stroke={isDark ? '#666' : '#999'} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e1e1e' : '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                    }}
                                />
                                <Bar dataKey="sessions" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Role Distribution */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
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
                                        paddingAngle={2}
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
                            <div className={`text-center py-16 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                No data yet. Start practicing!
                            </div>
                        )}
                    </div>

                    {/* Weak Areas */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Areas to Improve
                        </h3>
                        {weakAreas.length > 0 ? (
                            <div className="space-y-4">
                                {weakAreas.map((area, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className={`w-24 text-sm font-medium capitalize ${isDark ? 'text-slate-300' : 'text-slate-700'
                                            }`}>
                                            {area.role}
                                        </div>
                                        <div className="flex-1 h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${area.avgScore >= 80 ? 'bg-emerald-500' :
                                                        area.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                style={{ width: `${area.avgScore}%` }}
                                            />
                                        </div>
                                        <div className={`w-12 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'
                                            }`}>
                                            {area.avgScore}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={`text-center py-16 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                Complete sessions to see analysis
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
