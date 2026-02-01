import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Target, Users, Award, TrendingUp, CheckCircle, Sparkles, Brain, Zap, Shield, Rocket } from 'lucide-react';

export function About() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const values = [
        {
            icon: Target,
            title: 'Mission-Driven',
            description: 'Democratizing access to world-class interview preparation through AI technology.'
        },
        {
            icon: Users,
            title: 'Community First',
            description: 'Building a supportive ecosystem where candidates help each other succeed.'
        },
        {
            icon: Award,
            title: 'Excellence',
            description: 'Committed to delivering the highest quality interview prep experience.'
        },
        {
            icon: TrendingUp,
            title: 'Continuous Growth',
            description: 'Always evolving to meet the demands of modern tech interviews.'
        }
    ];

    const stats = [
        { number: '120k+', label: 'Active Users' },
        { number: '500k+', label: 'Mock Interviews' },
        { number: '95%', label: 'Success Rate' },
        { number: '120+', label: 'Partner Companies' }
    ];

    const features = [
        { icon: Brain, title: 'AI-Powered Practice', desc: 'Advanced AI simulates real interview scenarios' },
        { icon: Zap, title: 'Instant Feedback', desc: 'Get real-time insights on your performance' },
        { icon: Shield, title: 'Comprehensive Prep', desc: 'Cover all aspects from coding to behavioral' },
        { icon: Rocket, title: 'Career Growth', desc: 'Track progress and achieve your goals' }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0a0f14]' : 'bg-slate-50'}`}>
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 px-6 overflow-hidden">
                {isDark && (
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse, #2d6254 0%, transparent 70%)' }}
                    />
                )}

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        

                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Empowering Your <span className="text-[#2d6254]">Interview Success</span>
                        </h1>

                        <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                            InterPrep is the leading AI-powered interview preparation platform, helping thousands of candidates
                            land their dream jobs at top tech companies worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={`py-16 px-6 border-y ${isDark ? 'border-[#2d6254]/15 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'
                                    }`}>
                                    {stat.number}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Our Mission
                            </h2>
                            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                We're on a mission to democratize access to world-class interview preparation.
                                By leveraging cutting-edge AI technology, we provide personalized, effective, and
                                affordable interview coaching to everyone.
                            </p>
                            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Whether you're preparing for your first tech interview or aiming for a senior role at FAANG,
                                InterPrep adapts to your needs and helps you succeed.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className={`p-6 rounded-2xl border transition-all duration-300 ${isDark
                                            ? 'bg-slate-900/60 border-[#2d6254]/20 hover:border-[#2d6254]/40'
                                            : 'bg-white border-slate-200 hover:border-[#2d6254]/30'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${isDark ? 'bg-[#2d6254]/20' : 'bg-[#c5ddd4]/50'
                                        }`}>
                                        <feature.icon size={24} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                                    </div>
                                    <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={`py-20 px-6 ${isDark ? 'bg-slate-900/40' : 'bg-white'}`}>
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Our Core Values
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 rounded-2xl border ${isDark
                                        ? 'bg-slate-900/60 border-[#2d6254]/20 hover:border-[#2d6254]/40'
                                        : 'bg-slate-50 border-slate-200 hover:border-[#2d6254]/30'
                                    } transition-all duration-300`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isDark ? 'bg-[#2d6254]/20' : 'bg-[#c5ddd4]/50'
                                    }`}>
                                    <value.icon size={24} className={isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]'} />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {value.title}
                                </h3>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How InterPrep Works
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Your journey to interview success in three simple steps
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '1', title: 'Choose Your Path', desc: 'Select your role, experience level, and difficulty to get personalized practice' },
                            { step: '2', title: 'Practice with AI', desc: 'Engage in realistic mock interviews with instant, actionable feedback' },
                            { step: '3', title: 'Track & Improve', desc: 'Monitor your progress, earn achievements, and land your dream job' }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="relative"
                            >
                                <div className={`text-6xl font-bold mb-4 ${isDark ? 'text-[#2d6254]/20' : 'text-[#c5ddd4]/50'
                                    }`}>
                                    {item.step}
                                </div>
                                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {item.title}
                                </h3>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`p-12 rounded-3xl border relative overflow-hidden ${isDark
                                ? 'bg-gradient-to-br from-[#2d6254]/20 to-[#1a3c34]/20 border-[#2d6254]/30'
                                : 'bg-gradient-to-br from-[#c5ddd4]/30 to-[#fcd5c8]/30 border-[#2d6254]/20'
                            }`}
                    >
                        {isDark && (
                            <div
                                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
                                style={{ background: 'radial-gradient(circle, #f59d82 0%, transparent 70%)' }}
                            />
                        )}
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 relative z-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Ready to Start Your Journey?
                        </h2>
                        <p className={`text-lg mb-8 relative z-10 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Join thousands of successful candidates who've landed their dream jobs with InterPrep
                        </p>
                        <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 relative z-10 ${isDark
                                ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white shadow-lg shadow-[#2d6254]/30'
                                : 'bg-[#1a3c34] hover:bg-[#234e44] text-white shadow-xl'
                            }`}>
                            Get Started Free
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
