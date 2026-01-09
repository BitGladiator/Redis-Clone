import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon, Volume2, Moon, Sun, Bell,
    Mic, Save, RotateCcw, Trash2, Download, ChevronRight,
    Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getSettings, saveSettings, exportData, clearHistory, resetGamification, resetOnboarding } from '../lib/storage';

export function Settings({ onBack }) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const [settings, setSettings] = useState(getSettings());
    const [saved, setSaved] = useState(false);

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

    const SettingRow = ({ icon: Icon, title, description, children }) => (
        <div className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-50'
            }`}>
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                    <Icon size={20} className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
                </div>
                <div>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
                </div>
            </div>
            {children}
        </div>
    );

    const Toggle = ({ value, onChange }) => (
        <button
            onClick={() => onChange(!value)}
            className={`relative w-12 h-6 rounded-full transition-colors ${value
                    ? 'bg-indigo-500'
                    : isDark ? 'bg-white/20' : 'bg-slate-300'
                }`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-7' : 'translate-x-1'
                }`} />
        </button>
    );

    return (
        <div className="min-h-[80vh] py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                    >
                        <ChevronRight size={24} className="rotate-180" />
                    </button>
                    <div>
                        <h1 className={`text-3xl font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Settings
                        </h1>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            Customize your interview experience
                        </p>
                    </div>
                </div>

                <div className="max-w-2xl space-y-6">
                    {/* Voice Settings */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Voice & Audio
                        </h3>
                        <div className="space-y-4">
                            <SettingRow
                                icon={Volume2}
                                title="Voice Speed"
                                description="Adjust AI speaking speed"
                            >
                                <select
                                    value={settings.voiceSpeed}
                                    onChange={(e) => handleChange('voiceSpeed', parseFloat(e.target.value))}
                                    className={`px-3 py-2 rounded-lg ${isDark
                                            ? 'bg-white/10 text-white border-white/10'
                                            : 'bg-white border border-slate-200'
                                        }`}
                                >
                                    <option value={0.75}>Slow</option>
                                    <option value={1}>Normal</option>
                                    <option value={1.25}>Fast</option>
                                    <option value={1.5}>Very Fast</option>
                                </select>
                            </SettingRow>

                            <SettingRow
                                icon={Mic}
                                title="Auto-Record"
                                description="Automatically record your responses"
                            >
                                <Toggle
                                    value={settings.autoRecord}
                                    onChange={(v) => handleChange('autoRecord', v)}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Appearance
                        </h3>
                        <div className="space-y-4">
                            <SettingRow
                                icon={isDark ? Moon : Sun}
                                title="Theme"
                                description={`Currently using ${theme} mode`}
                            >
                                <Toggle
                                    value={isDark}
                                    onChange={toggleTheme}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Notifications
                        </h3>
                        <div className="space-y-4">
                            <SettingRow
                                icon={Bell}
                                title="Practice Reminders"
                                description="Get reminded to practice daily"
                            >
                                <Toggle
                                    value={settings.notifications}
                                    onChange={(v) => handleChange('notifications', v)}
                                />
                            </SettingRow>

                            <SettingRow
                                icon={Volume2}
                                title="Sound Effects"
                                description="Play sounds for actions"
                            >
                                <Toggle
                                    value={settings.soundEffects}
                                    onChange={(v) => handleChange('soundEffects', v)}
                                />
                            </SettingRow>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'
                        }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Data Management
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <motion.button
                                onClick={handleExport}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark
                                        ? 'bg-white/10 text-white hover:bg-white/20'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Download size={18} />
                                Export Data
                            </motion.button>

                            <motion.button
                                onClick={handleClearData}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${isDark
                                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Trash2 size={18} />
                                Clear All Data
                            </motion.button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <motion.button
                        onClick={handleSave}
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold ${saved
                                ? 'bg-emerald-500 text-white'
                                : isDark
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {saved ? <Check size={20} /> : <Save size={20} />}
                        {saved ? 'Saved!' : 'Save Settings'}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}
