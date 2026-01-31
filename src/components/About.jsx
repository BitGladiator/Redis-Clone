import React from 'react';
import { motion } from 'framer-motion';
import {
    Heart, Users, Zap, Target, Mail,
    Github, Linkedin, Twitter, ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const team = [
    {
        name: 'Alex Chen',
        role: 'Founder & CEO',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        bio: 'Former Google engineer passionate about helping developers succeed.'
    },
    {
        name: 'Sarah Johnson',
        role: 'Head of AI',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        bio: 'PhD in Machine Learning, previously at OpenAI.'
    },
    {
        name: 'Michael Park',
        role: 'Lead Designer',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        bio: 'Design leader with 10+ years in product design.'
    },
];

const values = [
    {
        icon: Heart,
        title: 'User First',
        description: 'Everything we build starts with understanding our users\' needs and challenges.'
    },
    {
        icon: Zap,
        title: 'Innovation',
        description: 'We leverage cutting-edge AI to create the most effective interview prep tool.'
    },
    {
        icon: Target,
        title: 'Excellence',
        description: 'We\'re committed to helping every user achieve their career goals.'
    },
    {
        icon: Users,
        title: 'Community',
        description: 'We believe in building a supportive community of learners and achievers.'
    },
];

export function About({ onBack }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

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
                                ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                                : 'bg-purple-50 text-purple-600 border border-purple-100'
                            }`}
                    >
                        <Heart size={14} />
                        <span>About Us</span>
                    </motion.div>

                    <h1 className={`text-4xl md:text-5xl font-display font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                        Helping Developers
                        <span className={`block bg-clip-text text-transparent ${isDark
                                ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                                : 'bg-gradient-to-r from-purple-600 to-pink-600'
                            }`}>
                            Land Their Dream Jobs
                        </span>
                    </h1>

                    <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                        We're on a mission to democratize interview preparation and help every developer
                        showcase their true potential.
                    </p>
                </div>

                {/* Story Section */}
                <div className={`rounded-3xl p-8 md:p-12 mb-16 ${isDark
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-white border border-slate-200 shadow-xl'
                    }`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className={`text-3xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                Our Story
                            </h2>
                            <p className={`mb-4 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                InterPrep was born from a simple observation: too many talented developers
                                struggle with interviews, not because they lack skills, but because they
                                lack practice and feedback.
                            </p>
                            <p className={`mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                We built InterPrep to be the practice partner every developer deserves -
                                available 24/7, infinitely patient, and powered by AI that understands
                                what interviewers are looking for.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}>
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}>
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}>
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>
                        <div className={`aspect-video rounded-2xl flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' : 'bg-gradient-to-br from-purple-100 to-pink-100'
                            }`}>
                            <div className="text-center">
                                <div className={`text-6xl font-display font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    10K+
                                </div>
                                <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    Developers Helped
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="mb-16">
                    <h2 className={`text-3xl font-display font-bold text-center mb-10 ${isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                        Our Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`p-6 rounded-2xl text-center ${isDark
                                        ? 'bg-white/5 border border-white/10'
                                        : 'bg-white border border-slate-200 shadow-lg'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                                    }`}>
                                    <value.icon size={24} />
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    {value.title}
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Team */}
                <div className="mb-16">
                    <h2 className={`text-3xl font-display font-bold text-center mb-10 ${isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                        Meet the Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className={`p-6 rounded-2xl text-center ${isDark
                                        ? 'bg-white/5 border border-white/10'
                                        : 'bg-white border border-slate-200 shadow-lg'
                                    }`}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    {member.name}
                                </h3>
                                <p className={`text-sm mb-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'
                                    }`}>
                                    {member.role}
                                </p>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className={`rounded-3xl p-8 md:p-12 text-center ${isDark
                        ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100'
                    }`}>
                    <h2 className={`text-3xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                        Ready to Start Practicing?
                    </h2>
                    <p className={`mb-6 max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Join thousands of developers who are preparing for their dream jobs with InterPrep.
                    </p>
                    <button
                        onClick={onBack}
                        className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-all ${isDark
                                ? 'bg-white text-slate-900 hover:bg-slate-100'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/25'
                            }`}
                    >
                        Get Started Free
                        <ArrowRight size={20} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
