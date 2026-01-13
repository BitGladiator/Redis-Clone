import React, { useState, useEffect, useRef } from 'react';
import {
    Github, Sun, Moon, Menu, X, Settings, ChevronDown,
    Code, BarChart3, Users, Crown, Zap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

export function Layout({ children, currentPage, onNavigate }) {
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Track scroll for navbar effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setSidebarOpen(false);
        setDropdownOpen(false);
    }, [currentPage]);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Primary nav items (always visible)
    const primaryNav = [
        { id: 'landing', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'history', label: 'Progress' },
        { id: 'analytics', label: 'Analytics' },
    ];

    // Dropdown items (under "More")
    const moreItems = [
        { id: 'simulations', label: 'Interview Simulations', icon: Zap, desc: 'Speed rounds & whiteboard' },
        { id: 'code-editor', label: 'Code Lab', icon: Code, desc: 'Practice coding challenges' },
        { id: 'social', label: 'Community', icon: Users, desc: 'Questions & leaderboard' },
        { id: 'premium', label: 'Premium', icon: Crown, desc: 'FAANG prep & recordings' },
    ];

    const isDark = theme === 'dark';

    const isMoreActive = moreItems.some(item => item.id === currentPage);

    return (
        <div className={`min-h-screen flex flex-col font-sans relative ${isDark ? 'bg-[#030712] text-slate-50' : 'bg-[#f8faf9] text-slate-900'
            }`}>
            {/* Background - Subtle grid pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Grid pattern */}
                <div
                    className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.4]'}`}
                    style={{
                        backgroundImage: isDark
                            ? 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)'
                            : 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
                {/* Fade overlay */}
                <div className={`absolute inset-0 ${isDark
                    ? 'bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80'
                    : 'bg-gradient-to-b from-[#f8faf9]/60 via-transparent to-[#f8faf9]/80'
                    }`}
                />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-80 z-[110] transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isDark ? 'bg-[#0a0a0f]' : 'bg-white'} border-r ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className={`p-6 border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Logo className="w-8 h-8" isDark={isDark} />
                            <span className="text-xl font-bold font-display">InterPrep</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {primaryNav.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${currentPage === item.id
                                ? isDark ? 'bg-[#2d6254]/20 text-[#8bc1af]' : 'bg-[#c5ddd4]/50 text-[#1a3c34]'
                                : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`} />
                    <p className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Tools
                    </p>

                    {moreItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${currentPage === item.id
                                ? isDark ? 'bg-[#2d6254]/20 text-[#8bc1af]' : 'bg-[#c5ddd4]/50 text-[#1a3c34]'
                                : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* NAVBAR - Pill style like reference */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className={`flex items-center justify-between h-14 px-2 pl-4 rounded-full transition-all duration-300 ${isDark
                        ? 'bg-slate-900/90 backdrop-blur-xl border border-white/10'
                        : 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20'
                        }`}
                    >
                        {/* Logo */}
                        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 group">
                            <Logo className="w-7 h-7" isDark={isDark} />
                            <span className={`text-base font-bold font-display hidden sm:block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                InterPrep
                            </span>
                        </button>

                        {/* Desktop Navigation - Centered */}
                        <nav className="hidden md:flex items-center gap-1">
                            {primaryNav.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentPage === item.id
                                        ? isDark ? 'text-white' : 'text-slate-900'
                                        : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                onClick={() => onNavigate('settings')}
                                className={`p-2 rounded-full transition-all ${currentPage === 'settings'
                                    ? isDark ? 'text-[#8bc1af] bg-[#2d6254]/20' : 'text-[#1a3c34] bg-[#c5ddd4]/50'
                                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                <Settings size={18} />
                            </button>

                            {/* Log In Button - Pill shaped */}
                            <button
                                onClick={() => onNavigate('landing')}
                                className={`hidden sm:flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all ${isDark
                                    ? 'bg-white text-slate-900 hover:bg-slate-100'
                                    : 'bg-[#1a1a1a] text-white hover:bg-slate-800'
                                    }`}
                            >
                                Log In
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className={`p-2 rounded-full md:hidden ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 pt-24">
                <div className="w-full">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className={`relative z-10 py-8 mt-12 border-t ${isDark ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-400'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm">© 2024 InterPrep. AI-powered interview practice.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <button onClick={() => onNavigate('about')} className="hover:text-[#2d6254] transition-colors">About</button>
                        <a href="#" className="hover:text-[#2d6254] transition-colors">Privacy</a>
                        <a href="https://github.com" target="_blank" className="hover:text-[#2d6254] transition-colors">
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
