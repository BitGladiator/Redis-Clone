import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Mic, Brain, Target, ChevronRight,
    Users, Play, ArrowRight, BarChart3, Sparkles,
    CheckCircle2, Terminal, Cpu, Globe, Heart, Zap, Flame
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// --- Enhanced Parallax Background Component ---
const ParallaxBackground = ({ isDark, scrollY }) => {
    // Create smooth spring animations for scroll
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base Gradient with parallax */}
            <motion.div
                style={{ y: y3 }}
                className={`absolute inset-0 transition-colors duration-700 ${isDark
                    ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
                    : 'bg-gradient-to-b from-slate-50 via-white to-slate-50'
                    }`}
            />

            {/* Floating Particles */}
            <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * 800,
                            scale: Math.random() * 0.5 + 0.5
                        }}
                        animate={{
                            y: [null, Math.random() * -100 - 50],
                            x: [null, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-indigo-400/30' : 'bg-indigo-600/20'
                            }`}
                        style={{
                            boxShadow: isDark
                                ? '0 0 10px 2px rgba(99, 102, 241, 0.3)'
                                : '0 0 10px 2px rgba(99, 102, 241, 0.2)'
                        }}
                    />
                ))}
            </motion.div>

            {/* Animated Gradient Orbs with Parallax */}
            <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-40">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] ${isDark ? 'bg-indigo-900/40' : 'bg-indigo-200/40'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-purple-900/30' : 'bg-purple-200/40'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className={`absolute bottom-0 left-1/3 w-[800px] h-[600px] rounded-full blur-[130px] ${isDark ? 'bg-cyan-900/20' : 'bg-cyan-200/40'
                        }`}
                />
            </motion.div>

            {/* Grid Overlay with Parallax */}
            <motion.div
                style={{ y: y3, opacity }}
                className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay`}
            />
            <motion.div
                style={{ y: y2 }}
                className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`}
            />
        </div>
    );
};



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

const difficulties = [
    { id: 'easy', label: 'Easy', icon: Heart, desc: 'Gentle warm-up questions', color: 'text-green-500', bgColor: 'bg-green-500' },
    { id: 'medium', label: 'Medium', icon: Zap, desc: 'Standard interview level', color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
    { id: 'hard', label: 'Hard', icon: Flame, desc: 'Challenging deep-dive', color: 'text-red-500', bgColor: 'bg-red-500' },
];

export function Landing({ onStart }) {
    const { theme } = useTheme();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const configRef = useRef(null);
    const containerRef = useRef(null);
    const isDark = theme === 'dark';

    // Parallax scroll tracking
    const { scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Smooth spring animation for scroll
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleStart = () => {
        if (selectedRole && selectedLevel && selectedDifficulty) {
            onStart({ role: selectedRole, level: selectedLevel, difficulty: selectedDifficulty, timer: 'untimed' });
        }
    };

    const scrollToConfig = () => {
        configRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div ref={containerRef} className={`min-h-screen w-full font-sans selection:bg-indigo-500/30 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            <ParallaxBackground isDark={isDark} scrollY={smoothScrollY} />


            {/* HERO SECTION */}
            <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center">
                <motion.div
                    style={{
                        y: useTransform(smoothScrollY, [0, 500], [0, -100]),
                        scale: useTransform(smoothScrollY, [0, 500], [1, 0.95])
                    }}
                    className="max-w-5xl mx-auto text-center z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ y: useTransform(smoothScrollY, [0, 500], [0, -50]) }}
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
                        style={{ y: useTransform(smoothScrollY, [0, 500], [0, -80]) }}
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
                        style={{ y: useTransform(smoothScrollY, [0, 500], [0, -60]) }}
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
                        style={{ y: useTransform(smoothScrollY, [0, 500], [0, -40]) }}
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

                    {/* Demo Video Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            y: useTransform(smoothScrollY, [0, 500], [0, -30]),
                            scale: useTransform(smoothScrollY, [0, 500], [1, 0.9]),
                            rotateX: useTransform(smoothScrollY, [0, 500], [0, 5])
                        }}
                        className="mt-16 max-w-5xl mx-auto"
                    >
                        <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${isDark
                            ? 'shadow-indigo-500/10 border border-white/10'
                            : 'shadow-slate-300/50 border border-slate-200'
                            }`}>
                            {/* Demo Video */}
                            <div className="relative aspect-video bg-slate-900">
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                >
                                    <source src="/videos/demo.mov" type="video/quicktime" />
                                    <source src="/videos/demo.mov" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Overlay with demo badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-sm font-semibold text-white">Live Demo</span>
                                    </div>
                                </div>

                                {/* Glassmorphism overlay border */}
                                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 pointer-events-none" />
                            </div>
                        </div>

                        {/* Video description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className={`text-center mt-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                        >
                            Watch how InterPrep guides you through a complete interview session
                        </motion.p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        style={{ y: useTransform(smoothScrollY, [0, 500], [0, -20]) }}
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
                </motion.div>
            </section>

            {/* FEATURES SECTION */}
            <section className={`py-20 relative overflow-hidden ${isDark ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        className="text-center mb-16"
                        style={{
                            y: useTransform(smoothScrollY, [300, 800], [50, -50]),
                            opacity: useTransform(smoothScrollY, [300, 600], [0, 1])
                        }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to prep</h2>
                        <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Comprehensive tools designed to simulate real-world interview conditions.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    y: useTransform(smoothScrollY, [400, 1000], [0, -(idx * 20 + 20)]),
                                    rotateY: useTransform(smoothScrollY, [400, 1000], [0, idx % 2 === 0 ? 2 : -2])
                                }}
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
                <div className="max-w-6xl mx-auto">
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

                            <div className="grid md:grid-cols-3 gap-8">
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
                                                <span className={`font-medium text-sm ${selectedRole === role.id ? 'text-indigo-500' : ''}`}>
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
                                                    <span className={`font-medium text-sm ${selectedLevel === level.id ? 'text-indigo-500' : ''}`}>
                                                        {level.label}
                                                    </span>
                                                    {selectedLevel === level.id && (
                                                        <CheckCircle2 size={18} className="text-indigo-500" />
                                                    )}
                                                </div>
                                                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                                    {level.desc}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Difficulty Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider opacity-70">
                                        Difficulty
                                    </label>
                                    <div className="space-y-3">
                                        {difficulties.map((difficulty) => (
                                            <button
                                                key={difficulty.id}
                                                onClick={() => setSelectedDifficulty(difficulty.id)}
                                                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${selectedDifficulty === difficulty.id
                                                    ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50'
                                                    : isDark
                                                        ? 'border-slate-700/50 hover:bg-slate-800'
                                                        : 'border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-1">
                                                    <div className={`p-1.5 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                                                        <difficulty.icon size={16} className={difficulty.color} />
                                                    </div>
                                                    <span className={`font-medium text-sm ${selectedDifficulty === difficulty.id ? 'text-indigo-500' : ''}`}>
                                                        {difficulty.label}
                                                    </span>
                                                    {selectedDifficulty === difficulty.id && (
                                                        <CheckCircle2 size={18} className="ml-auto text-indigo-500" />
                                                    )}
                                                </div>
                                                <div className={`text-xs ml-9 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                                    {difficulty.desc}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Start Button */}
                            <div className="pt-8 mt-8 border-t border-slate-700/50">
                                <button
                                    onClick={handleStart}
                                    disabled={!selectedRole || !selectedLevel || !selectedDifficulty}
                                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${selectedRole && selectedLevel && selectedDifficulty
                                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95'
                                        : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                                        }`}
                                >
                                    Start Interview Session
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
