import { useState, useEffect, useRef, useCallback } from 'react';

export function useVoice() {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const finalTranscriptRef = useRef('');

    useEffect(() => {
        // Initialize Speech Recognition ONCE
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                recognition.maxAlternatives = 3; // Get multiple alternatives for better accuracy

                recognition.onresult = (event) => {
                    let interim = '';
                    let final = '';

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        const transcript = event.results[i][0].transcript;
                        const confidence = event.results[i][0].confidence;

                        // Log confidence for debugging
                        if (event.results[i].isFinal) {
                            console.log('Final transcript confidence:', confidence);
                        }

                        if (event.results[i].isFinal) {
                            final += transcript + ' ';
                        } else {
                            interim += transcript;
                        }
                    }

                    if (final) {
                        // Accumulate final transcripts
                        finalTranscriptRef.current += final;
                        setFinalTranscript(finalTranscriptRef.current.trim());
                        setTranscript(finalTranscriptRef.current.trim());
                        console.log('Captured final transcript:', final);
                    }

                    if (interim) {
                        setInterimTranscript(interim);
                        // Show combined final + interim
                        setTranscript((finalTranscriptRef.current + ' ' + interim).trim());
                    }
                };

                recognition.onend = () => {
                    console.log('Speech recognition ended');
                    setIsListening(false);
                };

                recognition.onerror = (event) => {
                    console.error('Speech recognition error:', event.error);

                    // Handle different error types
                    if (event.error === 'no-speech') {
                        console.log('No speech detected - this is normal, waiting for speech...');
                        // Don't stop listening, just continue
                    } else if (event.error === 'audio-capture') {
                        console.error('Microphone not accessible');
                        setIsListening(false);
                    } else if (event.error === 'not-allowed') {
                        console.error('Microphone permission denied');
                        setIsListening(false);
                    } else {
                        console.error('Other error:', event.error);
                        setIsListening(false);
                    }
                };

                recognition.onstart = () => {
                    console.log('Speech recognition started');
                };

                recognitionRef.current = recognition;
            } else {
                console.warn('Speech Recognition not supported in this browser');
            }
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.error('Error stopping recognition:', e);
                }
            }
        };
    }, []);

    const speak = useCallback((text) => {
        if (!synthRef.current) return;

        // Stop any ongoing speech and wait for it to fully stop
        synthRef.current.cancel();

        // Small delay to ensure speech synthesis is fully reset
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);

            utterance.onstart = () => {
                console.log('AI started speaking');
                setIsSpeaking(true);
            };

            utterance.onend = () => {
                console.log('AI finished speaking');
                setIsSpeaking(false);
            };

            utterance.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                setIsSpeaking(false);
            };

            // Find a decent voice with better fallback
            const voices = synthRef.current.getVoices();
            const preferredVoice = voices.find(v =>
                v.name.includes('Google US English') ||
                v.name.includes('Samantha') ||
                v.name.includes('Microsoft Zira') ||
                (v.lang.startsWith('en-') && v.localService)
            ) || voices.find(v => v.lang.startsWith('en-'));

            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            try {
                synthRef.current.speak(utterance);
            } catch (e) {
                console.error('Error speaking:', e);
                setIsSpeaking(false);
            }
        }, 100); // Small delay to ensure clean state
    }, []);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            try {
                // Clear previous transcripts
                finalTranscriptRef.current = '';
                setFinalTranscript('');
                setInterimTranscript('');
                setTranscript('');

                recognitionRef.current.start();
                setIsListening(true);
                console.log('Started listening...');
            } catch (e) {
                console.error("Error starting recognition:", e);
                // If already started, just update state
                if (e.name === 'InvalidStateError') {
                    setIsListening(true);
                }
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
                console.log('Stopped listening. Final transcript:', finalTranscriptRef.current);
            } catch (e) {
                console.error('Error stopping recognition:', e);
            }
            setIsListening(false);
        }
    }, [isListening]);

    const stopSpeaking = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    const clearTranscript = useCallback(() => {
        finalTranscriptRef.current = '';
        setFinalTranscript('');
        setInterimTranscript('');
        setTranscript('');
    }, []);

    const getCurrentTranscript = useCallback(() => {
        return finalTranscriptRef.current.trim();
    }, []);

    return {
        isListening,
        isSpeaking,
        transcript,
        interimTranscript,
        finalTranscript,
        speak,
        startListening,
        stopListening,
        stopSpeaking,
        clearTranscript,
        getCurrentTranscript,
        // For backward compatibility
        lastUserMessage: finalTranscript,
        setTranscript
    };
}
