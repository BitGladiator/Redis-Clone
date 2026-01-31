import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';

export function VoiceControls({ isListening, isSpeaking, onMicToggle }) {
    return (
        <div className="relative flex flex-col items-center justify-center py-8">
            {/* Orb Visualizer */}
            <div className="relative w-56 h-56 flex items-center justify-center mb-8 pointer-events-none">
                {/* Outer Glows */}
                <motion.div
                    animate={{
                        scale: isSpeaking || isListening ? [1, 1.25, 1] : 1,
                        opacity: isSpeaking ? 0.5 : isListening ? 0.3 : 0.05,
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-full blur-[60px] ${isSpeaking ? 'bg-primary-500' : 'bg-accent-400'
                        }`}
                />

                <motion.div
                    animate={{
                        scale: isSpeaking ? [1.1, 1.3, 1.1] : 1,
                        rotate: isSpeaking ? [0, 90, 0] : 0,
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className={`absolute inset-4 rounded-full blur-[40px] opacity-20 ${isSpeaking ? 'bg-purple-500' : 'bg-teal-500'}`}
                />

                {/* Core Orb */}
                <div className="relative z-10 w-32 h-32">
                    {/* Spinning border ring */}
                    <div className="absolute inset-[-4px] rounded-full border border-white/10" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-4px] rounded-full border-t border-white/30"
                    />

                    <div className="relative w-full h-full rounded-full glass-panel border border-white/10 flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                        {/* Inner fluid */}
                        <motion.div
                            animate={{
                                scale: isSpeaking ? [1, 1.15, 1] : 1,
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
                            className={`w-full h-full absolute inset-0 opacity-30 transition-colors duration-500 ${isSpeaking
                                ? 'bg-gradient-to-br from-primary-400 via-purple-500 to-indigo-600'
                                : isListening
                                    ? 'bg-gradient-to-br from-accent-400 via-teal-500 to-emerald-600'
                                    : 'bg-slate-800'
                                }`}
                        />

                        {/* Icon */}
                        <motion.div
                            animate={{ scale: isSpeaking ? [1, 1.1, 1] : 1 }}
                            className="relative z-20"
                        >
                            {isSpeaking ? (
                                <Volume2 size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                            ) : (
                                <Mic size={40} className={`${isListening ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-slate-500'} transition-colors duration-300`} />
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={onMicToggle}
                    className={`group relative p-5 rounded-full transition-all duration-300 ${isListening
                        ? 'bg-accent-500/20 text-accent-300 ring-1 ring-accent-500/50 hover:bg-accent-500/30'
                        : 'bg-white/5 text-slate-400 ring-1 ring-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <div className={`absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${isListening ? 'bg-accent-500 blur-xl' : 'bg-white blur-lg'}`} />
                    <div className="relative z-10">
                        {isListening ? <Mic size={28} /> : <MicOff size={28} />}
                    </div>
                </button>
                <div className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isSpeaking ? 'text-primary-400' : isListening ? 'text-accent-400' : 'text-slate-500'}`}>
                    {isSpeaking ? 'AI Speaking' : isListening ? 'Listening' : 'Mic Off'}
                </div>
            </div>
        </div>
    );
}
