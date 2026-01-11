import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mic, Brain, Target, ChevronRight,
    Users, Play, ArrowRight, BarChart3, Sparkles,
    CheckCircle2, Terminal, Cpu, Globe
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// --- Animated Background Component ---
const Background = ({ isDark }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base Gradient */}
            <div className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-slate-950'
                    : 'bg-slate-50'
                }`} />

            {/* Animated Blobs */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-200/40'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-purple-900/30' : 'bg-purple-200/40'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className={`absolute bottom-0 left-1/3 w-[800px] h-[600px] rounded-full blur-[130px] ${isDark ? 'bg-cyan-900/20' : 'bg-cyan-200/40'
                        }`}
                />
            </div>

            {/* Grid Overlay */}
            <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay`} />
            <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`} />
        </div>
    );
};

// --- Navbar Component ---
const Navbar = ({ isDark }) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 h-16 border-b backdrop-blur-md ${isDark ? 'bg-slate-950/50 border-white/5' : 'bg-white/50 border-slate-200/50'
            }`}
    >
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <Sparkles size={18} />
                </div>
                <span className={`font-bold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    InterPrep
                </span>
            </div>

            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium hover:text-indigo-500 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
            >
                GitHub
            </a>
        </div>
    </motion.nav>
);

const features = [
    {
        icon: Mic,
        title: 'Voice-Powered AI',
        desc: 'Speak naturally with our advanced AI interviewer that understands context and nuance.',
        color: 'from-blue-500 to-cyan-500'
    },
    {
        icon: Brain,
        title: 'Real-time Feedback',
        desc: 'Get instant, actionable coaching on your answers, tone, and pacing.',
        color: 'from-purple-500 to-pink-500'
    },
    {
        icon: Terminal,
        title: 'Live Coding',
        desc: 'Solve algorithmic problems in a collaborative code editor with syntax highlighting.',
        color: 'from-green-500 to-emerald-500'
    },
    {
        icon: BarChart3,
        title: 'Performance Analytics',
        desc: 'Track your growth over time with detailed charts and skill breakdowns.',
        color: 'from-orange-500 to-red-500'
    },
];

const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: Globe, color: 'text-cyan-500' },
    { id: 'backend', label: 'Backend Developer', icon: Terminal, color: 'text-green-500' },
    { id: 'fullstack', label: 'Full Stack Engineer', icon: Cpu, color: 'text-purple-500' },
    { id: 'systemDesign', label: 'System Design', icon: Target, color: 'text-orange-500' },
    { id: 'behavioral', label: 'Behavioral Round', icon: Users, color: 'text-pink-500' },
];

const levels = [
    { id: 'junior', label: 'Junior (0-2 YOE)', desc: 'Focus on fundamentals' },
    { id: 'mid', label: 'Mid-Level (3-5 YOE)', desc: 'System design & depth' },
    { id: 'senior', label: 'Senior (5+ YOE)', desc: 'Leadership & scale' },
];

export function Landing({ onStart }) {
    const { theme } = useTheme();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const configRef = useRef(null);
    const isDark = theme === 'dark';

    const handleStart = () => {
        if (selectedRole && selectedLevel) {
            onStart({ role: selectedRole, level: selectedLevel, difficulty: 'medium', timer: 'untimed' });
        }
    };

    const scrollToConfig = () => {
        configRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`min-h-screen w-full font-sans selection:bg-indigo-500/30 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            <Background isDark={isDark} />
            <Navbar isDark={isDark} />

            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center">
                <div className="max-w-5xl mx-auto text-center z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-8 border backdrop-blur-md shadow-sm ${isDark
                                ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                                : 'bg-white/80 text-indigo-600 border-indigo-100'
                            }`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        AI-Powered Mock Interviews
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
                    >
                        Master Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x bg-300%">
                            Tech Interview
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={`text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                    >
                        Practice with an intelligent AI that adapts to your responses,
                        challenges your logic, and helps you land the job.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={scrollToConfig}
                            className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                Start Practicing Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button className={`px-8 py-4 rounded-2xl font-semibold text-lg border transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer ${isDark
                                ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                            }`}>
                            <Play size={20} className="fill-current" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className={`mt-20 pt-10 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Active Users', value: '10,000+' },
                                { label: 'Interviews Conducted', value: '50k+' },
                                { label: 'Offer Rate', value: '89%' },
                                { label: 'Companies', value: '120+' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {stat.value}
                                    </div>
                                    <div className={`text-sm font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className={`py-20 relative overflow-hidden ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to prep</h2>
                        <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Comprehensive tools designed to simulate real-world interview conditions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl ${isDark
                                        ? 'bg-slate-800/20 border-slate-700/50 hover:border-indigo-500/30 hover:bg-slate-800/40'
                                        : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-100'
                                    }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                                    <feature.icon size={28} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {feature.title}
                                </h3>
                                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONFIGURATION SECTION */}
            <section ref={configRef} className="py-32 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`rounded-[2.5rem] p-8 md:p-12 border shadow-2xl relative overflow-hidden ${isDark
                                ? 'bg-slate-900/80 border-slate-700/50 backdrop-blur-xl'
                                : 'bg-white border-slate-200 shadow-slate-200/50'
                            }`}
                    >
                        {/* Background glow in card */}
                        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-50 ${isDark ? 'bg-indigo-600' : 'bg-indigo-300'}`} />
                        <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-50 ${isDark ? 'bg-purple-600' : 'bg-purple-300'}`} />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
                                Ready to start?
                            </h2>
                            <p className={`text-center mb-10 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Customize your interview session below
                            </p>

                            <div className="grid md:grid-cols-2 gap-12">
                                {/* Role Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider opacity-70">
                                        Select Role
                                    </label>
                                    <div className="space-y-3">
                                        {roles.map((role) => (
                                            <button
                                                key={role.id}
                                                onClick={() => setSelectedRole(role.id)}
                                                className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all duration-200 cursor-pointer ${selectedRole === role.id
                                                        ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50'
                                                        : isDark
                                                            ? 'border-slate-700/50 hover:bg-slate-800'
                                                            : 'border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} ${role.color}`}>
                                                    <role.icon size={20} />
                                                </div>
                                                <span className={`font-medium ${selectedRole === role.id ? 'text-indigo-500' : ''}`}>
                                                    {role.label}
                                                </span>
                                                {selectedRole === role.id && (
                                                    <CheckCircle2 size={18} className="ml-auto text-indigo-500" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Level Selection */}
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-sm font-semibold uppercase tracking-wider opacity-70">
                                            Experience Level
                                        </label>
                                        <div className="space-y-3">
                                            {levels.map((level) => (
                                                <button
                                                    key={level.id}
                                                    onClick={() => setSelectedLevel(level.id)}
                                                    className={`w-full p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${selectedLevel === level.id
                                                            ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50'
                                                            : isDark
                                                                ? 'border-slate-700/50 hover:bg-slate-800'
                                                                : 'border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className={`font-medium ${selectedLevel === level.id ? 'text-indigo-500' : ''}`}>
                                                            {level.label}
                                                        </span>
                                                        {selectedLevel === level.id && (
                                                            <CheckCircle2 size={18} className="text-indigo-500" />
                                                        )}
                                                    </div>
                                                    <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                                        {level.desc}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            onClick={handleStart}
                                            disabled={!selectedRole || !selectedLevel}
                                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${selectedRole && selectedLevel
                                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'
                                                    : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                                }`}
                                        >
                                            Start Interview Session
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
