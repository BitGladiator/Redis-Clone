import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Crown, Building, BookOpen, Video, FileText, Lock,
    ChevronRight, Star, Check, Download, Play
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Company-specific question banks
const COMPANY_QUESTIONS = {
    google: {
        name: 'Google',
        logo: '🔵',
        color: 'from-blue-500 to-blue-600',
        questions: [
            { type: 'behavioral', q: 'Tell me about a time you had to deal with ambiguity.' },
            { type: 'system', q: 'Design Google Maps navigation system.' },
            { type: 'coding', q: 'Implement a function to find the longest palindromic substring.' },
            { type: 'behavioral', q: 'How do you prioritize between quality and speed?' },
        ],
    },
    meta: {
        name: 'Meta',
        logo: '🔷',
        color: 'from-blue-600 to-indigo-600',
        questions: [
            { type: 'behavioral', q: 'Describe a time you failed and what you learned.' },
            { type: 'system', q: 'Design Facebook News Feed.' },
            { type: 'coding', q: 'Implement a function to serialize and deserialize a binary tree.' },
            { type: 'behavioral', q: 'How do you handle disagreements with team members?' },
        ],
    },
    amazon: {
        name: 'Amazon',
        logo: '📦',
        color: 'from-orange-500 to-orange-600',
        questions: [
            { type: 'leadership', q: 'Tell me about a time you showed ownership.' },
            { type: 'system', q: 'Design Amazon\'s recommendation system.' },
            { type: 'coding', q: 'LRU Cache implementation.' },
            { type: 'leadership', q: 'Give an example of when you dove deep into a problem.' },
        ],
    },
    apple: {
        name: 'Apple',
        logo: '🍎',
        color: 'from-gray-600 to-gray-800',
        questions: [
            { type: 'behavioral', q: 'Why do you want to work at Apple?' },
            { type: 'system', q: 'Design iCloud sync system.' },
            { type: 'coding', q: 'Implement a thread-safe singleton in your language of choice.' },
            { type: 'behavioral', q: 'Tell me about a product you love and why.' },
        ],
    },
    netflix: {
        name: 'Netflix',
        logo: '🎬',
        color: 'from-red-600 to-red-700',
        questions: [
            { type: 'behavioral', q: 'How do you handle high-pressure situations?' },
            { type: 'system', q: 'Design Netflix video streaming architecture.' },
            { type: 'coding', q: 'Implement a rate limiter.' },
            { type: 'behavioral', q: 'Describe your experience making data-driven decisions.' },
        ],
    },
    microsoft: {
        name: 'Microsoft',
        logo: '🪟',
        color: 'from-blue-500 to-cyan-500',
        questions: [
            { type: 'behavioral', q: 'Tell me about a time you mentored someone.' },
            { type: 'system', q: 'Design a cloud storage service like OneDrive.' },
            { type: 'coding', q: 'Implement a function to check if a binary tree is balanced.' },
            { type: 'behavioral', q: 'How do you stay updated with new technologies?' },
        ],
    },
};

const INTERVIEW_RECORDINGS = [
    { id: 1, title: 'Frontend Interview at Google', duration: '45 min', views: '12.5K', level: 'Senior', free: false },
    { id: 2, title: 'System Design: Design Twitter', duration: '50 min', views: '8.2K', level: 'Senior', free: false },
    { id: 3, title: 'Behavioral Interview Tips', duration: '25 min', views: '15K', level: 'All', free: true },
    { id: 4, title: 'Data Structures Deep Dive', duration: '60 min', views: '6.8K', level: 'Mid', free: false },
    { id: 5, title: 'Mock Interview: React Developer', duration: '40 min', views: '9.1K', level: 'Mid', free: true },
];

