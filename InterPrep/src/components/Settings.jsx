import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings as SettingsIcon, Volume2, Moon, Sun, Bell,
    Mic, Save, Trash2, Download, ChevronLeft,
    Check, Globe, Zap, Shield, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getSettings, saveSettings, exportData, clearHistory, resetGamification, resetOnboarding } from '../lib/storage';

// --- Sub-components ---

const Toggle = ({ value, onChange, isDark }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onChange(!value);
        }}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${value
            ? 'bg-indigo-600'
            : isDark ? 'bg-white/10' : 'bg-slate-200'
            }`}
    >
        <motion.div
            className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-md"
            animate={{ x: value ? 28 : 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
    </div>
);

const SettingItem = ({ icon: Icon, title, description, children, onClick, isDark }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between p-5 rounded-xl transition-all cursor-pointer group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
            }`}
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl transition-colors ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                <Icon size={20} />
            </div>
            <div>
                <p className={`text-base font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </p>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {description}
                </p>
            </div>
        </div>
        <div className="flex-shrink-0 ml-4">
            {children}
        </div>
    </div>
);

const Section = ({ title, children, isDark }) => (
    <div className="mb-8">
        <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
            {title}
        </h3>
        <div className={`rounded-2xl overflow-hidden ${isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white border border-slate-200 shadow-lg'
            }`}>
            <div className={`divide-y ${isDark ? 'divide-white/10' : 'divide-slate-100'}`}>
                {children}
            </div>
        </div>
    </div>
);

// --- Main Component ---

export function Settings({ onBack }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const [settings, setSettings] = useState(() => getSettings());
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (settings.theme !== theme) {
            setSettings(prev => ({ ...prev, theme }));
        }
    }, [theme]);

    const handleChange = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        saveSettings(settings);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleExport = () => {
        const data = exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `interprep-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleClearData = () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            clearHistory();
            resetGamification();
            resetOnboarding();
            alert('All data has been cleared.');
        }
    };

    return (
        <div className={`min-h-screen w-full ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Decorative Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] ${isDark ? 'bg-indigo-900/20' : 'bg-indigo-200/40'
                        }`}
                />
                <motion.div
                    animate={{
                        x: [0, -50, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] ${isDark ? 'bg-purple-900/20' : 'bg-purple-200/40'
                        }`}
                />
            </div>

            <div className="max-w-4xl mx-auto py-12 px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className={`group p-3 rounded-xl transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-white shadow-sm'
                                    }`}
                            >
                                <ChevronLeft size={24} className={isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'} />
                            </button>
                            <div>
                                <h1 className={`text-4xl font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    Settings
                                </h1>
                                <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Customize your interview experience
                                </p>
                            </div>
                        </div>
                        <AnimatePresence>
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                                        }`}
                                >
                                    <Check size={18} />
                                    <span className="font-semibold">Saved!</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="space-y-8">
                        {/* Voice Preferences */}
                        <Section title="Voice Preferences" isDark={isDark}>
                            <SettingItem
                                isDark={isDark}
                                icon={Volume2}
                                title="AI Voice Speed"
                                description="Adjust how fast the AI interviewer speaks"
                            >
                                <select
                                    value={settings.voiceSpeed}
                                    onChange={(e) => handleChange('voiceSpeed', parseFloat(e.target.value))}
                                    className={`text-sm font-semibold px-4 py-2 rounded-lg border-0 outline-none cursor-pointer transition-colors ${isDark
                                        ? 'bg-white/10 text-indigo-400 hover:bg-white/20'
                                        : 'bg-slate-100 text-indigo-600 hover:bg-slate-200'
                                        }`}
                                >
                                    <option value={0.75}>Slow</option>
                                    <option value={1}>Normal</option>
                                    <option value={1.25}>Fast</option>
                                    <option value={1.5}>Very Fast</option>
                                </select>
                            </SettingItem>

                            <SettingItem
                                isDark={isDark}
                                icon={Mic}
                                title="Auto Record"
                                description="Automatically start listening after AI finishes speaking"
                                onClick={() => handleChange('autoRecord', !settings.autoRecord)}
                            >
                                <Toggle
                                    isDark={isDark}
                                    value={settings.autoRecord}
                                    onChange={(v) => handleChange('autoRecord', v)}
                                />
                            </SettingItem>
                        </Section>

                        {/* Interface */}
                        <Section title="Interface" isDark={isDark}>
                            <SettingItem
                                isDark={isDark}
                                icon={isDark ? Moon : Sun}
                                title="Dark Mode"
                                description="Toggle between light and dark themes"
                                onClick={toggleTheme}
                            >
                                <Toggle
                                    isDark={isDark}
                                    value={isDark}
                                    onChange={toggleTheme}
                                />
                            </SettingItem>

                            <SettingItem
                                isDark={isDark}
                                icon={Zap}
                                title="Sound Effects"
                                description="Enable interface feedback sounds"
                                onClick={() => handleChange('soundEffects', !settings.soundEffects)}
                            >
                                <Toggle
                                    isDark={isDark}
                                    value={settings.soundEffects}
                                    onChange={(v) => handleChange('soundEffects', v)}
                                />
                            </SettingItem>
                        </Section>

                        {/* Account & Data */}
                        <Section title="Account & Data" isDark={isDark}>
                            <SettingItem
                                isDark={isDark}
                                icon={Shield}
                                title="Privacy Mode"
                                description="All data stays local on your device"
                            >
                                <span className={`text-sm font-bold px-3 py-1.5 rounded-lg ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                    Active
                                </span>
                            </SettingItem>

                            <div className="p-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={handleExport}
                                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${isDark
                                            ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        <Download size={18} />
                                        Export Data
                                    </button>
                                    <button
                                        onClick={handleClearData}
                                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${isDark
                                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                                            }`}
                                    >
                                        <Trash2 size={18} />
                                        Reset All
                                    </button>
                                </div>
                            </div>
                        </Section>

                        {/* Save Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleSave}
                                disabled={saved}
                                className={`w-full py-4 rounded-xl text-base font-bold transition-all shadow-lg ${saved
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/25'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 hover:scale-[1.02] active:scale-95'
                                    }`}
                            >
                                {saved ? '✓ Settings Saved' : 'Save All Changes'}
                            </button>
                            <p className={`text-center mt-6 text-sm font-medium ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                                InterPrep v1.0.4 • All data stored locally
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
