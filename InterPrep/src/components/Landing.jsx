import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mic, Brain, Target, ChevronRight,
    Users, Play, ArrowRight, BarChart3,
    CheckCircle2, Terminal, Cpu, Globe, Heart, Zap, Flame,
    Linkedin, Instagram, Mail, MoreHorizontal, MessageSquare,
    Video, Calendar, FileText, Send, Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// --- Floating Profile Card Component ---
const ProfileCard = ({ name, role, date, position, delay, isDark, avatarColor, showDate = true }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6 }}
        className={`absolute ${position} z-20 hidden lg:block`}
    >
        <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
            className={`rounded-2xl border p-4 backdrop-blur-sm ${isDark
                ? 'bg-slate-900/80 border-[#2d6254]/30 shadow-2xl shadow-black/40'
                : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
                }`}
        >
            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center overflow-hidden`}>
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{name}</div>
                            <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{role}</div>
                        </div>
                        <button className={`p-1 rounded-full flex-shrink-0 ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
                            <MoreHorizontal size={16} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                        </button>
                    </div>
                    {showDate && (
                        <div className="flex items-center justify-between mt-3">
                            <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{date}</div>
                            <div className="flex gap-1">
                                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"><Mail size={12} className="text-white" /></div>
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center"><Linkedin size={12} className="text-white" /></div>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Instagram size={12} className="text-white" /></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    </motion.div>
);

// --- Small Profile Badge ---
const ProfileBadge = ({ name, role, position, delay, isDark }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.6 }}
        className={`absolute ${position} z-20 hidden lg:block`}
    >
        <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 2 }}
            className="rounded-full px-4 py-2 flex items-center gap-2 bg-[#1a3c34] text-white"
        >
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white/20" />
            <div>
                <div className="font-semibold text-sm leading-tight">{name}</div>
                <div className="text-xs text-white/70">{role}</div>
            </div>
        </motion.div>
    </motion.div>
);

const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: Globe, color: 'text-[#2d6254]' },
    { id: 'backend', label: 'Backend Developer', icon: Terminal, color: 'text-[#1a3c34]' },
    { id: 'fullstack', label: 'Full Stack Engineer', icon: Cpu, color: 'text-[#3d8570]' },
    { id: 'systemDesign', label: 'System Design', icon: Target, color: 'text-[#f59d82]' },
    { id: 'behavioral', label: 'Behavioral Round', icon: Users, color: 'text-[#6eb39d]' },
];

const levels = [
    { id: 'junior', label: 'Junior (0-2 YOE)', desc: 'Focus on fundamentals' },
    { id: 'mid', label: 'Mid-Level (3-5 YOE)', desc: 'System design & depth' },
    { id: 'senior', label: 'Senior (5+ YOE)', desc: 'Leadership & scale' },
];

const difficulties = [
    { id: 'easy', label: 'Easy', icon: Heart, desc: 'Gentle warm-up questions', color: 'text-[#6eb39d]' },
    { id: 'medium', label: 'Medium', icon: Zap, desc: 'Standard interview level', color: 'text-[#f59d82]' },
    { id: 'hard', label: 'Hard', icon: Flame, desc: 'Challenging deep-dive', color: 'text-[#1a3c34]' },
];

const companies = ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix'];

const integrations = [
    { name: 'Zoom', color: 'bg-blue-500', icon: Video },
    { name: 'LinkedIn', color: 'bg-blue-600', icon: Linkedin },
    { name: 'Calendar', color: 'bg-green-500', icon: Calendar },
    { name: 'Teams', color: 'bg-purple-600', icon: Users },
    { name: 'Slack', color: 'bg-purple-500', icon: MessageSquare },
    { name: 'Docs', color: 'bg-blue-400', icon: FileText },
];