export function PremiumContent({ onBack, onSelectCompany }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [activeTab, setActiveTab] = useState('companies');
    const [selectedCompany, setSelectedCompany] = useState(null);

    return (
        <div className="min-h-[80vh] py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <Crown size={24} className="text-yellow-500" />
                                <h1 className={`text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Premium Content
                                </h1>
                            </div>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Company-specific prep and exclusive resources
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex gap-2 p-1 rounded-xl mb-8 w-fit ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    {[
                        { id: 'companies', label: 'Company Prep', icon: Building },
                        { id: 'recordings', label: 'Interview Recordings', icon: Video },
                        { id: 'resume', label: 'Resume Review', icon: FileText },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === tab.id
                                    ? isDark ? 'bg-white text-slate-900' : 'bg-white text-slate-900 shadow'
                                    : isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Company Prep */}
                {activeTab === 'companies' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.entries(COMPANY_QUESTIONS).map(([key, company]) => (
                            <motion.div
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                className={`p-6 rounded-2xl cursor-pointer ${isDark
                                        ? 'bg-white/5 border border-white/10 hover:border-white/20'
                                        : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg'
                                    }`}
                                onClick={() => setSelectedCompany(key)}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-r ${company.color}`}>
                                    {company.logo}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {company.name}
                                </h3>
                                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {company.questions.length} curated questions
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['behavioral', 'system', 'coding'].map((type) => (
                                        <span
                                            key={type}
                                            className={`px-2 py-1 rounded-lg text-xs capitalize ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Company Detail Modal */}
                {selectedCompany && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedCompany(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-6 ${isDark ? 'bg-slate-900' : 'bg-white'
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-r ${COMPANY_QUESTIONS[selectedCompany].color}`}>
                                    {COMPANY_QUESTIONS[selectedCompany].logo}
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {COMPANY_QUESTIONS[selectedCompany].name} Interview Prep
                                    </h2>
                                    <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                        Common questions and tips
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {COMPANY_QUESTIONS[selectedCompany].questions.map((q, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'
                                            }`}
                                    >
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${q.type === 'coding' ? 'bg-indigo-500/20 text-indigo-400' :
                                                q.type === 'system' ? 'bg-purple-500/20 text-purple-400' :
                                                    q.type === 'behavioral' ? 'bg-teal-500/20 text-teal-400' :
                                                        'bg-orange-500/20 text-orange-400'
                                            }`}>
                                            {q.type}
                                        </span>
                                        <p className={`mt-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                            {q.q}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <motion.button
                                onClick={() => {
                                    onSelectCompany && onSelectCompany(selectedCompany);
                                    setSelectedCompany(null);
                                }}
                                className="w-full mt-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                                whileHover={{ scale: 1.02 }}
                            >
                                Start {COMPANY_QUESTIONS[selectedCompany].name} Practice
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Interview Recordings */}
                {activeTab === 'recordings' && (
                    <div className="space-y-4">
                        {INTERVIEW_RECORDINGS.map((recording) => (
                            <motion.div
                                key={recording.id}
                                whileHover={{ scale: 1.01 }}
                                className={`flex items-center gap-4 p-4 rounded-2xl ${isDark
                                        ? 'bg-white/5 border border-white/10'
                                        : 'bg-white border border-slate-200 shadow-sm'
                                    }`}
                            >
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'
                                    }`}>
                                    {recording.free ? (
                                        <Play size={24} className="text-emerald-500" />
                                    ) : (
                                        <Lock size={24} className="text-yellow-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {recording.title}
                                    </h4>
                                    <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        <span>{recording.duration}</span>
                                        <span>{recording.views} views</span>
                                        <span className={`px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'
                                            }`}>
                                            {recording.level}
                                        </span>
                                    </div>
                                </div>
                                <button className={`px-4 py-2 rounded-xl font-medium ${recording.free
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                                    }`}>
                                    {recording.free ? 'Watch Free' : 'Premium'}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Resume Review */}
                {activeTab === 'resume' && (
                    <div className={`p-8 rounded-2xl text-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
                        }`}>
                        <FileText size={64} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-300'}`} />
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Resume Review Assistant
                        </h3>
                        <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            Get AI-powered feedback on your resume tailored for tech roles
                        </p>
                        <div className={`border-2 border-dashed rounded-2xl p-8 mb-6 ${isDark ? 'border-white/20' : 'border-slate-300'
                            }`}>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                                Drag and drop your resume here, or click to browse
                            </p>
                            <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                        </div>
                        <motion.button
                            className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                            whileHover={{ scale: 1.02 }}
                        >
                            <Crown className="inline mr-2" size={20} />
                            Unlock Premium Review
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
