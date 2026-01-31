import React from 'react';
import { motion } from 'framer-motion';
import {
    Mic, Brain, Target, Zap, Shield, Clock,
    MessageSquare, BarChart3, Sparkles, Users,
    CheckCircle, ArrowRight, Terminal, Code2,
    Video, FileText, Award, TrendingUp
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
    {
        icon: Mic,
        title: 'Voice-Powered Interviews',
        description: 'Have natural conversations with our AI interviewer using voice input. Just speak your answers like a real interview.',
        color: 'forest'
    },
    {
        icon: Brain,
        title: 'AI-Powered Analysis',
        description: 'Get intelligent feedback on your responses with analysis of communication style, technical accuracy, and confidence.',
        color: 'sage'
    },
    {
        icon: Target,
        title: 'Role-Specific Questions',
        description: 'Questions tailored to your target role - Frontend, Backend, Fullstack, or Data Science positions.',
        color: 'coral'
    },
    {
        icon: BarChart3,
        title: 'Performance Tracking',
        description: 'Track your improvement over time with detailed performance metrics and progress reports.',
        color: 'forest'
    },
    {
        icon: Clock,
        title: 'Real-Time Feedback',
        description: 'Receive instant feedback during and after your practice session to improve immediately.',
        color: 'sage'
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your practice sessions are private and secure. We never share your data with third parties.',
        color: 'coral'
    },
];

const benefits = [
    'Unlimited practice sessions',
    'Multiple difficulty levels',
    'Industry-standard questions',
    'Detailed performance reports',
    'Voice and text input support',
    'Mobile-friendly interface',
];

const stats = [
    { value: '120k+', label: 'Active Users', icon: Users },
    { value: '500k+', label: 'Sessions Completed', icon: MessageSquare },
    { value: '89%', label: 'Success Rate', icon: TrendingUp },
    { value: '4.9', label: 'User Rating', icon: Award },
];

export function Features({ onBack }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getColorClasses = (color) => {
        const colors = {
            forest: isDark ? 'bg-[#1a3c34]/30 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]',
            sage: isDark ? 'bg-[#2d6254]/30 text-[#a8cfc1]' : 'bg-[#e8f5f0] text-[#2d6254]',
            coral: isDark ? 'bg-[#f59d82]/20 text-[#f59d82]' : 'bg-[#fef0ec] text-[#e07b5d]',
        };
        return colors[color] || colors.forest;
    };

    const getGradient = (color) => {
        const gradients = {
            forest: 'from-[#1a3c34] to-[#2d6254]',
            sage: 'from-[#2d6254] to-[#6eb39d]',
            coral: 'from-[#f59d82] to-[#fcd5c8]',
        };
        return gradients[color] || gradients.forest;
    };

    return (
        <div className="w-full py-8 md:py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                   

                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                        Everything You Need to
                        <span className={`block ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>
                            Ace Your Interview
                        </span>
                    </h1>

                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Comprehensive tools and features designed to help you prepare for and succeed in your tech interviews.
                    </p>
                </div>

                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`max-w-5xl mx-auto mb-16 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 ${isDark
                        ? 'bg-slate-800/50 border border-slate-700/50'
                        : 'bg-white border border-slate-100 shadow-lg shadow-slate-100/50'
                        }`}
                >
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                            <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${isDark ? 'bg-[#2d6254]/20' : 'bg-[#c5ddd4]/50'}`}>
                                <stat.icon size={24} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                            </div>
                            <div className={`text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{stat.value}</div>
                            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className={`group p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${isDark
                                ? 'bg-slate-800/40 border-slate-700/50 hover:border-[#3d8570]/50 hover:bg-slate-800/60'
                                : 'bg-white border-slate-100 hover:border-[#8bc1af] hover:shadow-xl hover:shadow-slate-200/50'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${getGradient(feature.color)} text-white shadow-lg`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                {feature.title}
                            </h3>
                            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Features Row */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
                    {/* Feature Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`p-6 rounded-2xl ${isDark ? 'bg-[#1a3c34]' : 'bg-[#1a3c34]'}`}
                    >
                        <div className="text-[#8bc1af] text-xs font-medium mb-2">Code Challenges</div>
                        <h3 className="text-white font-bold text-lg mb-3">Live Coding Environment</h3>
                        <p className="text-[#8bc1af]/80 text-sm mb-4">Practice DSA problems with syntax highlighting and real-time execution.</p>
                        <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-white/10'}`}>
                            <code className="text-[#8bc1af] text-xs font-mono">
                                function solve(arr) {'{'}<br />
                                &nbsp;&nbsp;return arr.sort();<br />
                                {'}'}
                            </code>
                        </div>
                    </motion.div>

                    {/* Feature Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-slate-100 shadow-lg'}`}
                    >
                        <div className={`text-sm font-medium mb-2 ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}`}>Progress Tracking</div>
                        <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Detailed Analytics</h3>
                        <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Visual breakdown of your strengths and areas for improvement.</p>
                        <div className="flex items-end gap-2 h-20">
                            {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 rounded-t transition-all ${i === 5 ? 'bg-[#2d6254]' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Feature Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-slate-100 shadow-lg'}`}
                    >
                        <div className={`text-sm font-medium mb-2 ${isDark ? 'text-[#f59d82]' : 'text-[#e07b5d]'}`}>AI Feedback</div>
                        <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>Smart Recommendations</h3>
                        <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Get personalized tips to improve your interview performance.</p>
                        <div className="space-y-2">
                            <div className={`p-2 rounded-lg text-xs ${isDark ? 'bg-[#2d6254]/20 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]'}`}>
                                ✓ Great explanation structure
                            </div>
                            <div className={`p-2 rounded-lg text-xs ${isDark ? 'bg-[#f59d82]/20 text-[#f59d82]' : 'bg-[#fef0ec] text-[#e07b5d]'}`}>
                                → Practice time complexity
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Benefits Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`max-w-5xl mx-auto rounded-3xl p-8 md:p-12 ${isDark
                        ? 'bg-gradient-to-br from-[#1a3c34]/50 to-[#2d6254]/30 border border-[#2d6254]/30'
                        : 'bg-gradient-to-br from-[#e8f5f0] to-[#fef5f2] border border-[#c5ddd4]'
                        }`}
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                                Why Choose <span className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'}>InterPrep</span>?
                            </h2>
                            <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Join thousands of developers who have improved their interview skills with our AI-powered platform.
                            </p>
                            <button
                                onClick={onBack}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 bg-[#1a3c34] hover:bg-[#234e44] text-white"
                            >
                                Start Practicing
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-[#2d6254]' : 'bg-[#2d6254]'}`}>
                                        <CheckCircle size={14} className="text-white" />
                                    </div>
                                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
