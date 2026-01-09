import React from 'react';

export const Logo = ({ className = "w-8 h-8", isDark = true }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle cx="50" cy="50" r="45" stroke="url(#logoGradient)" strokeWidth="3" fill="none" />

        {/* Microphone body */}
        <rect x="38" y="25" width="24" height="30" rx="12" fill="url(#logoGradient)" />

        {/* Microphone stand */}
        <path d="M 50 55 L 50 70" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
        <path d="M 38 70 L 62 70" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />

        {/* Sound waves left */}
        <path d="M 28 40 Q 22 50, 28 60" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 20 35 Q 12 50, 20 65" stroke="url(#logoGradient)" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />

        {/* Sound waves right */}
        <path d="M 72 40 Q 78 50, 72 60" stroke="url(#logoGradient)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 80 35 Q 88 50, 80 65" stroke="url(#logoGradient)" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
);
