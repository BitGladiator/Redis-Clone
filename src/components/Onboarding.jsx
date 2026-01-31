import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, Brain, Target, Trophy, ChevronRight,
    ChevronLeft, Sparkles, Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { completeOnboarding } from '../lib/storage';

const steps = [
    {
        icon: Sparkles,
        title: "Welcome to InterPrep",
        description: "Your AI-powered interview practice companion. Get ready to ace your next tech interview!",
        color: "indigo",
    },
    {
        icon: Mic,
        title: "Voice-Powered Practice",
        description: "Speak your answers just like in a real interview. Our AI listens and provides instant feedback.",
        color: "teal",
    },
    {
        icon: Brain,
        title: "Smart AI Analysis",
        description: "Get detailed insights on your communication, technical accuracy, and areas for improvement.",
        color: "purple",
    },
    {
        icon: Target,
        title: "Tailored Questions",
        description: "Choose your role, level, and question category. Practice System Design, Behavioral, Coding, and more.",
        color: "orange",
    },
    {
        icon: Trophy,
        title: "Track Your Progress",
        description: "Earn points, badges, and maintain streaks. Watch yourself improve over time!",
        color: "yellow",
    },
];

export function Onboarding({ onComplete }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            completeOnboarding();
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        completeOnboarding();
        onComplete();
    };

    const getColorClass = (color) => {
        const colors = {
            indigo: isDark ? 'from-indigo-500 to-indigo-600' : 'from-indigo-500 to-indigo-600',
            teal: isDark ? 'from-teal-500 to-teal-600' : 'from-teal-500 to-teal-600',
            purple: isDark ? 'from-purple-500 to-purple-600' : 'from-purple-500 to-purple-600',
            orange: isDark ? 'from-orange-500 to-orange-600' : 'from-orange-500 to-orange-600',
            yellow: isDark ? 'from-yellow-500 to-yellow-600' : 'from-yellow-500 to-yellow-600',
        };
        return colors[color] || colors.indigo;
    };

    const step = steps[currentStep];
    const Icon = step.icon;

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isDark ? 'bg-[#030712]' : 'bg-slate-50'
            }`}>
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${getColorClass(step.color)}`} />
                <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 bg-gradient-to-r ${getColorClass(step.color)}`} />
            </div>

            <div className="relative z-10 max-w-lg w-full">
                {/* Skip button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleSkip}
                        className={`text-sm ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Skip tutorial
                    </button>
                </div>

                {/* Main card */}
                <motion.div
                    className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-2xl'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.1 }}
                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${getColorClass(step.color)}`}
                            >
                                <Icon size={40} className="text-white" />
                            </motion.div>

                            {/* Title */}
                            <h2 className={`text-2xl md:text-3xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'
                                }`}>
                                {step.title}
                            </h2>

                            {/* Description */}
                            <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {step.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mb-8">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentStep
                                        ? `w-8 bg-gradient-to-r ${getColorClass(step.color)}`
                                        : idx < currentStep
                                            ? 'bg-indigo-500'
                                            : isDark ? 'bg-white/20' : 'bg-slate-300'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${currentStep === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : isDark
                                        ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>

                        <motion.button
                            onClick={handleNext}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${getColorClass(step.color)}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {currentStep === steps.length - 1 ? (
                                <>
                                    Get Started
                                    <Check size={20} />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
