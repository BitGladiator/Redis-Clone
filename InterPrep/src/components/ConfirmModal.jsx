import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger' // 'danger', 'warning', 'info'
}) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const variantStyles = {
        danger: {
            icon: AlertTriangle,
            iconColor: 'text-red-500',
            iconBg: isDark ? 'bg-red-500/20' : 'bg-red-100',
            buttonBg: 'bg-red-600 hover:bg-red-700',
        },
        warning: {
            icon: AlertTriangle,
            iconColor: 'text-amber-500',
            iconBg: isDark ? 'bg-amber-500/20' : 'bg-amber-100',
            buttonBg: 'bg-amber-600 hover:bg-amber-700',
        },
        info: {
            icon: Info,
            iconColor: 'text-indigo-500',
            iconBg: isDark ? 'bg-indigo-500/20' : 'bg-indigo-100',
            buttonBg: 'bg-indigo-600 hover:bg-indigo-700',
        },
    };

    const style = variantStyles[variant];
    const Icon = style.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-[201] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', duration: 0.3 }}
                            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${isDark
                                    ? 'bg-slate-900 border border-white/10'
                                    : 'bg-white border border-slate-200'
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`p-3 rounded-xl ${style.iconBg}`}>
                                    <Icon size={24} className={style.iconColor} />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'
                                        }`}>
                                        {title}
                                    </h3>
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                        {message}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className={`p-1 rounded-lg transition-colors ${isDark
                                            ? 'hover:bg-white/10 text-slate-400'
                                            : 'hover:bg-slate-100 text-slate-500'
                                        }`}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6">
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition-colors ${isDark
                                            ? 'bg-white/10 text-white hover:bg-white/20'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {cancelText}
                                </motion.button>
                                <motion.button
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 px-4 py-2.5 rounded-xl font-medium text-white transition-colors ${style.buttonBg}`}
                                >
                                    {confirmText}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
