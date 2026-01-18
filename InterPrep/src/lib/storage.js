// Local Storage Service for Practice History, Settings, and Gamification

const STORAGE_KEYS = {
    HISTORY: 'interprep_history',
    SETTINGS: 'interprep_settings',
    GAMIFICATION: 'interprep_gamification',
    ONBOARDING: 'interprep_onboarding_complete',
};

// Default settings
const DEFAULT_SETTINGS = {
    voiceSpeed: 1,
    theme: 'dark',
    notifications: true,
    soundEffects: true,
    autoRecord: false,
};

// Default gamification state
const DEFAULT_GAMIFICATION = {
    points: 0,
    streak: 0,
    lastPracticeDate: null,
    totalSessions: 0,
    badges: [],
    level: 1,
};

// Badge definitions
export const BADGES = [
    { id: 'first_interview', name: 'First Steps', description: 'Complete your first interview', requirement: 1 },
    { id: 'five_sessions', name: 'Getting Serious', description: 'Complete 5 practice sessions', requirement: 5 },
    { id: 'ten_sessions', name: 'Dedicated', description: 'Complete 10 practice sessions', requirement: 10 },
    { id: 'streak_3', name: 'On Fire', description: '3-day practice streak', requirement: 3 },
    { id: 'streak_7', name: 'Week Warrior', description: '7-day practice streak', requirement: 7 },
    { id: 'high_score', name: 'Top Performer', description: 'Score 90+ on an interview', requirement: 90 },
    { id: 'all_roles', name: 'Versatile', description: 'Practice all role types', requirement: 4 },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete interview under 3 minutes', requirement: 180 },
];

// History Management
export const getHistory = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveSession = (session) => {
    const history = getHistory();
    const newSession = {
        id: Date.now(),
        date: new Date().toISOString(),
        ...session,
    };
    history.unshift(newSession);
    // Keep only last 50 sessions
    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));

    // Update gamification
    updateGamification(session);

    return newSession;
};

export const clearHistory = () => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
};

// Settings Management
export const getSettings = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
};

export const saveSettings = (settings) => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Gamification Management
export const getGamification = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
        return data ? { ...DEFAULT_GAMIFICATION, ...JSON.parse(data) } : DEFAULT_GAMIFICATION;
    } catch {
        return DEFAULT_GAMIFICATION;
    }
};

const updateGamification = (session) => {
    const game = getGamification();
    const today = new Date().toDateString();
    const lastDate = game.lastPracticeDate ? new Date(game.lastPracticeDate).toDateString() : null;

    // Update streak
    if (lastDate === today) {
        // Same day, no streak change
    } else if (lastDate === new Date(Date.now() - 86400000).toDateString()) {
        // Yesterday - continue streak
        game.streak += 1;
    } else {
        // Streak broken
        game.streak = 1;
    }

    game.lastPracticeDate = new Date().toISOString();
    game.totalSessions += 1;

    // Calculate points
    const basePoints = 50;
    const scoreBonus = Math.floor((session.score || 70) / 10) * 10;
    const streakBonus = game.streak * 5;
    game.points += basePoints + scoreBonus + streakBonus;

    // Calculate level (100 points per level)
    game.level = Math.floor(game.points / 500) + 1;

    // Check for new badges
    const newBadges = [];

    if (game.totalSessions >= 1 && !game.badges.includes('first_interview')) {
        game.badges.push('first_interview');
        newBadges.push('first_interview');
    }
    if (game.totalSessions >= 5 && !game.badges.includes('five_sessions')) {
        game.badges.push('five_sessions');
        newBadges.push('five_sessions');
    }
    if (game.totalSessions >= 10 && !game.badges.includes('ten_sessions')) {
        game.badges.push('ten_sessions');
        newBadges.push('ten_sessions');
    }
    if (game.streak >= 3 && !game.badges.includes('streak_3')) {
        game.badges.push('streak_3');
        newBadges.push('streak_3');
    }
    if (game.streak >= 7 && !game.badges.includes('streak_7')) {
        game.badges.push('streak_7');
        newBadges.push('streak_7');
    }
    if ((session.score || 0) >= 90 && !game.badges.includes('high_score')) {
        game.badges.push('high_score');
        newBadges.push('high_score');
    }
    if ((session.duration || 0) < 180 && !game.badges.includes('speed_demon')) {
        game.badges.push('speed_demon');
        newBadges.push('speed_demon');
    }

    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(game));

    return { game, newBadges };
};

export const resetGamification = () => {
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(DEFAULT_GAMIFICATION));
};

// Onboarding
export const isOnboardingComplete = () => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'true';
};

export const completeOnboarding = () => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, 'true');
};

export const resetOnboarding = () => {
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING);
};

// Export to JSON (for download)
export const exportData = () => {
    return {
        history: getHistory(),
        settings: getSettings(),
        gamification: getGamification(),
        exportDate: new Date().toISOString(),
    };
};