export function Landing({ onStart }) {
    const { theme } = useTheme();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const configRef = useRef(null);
    const isDark = theme === 'dark';

    const handleStart = () => {
        if (selectedRole && selectedLevel && selectedDifficulty) {
            onStart({ role: selectedRole, level: selectedLevel, difficulty: selectedDifficulty, timer: 'untimed' });
        }
    };

    const scrollToConfig = () => {
        configRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={`min-h-screen w-full font-sans selection:bg-[#2d6254]/30 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>

            {/* HERO SECTION */}
            <section className="relative pt-8 pb-32 px-6 min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">

                <ProfileCard name="Maria Angelica M" role="Product Designer" date="Start May 12, 2025" position="left-4 xl:left-20 top-4" delay={0.3} isDark={isDark} avatarColor="bg-orange-200" />
                <ProfileCard name="Marcus Alexandro" role="Product Manager" date="Start May 12, 2025" position="right-4 xl:right-20 top-12" delay={0.4} isDark={isDark} avatarColor="bg-blue-200" />
                <ProfileBadge name="Vinco Marconzo" role="Human Resources" position="left-4 xl:left-16 bottom-40" delay={0.5} isDark={isDark} />
                <ProfileBadge name="Robert Williamson" role="Head of HRD" position="right-4 xl:right-16 bottom-44" delay={0.6} isDark={isDark} />

                <div className="relative max-w-6xl mx-auto text-center z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Find Your</h1>

                        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 my-1">
                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Strategic</h1>

                            {/* Floating Interview Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
                                className="relative inline-block"
                                style={{ perspective: '1000px' }}
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0], rotateY: [-3, 3, -3], rotateX: [2, -2, 2] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="w-40 sm:w-44 md:w-48 rounded-xl overflow-hidden shadow-2xl shadow-[#1a3c34]/20" style={{ transform: 'rotateY(-5deg) rotateX(5deg)' }}>
                                        <div className="bg-[#1a3c34] p-3 sm:p-4">
                                            <div className="text-[#8bc1af] text-[10px] sm:text-xs font-medium mb-1">InterPrep</div>
                                            <div className="text-white font-bold text-sm sm:text-base leading-tight">Senior Frontend<br />Developer</div>
                                            <p className="text-[#8bc1af]/80 text-[9px] sm:text-[10px] mt-2 leading-relaxed line-clamp-2">You'll own the end-to-end process — from discovery, wireframes, prototypes.</p>
                                            <div className="flex gap-1.5 mt-2">
                                                <span className="px-2 py-0.5 rounded bg-[#f59d82] text-[#1a1a1a] text-[8px] sm:text-[9px] font-semibold">Full-Time</span>
                                                <span className="px-2 py-0.5 rounded bg-[#c5ddd4] text-[#1a3c34] text-[8px] sm:text-[9px] font-semibold">Senior Level</span>
                                            </div>
                                        </div>
                                        <div className={`p-3 sm:p-4 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                                            <div className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>$8,000/Month</div>
                                            <div className={`text-[9px] sm:text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>San Francisco, United States</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Interview</h1>
                        </div>

                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] ${isDark ? 'text-slate-400' : 'text-slate-300'}`}>Preparation Partner</h1>
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>From Today</h1>
                    </motion.div>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                        className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-8 mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Empower your interview prep with AI-driven tools to practice, assess, and master tech interviews efficiently.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                        <button onClick={scrollToConfig} className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 bg-[#2d6254] hover:bg-[#3d8570] text-white">
                            Get Started
                        </button>
                        <button className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center justify-center gap-2 border ${isDark ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white' : 'border-slate-300 bg-white hover:bg-slate-50 text-[#1a1a1a]'}`}>
                            <Play size={18} className="fill-current" /> Watch Demo
                        </button>
                    </motion.div>
                </div>

                {/* Company Logos */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }} className={`absolute bottom-6 left-0 right-0 border-t ${isDark ? 'border-white/5' : 'border-slate-200/80'}`}>
                    <div className="max-w-5xl mx-auto px-6 pt-6">
                        <div className="flex items-center justify-center gap-6 sm:gap-10 md:gap-16 overflow-x-auto pb-2">
                            {companies.map((company, idx) => (
                                <div key={idx} className={`text-base sm:text-lg md:text-xl font-bold whitespace-nowrap ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>{company}</div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ABOUT OUR PLATFORM SECTION */}
            <section className={`py-20 px-6 ${isDark ? 'bg-slate-900/40' : 'bg-[#f8faf9]'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="text-[#2d6254] text-sm font-medium mb-4">// About Our Platform //</div>
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Transform Your Interview <br />
                                Process With <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>Smarter, Faster,<br />Data-Driven Technology</span>
                            </h2>
                            <p className={`mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                From preparation to completion, our platform streamlines every step. Practice confidently with tools built to reduce anxiety and boost performance.
                            </p>
                            <button className="px-6 py-3 rounded-full font-semibold text-sm bg-[#2d6254] hover:bg-[#3d8570] text-white transition-all hover:scale-105">
                                About Us
                            </button>
                        </motion.div>

                        {/* Right Stats */}
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                            {/* Stat 1 */}
                            <div className={`p-6 rounded-2xl border-l-4 border-[#2d6254] transition-all ${isDark ? 'bg-slate-800/60 hover:bg-slate-800/80 border border-l-4 border-[#2d6254]/50' : 'bg-white'}`}>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>120k</span>
                                    <span className="text-[#2d6254] text-2xl font-bold">Users</span>
                                </div>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Candidates and professionals trust our tools to simplify interview prep and reduce time-to-hire.
                                </p>
                            </div>
                            {/* Stat 2 */}
                            <div className={`p-6 rounded-2xl border-l-4 border-[#f59d82] transition-all ${isDark ? 'bg-slate-800/60 hover:bg-slate-800/80 border border-l-4 border-[#f59d82]/50' : 'bg-white'}`}>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>120+</span>
                                    <span className="text-[#f59d82] text-2xl font-bold">Companies</span>
                                </div>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Join forward-thinking companies building better teams through structured, data-driven interview preparation.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* OUR FEATURES SECTION */}
            <section className={`py-24 px-6 ${isDark ? 'bg-slate-900/50 relative' : 'bg-slate-50'}`}>
                {/* Dark mode feature section glow */}
                {isDark && (
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, #2d6254 0%, transparent 70%)' }}
                    />
                )}
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <div className="text-[#2d6254] text-sm font-medium mb-4">// Our Features //</div>
                        <h2 className={`text-3xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                            Streamline Your Interview Workflow<br />
                            <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>From Start To Finish</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Feature 1 - AI Mock Interviews */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isDark ? 'bg-slate-800/50 border-[#2d6254]/20 hover:border-[#2d6254]/40 hover:bg-slate-800/70' : 'bg-white border-slate-100'}`} style={{ boxShadow: isDark ? '0 8px 40px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(45, 98, 84, 0.1)' : '0 8px 40px -8px rgba(0, 0, 0, 0.08)' }}>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>AI Mock Interviews</h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Practice with realistic AI interviews. Get instant feedback on your responses.</p>
                            </div>
                            <div className="p-4 bg-[#1a3c34] rounded-t-2xl mx-4 mb-4">
                                <div className="text-[#8bc1af] text-xs mb-1">InterPrep</div>
                                <div className="text-white font-bold mb-2">Senior Product Manager</div>
                                <p className="text-[#8bc1af]/70 text-xs mb-3">You'll own the end-to-end process — from discovery, wireframes, prototypes, and final UI.</p>
                                <div className="flex gap-2 mb-3">
                                    <span className="px-2 py-1 rounded bg-[#f59d82] text-[#1a1a1a] text-xs font-medium">Full-Time</span>
                                    <span className="px-2 py-1 rounded bg-[#c5ddd4] text-[#1a3c34] text-xs font-medium">Senior Level</span>
                                </div>
                                <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                                    <div className={`font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>$8,000/Month</div>
                                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>San Francisco, United States</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature 2 - Track Progress */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isDark ? 'bg-slate-800/50 border-[#2d6254]/20 hover:border-[#2d6254]/40 hover:bg-slate-800/70' : 'bg-white border-slate-100'}`} style={{ boxShadow: isDark ? '0 8px 40px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(45, 98, 84, 0.1)' : '0 8px 40px -8px rgba(0, 0, 0, 0.08)' }}>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Track Progress</h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Monitor your improvement. Gain full visibility into every stage of preparation.</p>
                            </div>
                            <div className={`mx-4 mb-4 p-4 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-300" />
                                    <div>
                                        <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Maria Angelica M</div>
                                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>2+ Exp | Product Designer</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-1 rounded text-xs ${isDark ? 'bg-slate-600 text-slate-300' : 'bg-white text-slate-600'}`}>9 File</span>
                                        <span className="px-2 py-1 rounded text-xs bg-[#c5ddd4] text-[#1a3c34]">78%</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#2d6254] flex items-center justify-center text-white">
                                        <Send size={14} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Feature 3 - Real-time Feedback */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                            className={`rounded-2xl overflow-hidden border transition-all duration-300 ${isDark ? 'bg-slate-800/50 border-[#2d6254]/20 hover:border-[#2d6254]/40 hover:bg-slate-800/70' : 'bg-white border-slate-100'}`} style={{ boxShadow: isDark ? '0 8px 40px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(45, 98, 84, 0.1)' : '0 8px 40px -8px rgba(0, 0, 0, 0.08)' }}>
                            <div className="p-6">
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Real-time Feedback</h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Get instant AI feedback on your responses. Improve with every practice session.</p>
                            </div>
                            <div className="mx-4 mb-4">
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
                                    ))}
                                </div>
                                <div className={`p-3 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-[#c5ddd4]'}`}>
                                    <p className="text-sm text-[#1a3c34] font-medium">Congrats!! you have been accepted to the next stage</p>
                                    <div className="flex items-center gap-1 mt-1 text-xs text-[#2d6254]">
                                        <span>13:00</span>
                                        <Check size={12} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* INTEGRATIONS SECTION */}
            <section className={`py-24 px-6 ${isDark ? 'bg-slate-900/40' : 'bg-white'}`}>
                <div className="max-w-4xl mx-auto text-center">
                    {/* Integration Icons Arc */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-48 mb-8">
                        {/* Arc line */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 border-t-2 border-dashed rounded-t-full ${isDark ? 'border-slate-700' : 'border-slate-200'}`} />

                        {/* Center Logo */}
                        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-16 h-16 rounded-xl bg-[#1a3c34] flex items-center justify-center shadow-xl">
                            <Brain size={28} className="text-[#8bc1af]" />
                        </div>

                        {/* Integration Icons */}
                        {integrations.map((item, idx) => {
                            const angle = (idx / (integrations.length - 1)) * Math.PI;
                            const x = Math.cos(angle) * 140;
                            const y = -Math.sin(angle) * 80;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * idx }}
                                    className={`absolute w-12 h-12 rounded-full ${item.color} flex items-center justify-center shadow-lg`}
                                    style={{ left: `calc(50% + ${x}px - 24px)`, top: `calc(50% + ${y}px - 24px)` }}
                                >
                                    <item.icon size={20} className="text-white" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        Connect With The <br />
                        Tools <span className={isDark ? 'text-slate-400' : 'text-slate-400'}>You Already Use Daily</span>
                    </h2>
                    <p className={`mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Effortlessly integrate with your favorite platforms with all in one unified interview experience.
                    </p>
                    <button className="px-8 py-3 rounded-full font-semibold bg-[#2d6254] hover:bg-[#3d8570] text-white transition-all hover:scale-105">
                        Get Started
                    </button>
                </div>
            </section>

            {/* CONFIGURATION SECTION */}
            <section id="config-section" ref={configRef} className="py-32 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        className={`rounded-[2.5rem] p-8 md:p-12 border relative overflow-hidden ${isDark ? 'bg-slate-900/80 border-slate-700/50 backdrop-blur-xl' : 'bg-white border-slate-200'}`}
                        style={{ boxShadow: isDark ? '0 20px 60px -12px rgba(0, 0, 0, 0.5)' : '0 20px 60px -12px rgba(0, 0, 0, 0.1)' }}>

                        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-50 ${isDark ? 'bg-[#2d6254]' : 'bg-[#c5ddd4]'}`} />
                        <div className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[100px] opacity-50 ${isDark ? 'bg-[#f59d82]/30' : 'bg-[#fcd5c8]'}`} />

                        <div className="relative z-10">
                            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Ready to start?</h2>
                            <p className={`text-center mb-10 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Customize your interview session below</p>

                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Role Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Select Role</label>
                                    <div className="space-y-3">
                                        {roles.map((role) => (
                                            <button key={role.id} onClick={() => setSelectedRole(role.id)}
                                                className={`w-full p-4 rounded-xl flex items-center gap-4 border transition-all duration-200 cursor-pointer ${selectedRole === role.id ? 'border-[#2d6254] bg-[#2d6254]/10 ring-1 ring-[#2d6254]/50' : isDark ? 'border-slate-700/50 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} ${role.color}`}><role.icon size={20} /></div>
                                                <span className={`font-medium text-sm ${selectedRole === role.id ? 'text-[#2d6254]' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>{role.label}</span>
                                                {selectedRole === role.id && <CheckCircle2 size={18} className="ml-auto text-[#2d6254]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Level Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Experience Level</label>
                                    <div className="space-y-3">
                                        {levels.map((level) => (
                                            <button key={level.id} onClick={() => setSelectedLevel(level.id)}
                                                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${selectedLevel === level.id ? 'border-[#2d6254] bg-[#2d6254]/10 ring-1 ring-[#2d6254]/50' : isDark ? 'border-slate-700/50 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className={`font-medium text-sm ${selectedLevel === level.id ? 'text-[#2d6254]' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>{level.label}</span>
                                                    {selectedLevel === level.id && <CheckCircle2 size={18} className="text-[#2d6254]" />}
                                                </div>
                                                <div className="text-xs text-slate-500">{level.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Difficulty Selection */}
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold uppercase tracking-wider text-slate-500">Difficulty</label>
                                    <div className="space-y-3">
                                        {difficulties.map((difficulty) => (
                                            <button key={difficulty.id} onClick={() => setSelectedDifficulty(difficulty.id)}
                                                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${selectedDifficulty === difficulty.id ? 'border-[#2d6254] bg-[#2d6254]/10 ring-1 ring-[#2d6254]/50' : isDark ? 'border-slate-700/50 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'}`}>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <div className={`p-1.5 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}><difficulty.icon size={16} className={difficulty.color} /></div>
                                                    <span className={`font-medium text-sm ${selectedDifficulty === difficulty.id ? 'text-[#2d6254]' : isDark ? 'text-slate-300' : 'text-slate-700'}`}>{difficulty.label}</span>
                                                    {selectedDifficulty === difficulty.id && <CheckCircle2 size={18} className="ml-auto text-[#2d6254]" />}
                                                </div>
                                                <div className="text-xs ml-9 text-slate-500">{difficulty.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={`pt-8 mt-8 border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}>
                                <button onClick={handleStart} disabled={!selectedRole || !selectedLevel || !selectedDifficulty}
                                    className={`w-full py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${selectedRole && selectedLevel && selectedDifficulty
                                        ? isDark ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white shadow-lg' : 'bg-[#1a3c34] hover:bg-[#234e44] text-white shadow-lg'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                                    Start Interview Session <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
