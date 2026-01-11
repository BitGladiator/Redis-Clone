import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings as SettingsIcon, Volume2, Moon, Sun, Bell,
    Mic, Save, Trash2, Download, ChevronLeft,
    Check, Globe, Zap, Shield
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getSettings, saveSettings, exportData, clearHistory, resetGamification, resetOnboarding } from '../lib/storage';

// --- Sub-components (defined outside to prevent buggy remounting) ---

const Toggle = ({ value, onChange, isDark }) => (
    <div
        onClick={(e) => {
            e.stopPropagation();
            onChange(!value);
        }}
        className={`relative w-10 h-5 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${value
                ? 'bg-indigo-500'
                : isDark ? 'bg-white/10' : 'bg-slate-200'
            }`}
    >
        <motion.div
            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
            animate={{ x: value ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />
    </div>
);

const SettingItem = ({ icon: Icon, title, description, children, onClick, isDark }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between py-2.5 px-2 -mx-2 rounded-lg transition-colors cursor-pointer group ${isDark ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
            }`}
    >
        <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded-md transition-colors ${isDark ? 'bg-white/5 text-slate-400 group-hover:text-indigo-400' : 'bg-slate-100 text-slate-500 group-hover:text-indigo-600'
                }`}>
                <Icon size={14} />
            </div>
            <div>
                <p className={`text-[13px] font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {title}
                </p>
                <p className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
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
    <div className="mb-6 last:mb-0">
        <h3 className={`text-[10px] font-bold uppercase tracking-[0.1em] mb-2 px-1 ${isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
            {title}
        </h3>
        <div className={`rounded-xl p-1.5 ${isDark
                ? 'bg-white/[0.015] border border-white/[0.05]'
                : 'bg-white border border-slate-100 shadow-sm'
            }`}>
            <div className="divide-y divide-white/[0.02] dark:divide-white/[0.02] light:divide-slate-50">
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

    // Keep settings.theme in sync with context if it exists there
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
        <div className="max-w-md mx-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                {/* Refined Header */}
                <div className="flex items-center justify-between mb-8 px-1">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className={`group p-1.5 rounded-full transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                                }`}
                        >
                            <ChevronLeft size={18} className={isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-900'} />
                        </button>
                        <h1 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Settings
                        </h1>
                    </div>
                    {saved && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[11px] font-medium text-emerald-500 flex items-center gap-1.5"
                        >
                            <Check size={12} />
                            Changes saved
                        </motion.div>
                    )}
                </div>

                <div className="space-y-1">
                    {/* Voice Preferences */}
                    <Section title="Voice Preferences" isDark={isDark}>
                        <SettingItem
                            isDark={isDark}
                            icon={Volume2}
                            title="AI Voice Speed"
                            description="Response pace"
                        >
                            <select
                                value={settings.voiceSpeed}
                                onChange={(e) => handleChange('voiceSpeed', parseFloat(e.target.value))}
                                className={`text-[11px] font-semibold px-2 py-1 rounded bg-transparent border-0 outline-none cursor-pointer ${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                                    }`}
                            >
                                <option value={0.75}>Slow</option>
                                <option value={1}>Normal</option>
                                <option value={1.25}>Fast</option>
                                <option value={1.5}>Extreme</option>
                            </select>
                        </SettingItem>

                        <SettingItem
                            isDark={isDark}
                            icon={Mic}
                            title="Auto Record"
                            description="Listen after AI finishes"
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
                            description="System appearance"
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
                            description="Interface feedback"
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
                            title="Privacy"
                            description="Secure practice mode"
                        >
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active</span>
                        </SettingItem>

                        <div className="flex gap-2 p-2">
                            <button
                                onClick={handleExport}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[11px] font-bold transition-all ${isDark
                                        ? 'bg-white/5 text-slate-300 hover:bg-white/10'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                <Download size={12} />
                                EXPORT DATA
                            </button>
                            <button
                                onClick={handleClearData}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[11px] font-bold transition-all ${isDark
                                        ? 'bg-red-500/5 text-red-400 hover:bg-red-500/10'
                                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                                    }`}
                            >
                                <Trash2 size={12} />
                                RESET ALL
                            </button>
                        </div>
                    </Section>

                    {/* Footer Actions */}
                    <div className="pt-8">
                        <button
                            onClick={handleSave}
                            disabled={saved}
                            className={`w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg ${saved
                                    ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 hover:-translate-y-0.5 mt-2'
                                }`}
                        >
                            {saved ? 'Settings Updated' : 'Save all changes'}
                        </button>
                        <p className={`text-center mt-4 text-[10px] uppercase tracking-widest font-medium ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                            InterPrep Internal v1.0.4
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
