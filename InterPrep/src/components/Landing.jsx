import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Mic, Brain, Target, Zap, ChevronRight,
    Code, Users, TrendingUp, Play, Star,
    ArrowRight, CheckCircle, MessageSquare,
    BarChart3, Clock, Shield, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Animated section wrapper with ref forwarding
const Section = forwardRef(({ children, className = "", id = "" }, forwardedRef) => {
    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            ref={ref}
            id={id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className={className}
        >
            {children}
        </motion.section>
    );
});


// Interactive 3D Background (for hero only)
const Interactive3DBackground = ({ isDark }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const shapesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 800;
        };
        resize();
        window.addEventListener('resize', resize);

        class Shape3D {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * 400 + 100;
                this.size = Math.random() * 40 + 20;
                this.rotationX = Math.random() * Math.PI * 2;
                this.rotationY = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.02;
                this.hue = 230 + Math.random() * 50;
                this.originalX = this.x;
                this.originalY = this.y;
            }

            update(mouseX, mouseY, active) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (active && dist < 250) {
                    const force = (250 - dist) / 250;
                    this.x += dx * force * 0.05;
                    this.y += dy * force * 0.05;
                    this.rotationX += this.rotSpeed * 3;
                    this.rotationY += this.rotSpeed * 3;
                } else {
                    this.x += (this.originalX - this.x) * 0.02;
                    this.y += (this.originalY - this.y) * 0.02;
                    this.rotationX += this.rotSpeed;
                    this.rotationY += this.rotSpeed;
                }
            }

            draw(ctx) {
                const perspective = 500 / (500 + this.z);
                const s = this.size * perspective;
                const cos = Math.cos(this.rotationX) * 0.4;
                const sin = Math.sin(this.rotationY) * 0.4;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.strokeStyle = isDark
                    ? `hsla(${this.hue}, 70%, 60%, ${perspective * 0.6})`
                    : `hsla(${this.hue}, 60%, 50%, ${perspective * 0.4})`;
                ctx.lineWidth = 1.5 * perspective;

                // Draw cube
                ctx.beginPath();
                ctx.rect(-s / 2, -s / 2, s, s);
                ctx.stroke();
                ctx.beginPath();
                ctx.rect(-s / 2 + s * cos, -s / 2 + s * sin, s, s);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-s / 2, -s / 2); ctx.lineTo(-s / 2 + s * cos, -s / 2 + s * sin);
                ctx.moveTo(s / 2, -s / 2); ctx.lineTo(s / 2 + s * cos, -s / 2 + s * sin);
                ctx.moveTo(s / 2, s / 2); ctx.lineTo(s / 2 + s * cos, s / 2 + s * sin);
                ctx.moveTo(-s / 2, s / 2); ctx.lineTo(-s / 2 + s * cos, s / 2 + s * sin);
                ctx.stroke();
                ctx.restore();
            }
        }

        shapesRef.current = Array.from({ length: 10 }, () => new Shape3D());

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX, y: e.clientY - rect.top, active: true };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapesRef.current.forEach(shape => {
                shape.update(mouseRef.current.x, mouseRef.current.y, mouseRef.current.active);
                shape.draw(ctx);
            });
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDark]);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const features = [
    { icon: Mic, title: 'Voice-Powered', desc: 'Natural conversations with AI interviewer using speech recognition', color: 'indigo' },
    { icon: Brain, title: 'AI Analysis', desc: 'Smart feedback on your responses, communication style, and confidence', color: 'purple' },
    { icon: Target, title: 'Role-Specific', desc: 'Questions tailored for Frontend, Backend, Fullstack, and Data Science', color: 'teal' },
    { icon: BarChart3, title: 'Progress Tracking', desc: 'Track improvement over time with detailed performance reports', color: 'orange' },
    { icon: Clock, title: 'Real-Time', desc: 'Instant feedback during and after your practice sessions', color: 'pink' },
    { icon: Shield, title: 'Privacy First', desc: 'Your practice sessions are private and secure', color: 'emerald' },
];

const steps = [
    { num: '01', title: 'Choose Your Role', desc: 'Select from Frontend, Backend, Fullstack, or Data Science positions' },
    { num: '02', title: 'Set Your Level', desc: 'Pick Junior, Mid-Level, or Senior based on your experience' },
    { num: '03', title: 'Start Practicing', desc: 'Answer questions using your voice, just like a real interview' },
    { num: '04', title: 'Get Feedback', desc: 'Receive detailed analysis and tips to improve your performance' },
];

const testimonials = [
    { name: 'Sarah Chen', role: 'Frontend Developer at Google', text: 'InterPrep helped me practice until I felt confident. Landed my dream job!', avatar: '👩‍💻' },
    { name: 'Marcus Johnson', role: 'Backend Engineer at Meta', text: 'The AI feedback was surprisingly accurate. Best interview prep tool I\'ve used.', avatar: '👨‍💻' },
    { name: 'Priya Patel', role: 'Data Scientist at Netflix', text: 'Unlimited practice sessions made all the difference. Highly recommend!', avatar: '👩‍🔬' },
];

