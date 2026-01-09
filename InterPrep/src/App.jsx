import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Landing } from './components/Landing';
import { Features } from './components/Features';
import { About } from './components/About';
import { Settings } from './components/Settings';
import { History } from './components/History';
import { Onboarding } from './components/Onboarding';
import { InterviewSession } from './components/InterviewSession';
import { Report } from './components/Report';
import { isOnboardingComplete, saveSession } from './lib/storage';

function App() {
    const [view, setView] = useState('landing');
    const [config, setConfig] = useState(null);
    const [results, setResults] = useState(null);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        // Check if onboarding should be shown
        if (!isOnboardingComplete()) {
            setShowOnboarding(true);
        }
    }, []);

    const handleStart = (cfg) => {
        setConfig(cfg);
        setView('interview');
    };

    const handleEnd = (res) => {
        // Calculate score
        const messageCount = res?.messages?.filter(m => m.role === 'user').length || 0;
        const avgLength = res?.messages
            ?.filter(m => m.role === 'user')
            .reduce((acc, m) => acc + (m.text?.length || 0), 0) / Math.max(messageCount, 1) || 0;

        const baseScore = 70;
        const engagementBonus = Math.min(messageCount * 5, 15);
        const detailBonus = avgLength > 50 ? 10 : avgLength > 20 ? 5 : 0;
        const score = Math.min(baseScore + engagementBonus + detailBonus, 98);

        const fullResults = { ...res, score, config };
        setResults(fullResults);

        // Save to history
        saveSession({
            config,
            score,
            duration: res.duration,
            messageCount,
        });

        setView('report');
    };

    const handleRestart = () => {
        setView('landing');
        setConfig(null);
        setResults(null);
    };

    const navigate = (page) => {
        setView(page);
    };

    const handleOnboardingComplete = () => {
        setShowOnboarding(false);
    };

    return (
        <ThemeProvider>
            {/* Onboarding overlay */}
            {showOnboarding && (
                <Onboarding onComplete={handleOnboardingComplete} />
            )}

            <Layout currentPage={view} onNavigate={navigate}>
                {view === 'landing' && <Landing onStart={handleStart} />}
                {view === 'features' && <Features onBack={() => setView('landing')} />}
                {view === 'about' && <About onBack={() => setView('landing')} />}
                {view === 'settings' && <Settings onBack={() => setView('landing')} />}
                {view === 'history' && (
                    <History
                        onBack={() => setView('landing')}
                        onStartNew={() => setView('landing')}
                    />
                )}
                {view === 'interview' && <InterviewSession config={config} onEnd={handleEnd} />}
                {view === 'report' && <Report results={results} config={config} onRestart={handleRestart} />}
            </Layout>
        </ThemeProvider>
    );
}

export default App;
