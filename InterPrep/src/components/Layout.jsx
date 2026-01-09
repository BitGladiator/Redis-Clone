import React, { useState, useEffect } from 'react';
import { Github, Sun, Moon, Menu, X, Home, Layers, Info, ChevronRight, Settings } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

export function Layout({ children, currentPage, onNavigate }) {
    const { theme, toggleTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
    }, [currentPage]);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const navItems = [
        { id: 'landing', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'history', label: 'Progress' },
        { id: 'about', label: 'About' },
    ];

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen flex flex-col font-sans relative ${isDark ? 'bg-[#030712] text-slate-50' : 'bg-white text-slate-900'
            }`}>
            {/* Background gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {isDark ? (
                    <>
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-[120px]" />
                        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[120px]" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-teal-500/8 blur-[120px]" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-[100px]" />
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

                <nav className="p-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl mb-1 font-medium transition-all ${currentPage === item.id
                                ? isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                                : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                    <button
                        onClick={toggleTheme}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl mb-3 ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-700'
                            }`}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>

            {/* PREMIUM NAVBAR */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? isDark
                    ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
                    : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-200/20'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between h-20 px-6">
                        {/* Logo */}
                        <button onClick={() => onNavigate('landing')} className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className={`absolute -inset-2 rounded-xl blur-lg transition-opacity duration-500 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-400/20'
                                    } opacity-0 group-hover:opacity-100`} />
                                <Logo className="relative w-10 h-10" isDark={isDark} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xl font-bold font-display tracking-tight ${isDark ? 'text-white' : 'text-slate-900'
                                    }`}>
                                    InterPrep
                                </span>
                                <span className={`text-[10px] font-medium tracking-widest uppercase ${isDark ? 'text-indigo-400' : 'text-indigo-600'
                                    }`}>
                                    AI Interview Coach
                                </span>
                            </div>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center">
                            {/* Nav Links */}
                            <div className={`flex items-center gap-1 p-1.5 rounded-full mr-4 ${isDark ? 'bg-white/5' : 'bg-slate-100'
                                }`}>
                                {navItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onNavigate(item.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === item.id
                                            ? isDark
                                                ? 'bg-white text-slate-900 shadow-lg'
                                                : 'bg-white text-slate-900 shadow-md'
                                            : isDark
                                                ? 'text-slate-400 hover:text-white'
                                                : 'text-slate-600 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>

                            {/* Right side actions */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className={`p-2.5 rounded-full transition-all duration-300 ${isDark
                                        ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                                </button>

                                <button
                                    onClick={() => onNavigate('settings')}
                                    className={`p-2.5 rounded-full transition-all duration-300 ${isDark
                                        ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    <Settings size={18} />
                                </button>

                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 rounded-full transition-all duration-300 ${isDark
                                        ? 'text-slate-400 hover:text-white hover:bg-white/10'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    <Github size={18} />
                                </a>

                                <button
                                    onClick={() => onNavigate('landing')}
                                    className={`ml-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isDark
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105'
                                        }`}
                                >
                                    Get Started
                                </button>
                            </div>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className={`p-2 rounded-full ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
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
                    <p className="text-sm">© 2024 InterPrep. Built with AI for your success.</p>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="#" className="hover:text-indigo-500 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-indigo-500 transition-colors">Terms</a>
                        <a href="#" className="hover:text-indigo-500 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
