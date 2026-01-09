import React from 'react';
import { motion } from 'framer-motion';
import {
    Mic, Brain, Target, Zap, Shield, Clock,
    MessageSquare, BarChart3, Sparkles, Users,
    CheckCircle, ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
    {
        icon: Mic,
        title: 'Voice-Powered Interviews',
        description: 'Have natural conversations with our AI interviewer using voice input. Just speak your answers like a real interview.',
        color: 'indigo'
    },
    {
        icon: Brain,
        title: 'AI-Powered Analysis',
        description: 'Get intelligent feedback on your responses with analysis of communication style, technical accuracy, and confidence.',
        color: 'purple'
    },
    {
        icon: Target,
        title: 'Role-Specific Questions',
        description: 'Questions tailored to your target role - Frontend, Backend, Fullstack, or Data Science positions.',
        color: 'teal'
    },
    {
        icon: BarChart3,
        title: 'Performance Tracking',
        description: 'Track your improvement over time with detailed performance metrics and progress reports.',
        color: 'orange'
    },
    {
        icon: Clock,
        title: 'Real-Time Feedback',
        description: 'Receive instant feedback during and after your practice session to improve immediately.',
        color: 'pink'
    },
    {
        icon: Shield,
        title: 'Privacy First',
        description: 'Your practice sessions are private and secure. We never share your data with third parties.',
        color: 'emerald'
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

export function Features({ onBack }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getColorClasses = (color) => {
        const colors = {
            indigo: isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600',
            purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
            teal: isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600',
            orange: isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600',
            pink: isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600',
            emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
        };
        return colors[color] || colors.indigo;
    };

    return (
        <div className="w-full py-8 md:py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark
                                ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20'
                                : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                            }`}
                    >
                        <Sparkles size={14} />
                        <span>Features</span>
                    </motion.div>

                    <h1 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                        Everything You Need to
                        <span className={`block bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-indigo-400 to-purple-400'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                            }`}>
                            Ace Your Interview
                        </span>
                    </h1>

                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                        Comprehensive tools and features designed to help you prepare for and succeed in your tech interviews.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className={`group p-6 rounded-2xl transition-all duration-300 ${isDark
                                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                                    : 'bg-white border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50'
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${getColorClasses(feature.color)}`}>
                                <feature.icon size={28} />
                            </div>
                            <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                {feature.title}
                            </h3>
                            <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className={`rounded-3xl p-8 md:p-12 ${isDark
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                    }`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className={`text-3xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                Why Choose InterPrep?
                            </h2>
                            <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Join thousands of developers who have improved their interview skills with our AI-powered platform.
                            </p>
                            <button
                                onClick={onBack}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${isDark
                                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                Start Practicing
                                <ArrowRight size={18} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle size={20} className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
                                    <span className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
