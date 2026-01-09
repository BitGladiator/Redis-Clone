import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Landing } from './components/Landing';
import { Features } from './components/Features';
import { About } from './components/About';
import { InterviewSession } from './components/InterviewSession';
import { Report } from './components/Report';

function App() {
    const [view, setView] = useState('landing');
    const [config, setConfig] = useState(null);
    const [results, setResults] = useState(null);

    const handleStart = (cfg) => {
        setConfig(cfg);
        setView('interview');
    };

    const handleEnd = (res) => {
        setResults(res);
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

    return (
        <ThemeProvider>
            <Layout currentPage={view} onNavigate={navigate}>
                {view === 'landing' && <Landing onStart={handleStart} />}
                {view === 'features' && <Features onBack={() => setView('landing')} />}
                {view === 'about' && <About onBack={() => setView('landing')} />}
                {view === 'interview' && <InterviewSession config={config} onEnd={handleEnd} />}
                {view === 'report' && <Report results={results} config={config} onRestart={handleRestart} />}
            </Layout>
        </ThemeProvider>
    );
}

export default App;
