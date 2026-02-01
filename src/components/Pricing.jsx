import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Check, X, Zap, Crown, Star, Sparkles } from 'lucide-react';

export function Pricing() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

    const plans = [
        {
            name: 'Free',
            icon: Star,
            price: { monthly: 0, yearly: 0 },
            description: 'Perfect for getting started with interview prep',
            features: [
                { text: '10 AI mock interviews per month', included: true },
                { text: 'Basic progress tracking', included: true },
                { text: 'Community access', included: true },
                { text: 'Standard question bank', included: true },
                { text: 'Real-time feedback', included: false },
                { text: 'Interview recordings', included: false },
                { text: 'FAANG interview prep', included: false },
                { text: 'Priority support', included: false },
            ],
            cta: 'Get Started',
            popular: false,
        },
        {
            name: 'Pro',
            icon: Zap,
            price: { monthly: 29, yearly: 290 },
            description: 'For serious interview preparation',
            features: [
                { text: 'Unlimited AI mock interviews', included: true },
                { text: 'Advanced progress analytics', included: true },
                { text: 'Community access', included: true },
                { text: 'Premium question bank', included: true },
                { text: 'Real-time feedback', included: true },
                { text: 'Interview recordings', included: true },
                { text: 'Code editor integration', included: true },
                { text: 'Email support', included: true },
            ],
            cta: 'Start Pro Trial',
            popular: true,
        },
        {
            name: 'Enterprise',
            icon: Crown,
            price: { monthly: 99, yearly: 990 },
            description: 'For teams and FAANG preparation',
            features: [
                { text: 'Everything in Pro', included: true },
                { text: 'FAANG interview prep', included: true },
                { text: 'System design practice', included: true },
                { text: 'Behavioral interview coaching', included: true },
                { text: 'Custom interview scenarios', included: true },
                { text: '1-on-1 coaching sessions', included: true },
                { text: 'Resume review', included: true },
                { text: 'Priority support', included: true },
            ],
            cta: 'Start Enterprise Trial',
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'Can I switch plans later?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'The Free plan is available immediately with no credit card required. Pro and Enterprise plans include a 7-day free trial.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.'
        },
        {
            question: 'Can I cancel anytime?',
            answer: 'Absolutely! You can cancel your subscription at any time with no cancellation fees.'
        }
    ];

    return (
        <div className={`min-h-screen ${isDark ? 'bg-[#0a0f14]' : 'bg-slate-50'}`}>
            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 overflow-hidden">
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
                            Choose Your <span className="text-[#2d6254]">Success Path</span>
                        </h1>

                        <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                            Start free and upgrade as you grow. All plans include our core AI-powered interview preparation features.
                        </p>

                        {/* Billing Toggle */}
                        <div className={`inline-flex items-center gap-4 p-1.5 rounded-full ${isDark ? 'bg-slate-900/60 border border-slate-700' : 'bg-white border border-slate-200'
                            }`}>
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === 'monthly'
                                        ? isDark
                                            ? 'bg-[#2d6254] text-white'
                                            : 'bg-[#1a3c34] text-white'
                                        : isDark
                                            ? 'text-slate-400 hover:text-white'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-full font-medium transition-all relative ${billingCycle === 'yearly'
                                        ? isDark
                                            ? 'bg-[#2d6254] text-white'
                                            : 'bg-[#1a3c34] text-white'
                                        : isDark
                                            ? 'text-slate-400 hover:text-white'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                Yearly
                                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-[#8bc1af]/20 text-[#8bc1af]' : 'bg-[#c5ddd4] text-[#1a3c34]'
                                    }`}>
                                    Save 17%
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`relative rounded-3xl p-8 border transition-all duration-300 ${plan.popular
                                        ? isDark
                                            ? 'bg-gradient-to-b from-[#2d6254]/20 to-slate-900/80 border-[#2d6254]/50 shadow-2xl shadow-[#2d6254]/20 scale-105'
                                            : 'bg-gradient-to-b from-[#c5ddd4]/30 to-white border-[#2d6254]/30 shadow-2xl shadow-[#2d6254]/10 scale-105'
                                        : isDark
                                            ? 'bg-slate-900/60 border-slate-700/50 hover:border-slate-600'
                                            : 'bg-white border-slate-200 hover:border-slate-300'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-semibold ${isDark ? 'bg-[#2d6254] text-white' : 'bg-[#1a3c34] text-white'
                                        }`}>
                                        Most Popular
                                    </div>
                                )}

                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${plan.popular
                                        ? isDark ? 'bg-[#2d6254]/30' : 'bg-[#2d6254]/20'
                                        : isDark ? 'bg-slate-800' : 'bg-slate-100'
                                    }`}>
                                    <plan.icon size={28} className={plan.popular ? 'text-[#2d6254]' : isDark ? 'text-slate-400' : 'text-slate-600'} />
                                </div>

                                <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {plan.name}
                                </h3>

                                <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                            ${plan.price[billingCycle]}
                                        </span>
                                        {plan.price.monthly > 0 && (
                                            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                            </span>
                                        )}
                                    </div>
                                    {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                                        <p className={`text-sm mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                                            ${(plan.price.yearly / 12).toFixed(2)}/mo billed annually
                                        </p>
                                    )}
                                </div>

                                <button className={`w-full py-3 rounded-xl font-semibold mb-6 transition-all ${plan.popular
                                        ? isDark
                                            ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white'
                                            : 'bg-[#1a3c34] hover:bg-[#234e44] text-white'
                                        : isDark
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300'
                                    }`}>
                                    {plan.cta}
                                </button>

                                <div className="space-y-3">
                                    {plan.features.map((feature, featureIdx) => (
                                        <div key={featureIdx} className="flex items-start gap-3">
                                            {feature.included ? (
                                                <Check size={18} className="text-[#2d6254] flex-shrink-0 mt-0.5" />
                                            ) : (
                                                <X size={18} className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                                            )}
                                            <span className={`text-sm ${feature.included
                                                    ? isDark ? 'text-slate-300' : 'text-slate-700'
                                                    : isDark ? 'text-slate-600' : 'text-slate-400'
                                                }`}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className={`py-20 px-6 border-t ${isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}>
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Frequently Asked Questions
                        </h2>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Everything you need to know about our pricing
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className={`p-6 rounded-2xl border ${isDark
                                        ? 'bg-slate-900/60 border-slate-700/50'
                                        : 'bg-slate-50 border-slate-200'
                                    }`}
                            >
                                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {faq.question}
                                </h3>
                                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    {faq.answer}
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
                        className={`p-12 rounded-3xl border ${isDark
                                ? 'bg-gradient-to-br from-[#2d6254]/20 to-[#1a3c34]/20 border-[#2d6254]/30'
                                : 'bg-gradient-to-br from-[#c5ddd4]/30 to-[#fcd5c8]/30 border-[#2d6254]/20'
                            }`}
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Still Have Questions?
                        </h2>
                        <p className={`text-lg mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Our team is here to help you choose the right plan
                        </p>
                        <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 ${isDark
                                ? 'bg-white text-slate-900 hover:bg-slate-100'
                                : 'bg-[#1a3c34] text-white hover:bg-[#234e44]'
                            }`}>
                            Contact Sales
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
