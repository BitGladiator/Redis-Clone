import React, { useState, useEffect, useRef } from 'react';
import {
    Github, Sun, Moon, Menu, X, Settings, ChevronDown,
    Code, BarChart3, Users, Crown, Zap, LogOut, LogIn, UserPlus, User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';
import { LoginModal } from './auth/LoginModal';
import { SignupModal } from './auth/SignupModal';

export function Layout({ children, currentPage, onNavigate }) {
    const { theme, toggleTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userMenuRef = useRef(null);

    // Track scroll for navbar effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check initial state
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
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        setUserMenuOpen(false);
        onNavigate('landing');
    };

    // Primary nav items (conditionally shown based on auth status)
    const primaryNav = [
        { id: 'landing', label: 'Home' },
        { id: 'features', label: 'Features' },
        ...(isAuthenticated ? [
            { id: 'history', label: 'Progress' },
            { id: 'analytics', label: 'Analytics' },
        ] : [])
    ];

    // Dropdown items (under "More") - only visible to authenticated users
    const moreItems = isAuthenticated ? [
        { id: 'simulations', label: 'Interview Simulations', icon: Zap, desc: 'Speed rounds & whiteboard' },
        { id: 'code-editor', label: 'Code Lab', icon: Code, desc: 'Practice coding challenges' },
        { id: 'social', label: 'Community', icon: Users, desc: 'Questions & leaderboard' },
        { id: 'premium', label: 'Premium', icon: Crown, desc: 'FAANG prep & recordings' },
    ] : [];

    const isDark = theme === 'dark';
    const isMoreActive = moreItems.some(item => item.id === currentPage);
    const isLandingPage = currentPage === 'landing';

    // Navbar should be compact only on landing page when not scrolled
    const isCompact = isLandingPage && !scrolled;

    return (
        <div className={`min-h-screen flex flex-col font-sans relative ${isDark ? 'bg-[#030712] text-slate-50' : 'bg-[#f8faf9] text-slate-900'
            }`}>
            {/* Background - Enhanced with ambient glows for dark mode */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Dark mode ambient glows */}
                {isDark && (
                    <>
                        {/* Top-left forest green glow */}
                        <div
                            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.15]"
                            style={{ background: 'radial-gradient(circle, #2d6254 0%, transparent 70%)' }}
                        />
                        {/* Top-right subtle coral glow */}
                        <div
                            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.08]"
                            style={{ background: 'radial-gradient(circle, #f59d82 0%, transparent 70%)' }}
                        />
                        {/* Bottom center glow */}
                        <div
                            className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.12]"
                            style={{ background: 'radial-gradient(circle, #1a3c34 0%, transparent 70%)' }}
                        />
                        {/* Center ambient light */}
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-[0.06]"
                            style={{ background: 'radial-gradient(ellipse, #3d8570 0%, transparent 60%)' }}
                        />
                    </>
                )}
                {/* Grid pattern */}
                <div
                    className={`absolute inset-0 ${isDark ? 'opacity-[0.02]' : 'opacity-[0.4]'}`}
                    style={{
                        backgroundImage: isDark
                            ? 'linear-gradient(to right, #3d8570 1px, transparent 1px), linear-gradient(to bottom, #3d8570 1px, transparent 1px)'
                            : 'linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
                {/* Fade overlay */}
                <div className={`absolute inset-0 ${isDark
                    ? 'bg-gradient-to-b from-[#030712]/90 via-transparent to-[#030712]/90'
                    : 'bg-gradient-to-b from-[#f8faf9]/60 via-transparent to-[#f8faf9]/80'
                    }`}
                />
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Mobile Sidebar - Enhanced */}
            <div className={`fixed top-0 left-0 h-full w-80 z-[110] transform transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isDark ? 'bg-gradient-to-b from-[#0a0f14] via-[#080c10] to-[#050709]' : 'bg-white'} border-r ${isDark ? 'border-[#2d6254]/20' : 'border-slate-200'}`}
                style={isDark ? { boxShadow: '4px 0 40px -10px rgba(0, 0, 0, 0.8), 0 0 60px -20px rgba(45, 98, 84, 0.15)' } : {}}>

                {/* Dark mode sidebar ambient glow */}
                {isDark && (
                    <>
                        <div
                            className="absolute top-0 left-0 w-full h-32 pointer-events-none"
                            style={{ background: 'linear-gradient(to bottom, rgba(45, 98, 84, 0.08) 0%, transparent 100%)' }}
                        />
                        <div
                            className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(26, 60, 52, 0.1) 0%, transparent 100%)' }}
                        />
                    </>
                )}

                {/* Header */}
                <div className={`p-6 border-b relative ${isDark ? 'border-[#2d6254]/15 bg-gradient-to-r from-[#0d1318]/80 to-transparent' : 'border-slate-100'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${isDark ? 'bg-[#2d6254]/20 ring-1 ring-[#2d6254]/30' : 'bg-[#c5ddd4]/50'}`}>
                                <Logo className="w-6 h-6" isDark={isDark} />
                            </div>
                            <div>
                                <span className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>InterPrep</span>
                                <p className={`text-xs ${isDark ? 'text-[#8bc1af]/70' : 'text-slate-500'}`}>AI Interview Coach</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 relative overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                    {/* Primary Navigation */}
                    <p className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-widest ${isDark ? 'text-[#8bc1af]/50' : 'text-slate-400'}`}>
                        Navigation
                    </p>
                    {primaryNav.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${currentPage === item.id
                                ? isDark
                                    ? 'bg-gradient-to-r from-[#2d6254]/30 to-[#2d6254]/10 text-[#8bc1af] border border-[#2d6254]/30 shadow-lg shadow-[#2d6254]/10'
                                    : 'bg-[#c5ddd4]/50 text-[#1a3c34]'
                                : isDark
                                    ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                {currentPage === item.id && (
                                    <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#8bc1af]' : 'bg-[#2d6254]'}`} />
                                )}
                                {item.label}
                            </span>
                        </button>
                    ))}

                    {/* Tools Section - Only show for authenticated users */}
                    {isAuthenticated && moreItems.length > 0 && (
                        <>
                            {/* Divider */}
                            <div className={`my-4 mx-3 border-t ${isDark ? 'border-[#2d6254]/15' : 'border-slate-100'}`} />

                            {/* Tools Section */}
                            <p className={`px-3 py-2 text-[10px] font-semibold uppercase tracking-widest ${isDark ? 'text-[#8bc1af]/50' : 'text-slate-400'}`}>
                                Tools & Features
                            </p>

                            {moreItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 ${currentPage === item.id
                                        ? isDark
                                            ? 'bg-gradient-to-r from-[#2d6254]/30 to-[#2d6254]/10 text-[#8bc1af] border border-[#2d6254]/30 shadow-lg shadow-[#2d6254]/10'
                                            : 'bg-[#c5ddd4]/50 text-[#1a3c34]'
                                        : isDark
                                            ? 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${currentPage === item.id
                                        ? isDark ? 'bg-[#2d6254]/30' : 'bg-[#2d6254]/20'
                                        : isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                        <item.icon size={16} className={currentPage === item.id ? (isDark ? 'text-[#8bc1af]' : 'text-[#2d6254]') : ''} />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block">{item.label}</span>
                                        <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.desc}</span>
                                    </div>
                                </button>
                            ))}
                        </>
                    )}
                </nav>

                {/* Footer - User Profile Area or Auth Buttons */}
                <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${isDark ? 'border-[#2d6254]/15 bg-gradient-to-t from-[#0a0f14] to-transparent' : 'border-slate-100 bg-white'}`}>
                    {isAuthenticated && user ? (
                        <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-50'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-[#2d6254] to-[#1a3c34]' : 'bg-[#c5ddd4]'}`}>
                                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#1a3c34]'}`}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{user.email}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSidebarOpen(false);
                                        onNavigate('settings');
                                    }}
                                    className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-200 text-slate-500'}`}
                                >
                                    <Settings size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setSidebarOpen(false);
                                    setShowLoginModal(true);
                                }}
                                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all ${isDark
                                        ? 'bg-[#2d6254] hover:bg-[#3d8570] text-white'
                                        : 'bg-[#1a3c34] hover:bg-[#234e44] text-white'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setSidebarOpen(false);
                                    setShowSignupModal(true);
                                }}
                                className={`w-full px-4 py-2.5 rounded-xl font-semibold transition-all border ${isDark
                                        ? 'border-[#2d6254]/50 bg-[#2d6254]/10 hover:bg-[#2d6254]/20 text-[#8bc1af]'
                                        : 'border-[#1a3c34] bg-transparent hover:bg-slate-50 text-[#1a3c34]'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* NAVBAR - Width expands on scroll */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300">
                <div className={`mx-auto transition-all duration-700 ease-in-out ${scrolled ? 'max-w-6xl' : 'max-w-[800px]'}`}>
                    <div
                        className={`flex items-center justify-between transition-all duration-700 ease-in-out rounded-full ${scrolled ? 'px-6 h-14' : 'px-4 h-14'
                            } ${isDark
                                ? scrolled
                                    ? 'bg-slate-900/95 backdrop-blur-xl border border-[#2d6254]/25 shadow-lg shadow-black/30'
                                    : 'bg-slate-900/80 backdrop-blur-xl border border-white/10'
                                : scrolled
                                    ? 'bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-300/30'
                                    : 'bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-200/20'
                            }`}
                    >
                        {/* Logo */}
                        <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 mr-3 group flex-shrink-0">
                            <Logo className="w-7 h-7" isDark={isDark} />
                            <span className={`font-bold font-display text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                InterPrep
                            </span>
                        </button>

                        {/* Desktop Navigation */}
                        <nav className={`hidden md:flex items-center flex-1 justify-center transition-all duration-700 ${scrolled ? 'gap-2' : 'gap-1'}`}>
                            {primaryNav.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === item.id
                                        ? isDark ? 'text-white bg-white/5' : 'text-slate-900 bg-slate-100/80'
                                        : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className={`flex items-center flex-shrink-0 transition-all ml-14 duration-700 ${scrolled ? 'gap-2' : 'gap-1 sm:gap-2'}`}>
                            {/* Auth Buttons - Show only when NOT authenticated and on larger screens */}
                            {!isAuthenticated && (
                                <>

                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="hidden lg:flex items-center gap-2 px-3 xl:px-4 py-1.5 rounded-full text-sm font-semibold bg-[#2d6254] text-white hover:bg-[#3d8570] transition-all"
                                    >
                                        <LogIn size={16} />
                                        <span className="hidden xl:inline">Login</span>
                                    </button>
                                </>
                            )}

                            {/* User Menu - Show only when authenticated and on larger screens */}
                            {isAuthenticated && user && (
                                <div ref={userMenuRef} className="relative hidden lg:block">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className={`flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-1.5 rounded-full transition-all ${isDark
                                            ? 'hover:bg-white/10 text-slate-300'
                                            : 'hover:bg-slate-100 text-slate-700'
                                            }`}
                                    >
                                        <div className={`w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center text-xs xl:text-sm font-bold ${isDark
                                            ? 'bg-gradient-to-br from-[#2d6254] to-[#1a3c34] text-white'
                                            : 'bg-[#c5ddd4] text-[#1a3c34]'
                                            }`}>
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden xl:inline text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                                        <ChevronDown size={14} className={`hidden xl:inline transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {userMenuOpen && (
                                        <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border z-50 ${isDark
                                            ? 'bg-slate-900 border-slate-700'
                                            : 'bg-white border-slate-200'
                                            }`}>
                                            <div className={`px-4 py-3 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'
                                                }`}>
                                                <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                                    {user.name}
                                                </p>
                                                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => {
                                                        setUserMenuOpen(false);
                                                        onNavigate('profile');
                                                    }}
                                                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${isDark
                                                        ? 'hover:bg-slate-800 text-slate-300'
                                                        : 'hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                >
                                                    <User size={16} />
                                                    Profile
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setUserMenuOpen(false);
                                                        onNavigate('settings');
                                                    }}
                                                    className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${isDark
                                                        ? 'hover:bg-slate-800 text-slate-300'
                                                        : 'hover:bg-slate-50 text-slate-700'
                                                        }`}
                                                >
                                                    <Settings size={16} />
                                                    Settings
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors text-red-500 hover:bg-red-500/10"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Theme Toggle - Hidden on small screens */}
                            <button
                                onClick={toggleTheme}
                                className={`hidden sm:flex p-2 rounded-full transition-all ${isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                            >
                                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                            </button>

                            {/* Settings Button - Hidden on mobile, available in sidebar */}
                            <button
                                onClick={() => onNavigate('settings')}
                                className={`hidden md:flex p-2 rounded-full transition-all ${currentPage === 'settings'
                                    ? isDark ? 'text-[#8bc1af] bg-[#2d6254]/20' : 'text-[#1a3c34] bg-[#c5ddd4]/50'
                                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                    }`}
                            >
                                <Settings size={18} />
                            </button>

                            {/* Start Interview Button - Hidden on mobile, appears on scroll on larger screens */}
                            <button
                                onClick={() => {
                                    onNavigate('landing');
                                    // Scroll to config section after navigation
                                    setTimeout(() => {
                                        document.getElementById('config-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }}
                                className={`hidden md:flex items-center gap-1 px-3 xl:px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                                    } ${isDark
                                        ? 'bg-[#2d6254] text-white hover:bg-[#3d8570]'
                                        : 'bg-[#1a3c34] text-white hover:bg-[#234e44]'
                                    }`}
                            >
                                <Zap size={16} className="xl:hidden" />
                                <span className="hidden xl:inline">Start Interview</span>
                                <span className="xl:hidden">Start</span>
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

            {/* Auth Modals */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToSignup={() => setShowSignupModal(true)}
            />
            <SignupModal
                isOpen={showSignupModal}
                onClose={() => setShowSignupModal(false)}
                onSwitchToLogin={() => setShowLoginModal(true)}
            />

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