const roles = [
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Zap },
    { id: 'fullstack', label: 'Fullstack', icon: Brain },
    { id: 'data', label: 'Data Science', icon: TrendingUp },
];

const levels = [
    { id: 'junior', label: 'Junior' },
    { id: 'mid', label: 'Mid-Level' },
    { id: 'senior', label: 'Senior' },
];

export function Landing({ onStart }) {
    const { theme } = useTheme();
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [showConfig, setShowConfig] = useState(false);
    const configRef = useRef(null);

    const isDark = theme === 'dark';

    const handleStart = () => {
        if (selectedRole && selectedLevel) {
            onStart({ role: selectedRole, level: selectedLevel });
        }
    };

    const scrollToConfig = () => {
        setShowConfig(true);
        setTimeout(() => {
            configRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const getColorClass = (color) => {
        const colors = {
            indigo: isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600',
            purple: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600',
            teal: isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600',
            orange: isDark ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600',
            pink: isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-100 text-pink-600',
            emerald: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
        };
        return colors[color];
    };

    return (
        <div className="w-full">
            {/* HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                <Interactive3DBackground isDark={isDark} />

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600'
                            }`}
                    >
                        <Sparkles size={14} />
                        AI-Powered Interview Practice
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-[1.1] ${isDark ? 'text-white' : 'text-slate-900'
                            }`}
                    >
                        Ace Your Next
                        <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Tech Interview
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}
                    >
                        Practice with our AI interviewer that adapts to your role and experience.
                        Get real-time feedback and land your dream job.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            onClick={scrollToConfig}
                            className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg font-semibold ${isDark ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                } shadow-2xl`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Play size={20} className="fill-current" />
                            Start Free Practice
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button
                            className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-medium ${isDark ? 'text-slate-400 hover:text-white border border-white/10 hover:bg-white/5' : 'text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                            whileHover={{ scale: 1.02 }}
                        >
                            Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
                    >
                        {[
                            { value: '10K+', label: 'Practice Sessions' },
                            { value: '95%', label: 'Success Rate' },
                            { value: '50+', label: 'Question Templates' },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <Section className={`py-24 px-4 ${isDark ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Everything You Need to
                            <span className="block text-indigo-500">Succeed</span>
                        </h2>
                        <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Comprehensive tools designed to help you prepare for and ace your tech interviews.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl'
                                    } transition-all`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${getColorClass(feature.color)}`}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {feature.title}
                                </h3>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* HOW IT WORKS */}
            <Section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How It Works
                        </h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Four simple steps to interview success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className={`text-5xl font-display font-bold mb-4 ${isDark ? 'text-indigo-500/30' : 'text-indigo-200'
                                    }`}>
                                    {step.num}
                                </div>
                                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {step.title}
                                </h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* TESTIMONIALS */}
            <Section className={`py-24 px-4 ${isDark ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Loved by Developers
                        </h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Join thousands who landed their dream jobs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-lg'
                                    }`}
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    "{t.text}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{t.avatar}</div>
                                    <div>
                                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</div>
                                        <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA / START INTERVIEW */}
            <Section className="py-24 px-4" ref={configRef}>
                <div className="max-w-3xl mx-auto">
                    <div className={`p-8 md:p-12 rounded-3xl ${isDark
                        ? 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100'
                        }`}>
                        <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-slate-900'
                            }`}>
                            Ready to Practice?
                        </h2>
                        <p className={`text-center mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Configure your mock interview and start practicing now
                        </p>

                        {/* Role Selection */}
                        <div className="mb-6">
                            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Select Role
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {roles.map((role) => (
                                    <motion.button
                                        key={role.id}
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`p-4 rounded-xl flex flex-col items-center gap-2 ${selectedRole === role.id
                                            ? 'bg-indigo-500 text-white shadow-lg'
                                            : isDark
                                                ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <role.icon size={24} />
                                        <span className="text-sm font-medium">{role.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Level Selection */}
                        <div className="mb-8">
                            <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Experience Level
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {levels.map((level) => (
                                    <motion.button
                                        key={level.id}
                                        onClick={() => setSelectedLevel(level.id)}
                                        className={`p-4 rounded-xl text-center ${selectedLevel === level.id
                                            ? 'bg-teal-500 text-white shadow-lg'
                                            : isDark
                                                ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                                                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="font-semibold">{level.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Start Button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!selectedRole || !selectedLevel}
                            className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 ${selectedRole && selectedLevel
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-2xl shadow-indigo-500/30'
                                : isDark
                                    ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            whileHover={selectedRole && selectedLevel ? { scale: 1.02 } : {}}
                            whileTap={selectedRole && selectedLevel ? { scale: 0.98 } : {}}
                        >
                            <Mic size={22} />
                            Start Interview
                            <ArrowRight size={22} />
                        </motion.button>

                        {(!selectedRole || !selectedLevel) && (
                            <p className={`text-center mt-4 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                Select a role and experience level to continue
                            </p>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
}
