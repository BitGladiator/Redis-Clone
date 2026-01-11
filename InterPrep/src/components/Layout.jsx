import React, { useState, useEffect, useRef } from 'react';
import {
    Github, Sun, Moon, Menu, X, Settings, ChevronDown,
    Code, BarChart3, Users, Crown, Zap, TrendingUp
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
    ];

    // Dropdown items (under "More")
    const moreItems = [
        { id: 'simulations', label: 'Interview Simulations', icon: Zap, desc: 'Speed rounds & whiteboard' },
        { id: 'code-editor', label: 'Code Lab', icon: Code, desc: 'Practice coding challenges' },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Performance insights' },
        { id: 'social', label: 'Community', icon: Users, desc: 'Questions & leaderboard' },
        { id: 'premium', label: 'Premium', icon: Crown, desc: 'FAANG prep & recordings' },
    ];

    const isDark = theme === 'dark';

    const isMoreActive = moreItems.some(item => item.id === currentPage);

    return (
        <div className={`min-h-screen flex flex-col font-sans relative ${isDark ? 'bg-[#030712] text-slate-50' : 'bg-white text-slate-900'
            }`}>
            {/* Background gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {isDark ? (
                    <>
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-[120px]" />
                        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[120px]" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[100px]" />
                    </>
                )}
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
                    {/* Primary Nav */}
                    {primaryNav.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${currentPage === item.id
                                    ? isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* Divider */}
                    <div className={`my-3 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`} />
                    <p className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Tools
                    </p>

                    {/* More Items */}
                    {moreItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all flex items-center gap-3 ${currentPage === item.id
                                    ? isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* NAVBAR */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? isDark
                        ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5'
                        : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
                    : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-6">
                        {/* Logo */}
                        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2.5 group">
                            <Logo className="w-9 h-9" isDark={isDark} />
                            <span className={`text-lg font-bold font-display hidden sm:block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                InterPrep
                            </span>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {/* Primary Nav */}
                            {primaryNav.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentPage === item.id
                                            ? isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'
                                            : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}

                            {/* More Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isMoreActive || dropdownOpen
                                            ? isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'
                                            : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    More
                                    <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className={`absolute top-full right-0 mt-2 w-72 rounded-xl overflow-hidden shadow-xl ${isDark
                                            ? 'bg-slate-900 border border-white/10'
                                            : 'bg-white border border-slate-200'
                                        }`}>
                                        {moreItems.map((item, idx) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    onNavigate(item.id);
                                                    setDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-start gap-3 p-3 text-left transition-all ${currentPage === item.id
                                                        ? isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'
                                                        : isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                                    } ${idx !== moreItems.length - 1 ? (isDark ? 'border-b border-white/5' : 'border-b border-slate-100') : ''}`}
                                            >
                                                <div className={`p-2 rounded-lg ${currentPage === item.id
                                                        ? 'bg-indigo-500 text-white'
                                                        : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    <item.icon size={18} />
                                                </div>
                                                <div>
                                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                        {item.label}
                                                    </div>
                                                    <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            <button
                                onClick={() => onNavigate('settings')}
                                className={`p-2 rounded-lg transition-all hidden sm:block ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                <Settings size={18} />
                            </button>

                            <button
                                onClick={() => onNavigate('landing')}
                                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isDark
                                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    }`}
                            >
                                Start Practice
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className={`p-2 rounded-lg md:hidden ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative z-10 pt-20">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className={`relative z-10 py-8 mt-12 border-t ${isDark ? 'border-white/5 text-slate-500' : 'border-slate-200 text-slate-400'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm">© 2024 InterPrep. AI-powered interview practice.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <button onClick={() => onNavigate('about')} className="hover:text-indigo-500 transition-colors">About</button>
                        <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
                        <a href="https://github.com" target="_blank" className="hover:text-indigo-500 transition-colors">
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
