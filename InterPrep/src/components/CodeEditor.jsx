import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Check, X, Copy, Download, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Coding challenges database
const CODING_CHALLENGES = {
    easy: [
        {
            id: 1,
            title: 'Reverse a String',
            description: 'Write a function that reverses a string.',
            template: `function reverseString(str) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(reverseString("hello")); // Expected: "olleh"`,
            tests: [
                { input: 'hello', expected: 'olleh' },
                { input: 'world', expected: 'dlrow' },
            ],
            hint: 'You can use split(), reverse(), and join() methods.',
        },
        {
            id: 2,
            title: 'Find Maximum',
            description: 'Find the maximum number in an array.',
            template: `function findMax(arr) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(findMax([1, 5, 3, 9, 2])); // Expected: 9`,
            tests: [
                { input: [1, 5, 3, 9, 2], expected: 9 },
                { input: [-1, -5, -3], expected: -1 },
            ],
            hint: 'Try using Math.max() with spread operator or a loop.',
        },
        {
            id: 3,
            title: 'Palindrome Check',
            description: 'Check if a string is a palindrome.',
            template: `function isPalindrome(str) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(isPalindrome("racecar")); // Expected: true`,
            tests: [
                { input: 'racecar', expected: true },
                { input: 'hello', expected: false },
            ],
            hint: 'Compare the string with its reverse.',
        },
    ],
    medium: [
        {
            id: 4,
            title: 'Two Sum',
            description: 'Given an array of integers and a target, return indices of two numbers that add up to the target.',
            template: `function twoSum(nums, target) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,
            tests: [
                { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
            ],
            hint: 'Use a hash map to store complements.',
        },
        {
            id: 5,
            title: 'Valid Parentheses',
            description: 'Check if a string of parentheses is valid.',
            template: `function isValid(s) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(isValid("()[]{}")); // Expected: true`,
            tests: [
                { input: '()[]{}', expected: true },
                { input: '([)]', expected: false },
            ],
            hint: 'Use a stack to match opening and closing brackets.',
        },
    ],
    hard: [
        {
            id: 6,
            title: 'Merge Intervals',
            description: 'Given an array of intervals, merge all overlapping intervals.',
            template: `function merge(intervals) {\n  // Your code here\n  \n}\n\n// Test\nconsole.log(merge([[1,3],[2,6],[8,10],[15,18]])); // Expected: [[1,6],[8,10],[15,18]]`,
            tests: [
                { input: [[1, 3], [2, 6], [8, 10], [15, 18]], expected: [[1, 6], [8, 10], [15, 18]] },
            ],
            hint: 'Sort by start time, then merge overlapping intervals.',
        },
    ],
};

export function CodeEditor({ onBack, challenge = null }) {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const editorRef = useRef(null);

    const [difficulty, setDifficulty] = useState('easy');
    const [currentChallenge, setCurrentChallenge] = useState(
        challenge || CODING_CHALLENGES.easy[0]
    );
    const [code, setCode] = useState(currentChallenge.template);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState([]);

    const handleEditorMount = (editor) => {
        editorRef.current = editor;
    };

    const runCode = () => {
        setIsRunning(true);
        setOutput('');
        setTestResults([]);

        try {
            // Create a sandboxed console
            let logs = [];
            const mockConsole = {
                log: (...args) => logs.push(args.map(a =>
                    typeof a === 'object' ? JSON.stringify(a) : String(a)
                ).join(' ')),
            };

            // Execute the code in a sandboxed way
            const sandboxedCode = `
                (function(console) {
                    ${code}
                })(mockConsole);
            `;

            // Using Function constructor for sandboxed execution
            const fn = new Function('mockConsole', sandboxedCode);
            fn(mockConsole);

            setOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }

        setIsRunning(false);
    };

    const resetCode = () => {
        setCode(currentChallenge.template);
        setOutput('');
        setTestResults([]);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(code);
    };

    const selectChallenge = (challenge) => {
        setCurrentChallenge(challenge);
        setCode(challenge.template);
        setOutput('');
        setTestResults([]);
    };

    return (
        <div className="min-h-[80vh] py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
                        >
                            <ChevronRight size={24} className="rotate-180" />
                        </button>
                        <div>
                            <h1 className={`text-2xl font-display font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                Code Editor
                            </h1>
                            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                Practice coding challenges with live execution
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Challenge Selection Sidebar */}
                    <div className={`rounded-2xl p-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200'
                        }`}>
                        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Challenges
                        </h3>

                        {/* Difficulty Tabs */}
                        <div className="flex gap-2 mb-4">
                            {['easy', 'medium', 'hard'].map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => setDifficulty(diff)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${difficulty === diff
                                            ? diff === 'easy'
                                                ? 'bg-emerald-500 text-white'
                                                : diff === 'medium'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-red-500 text-white'
                                            : isDark
                                                ? 'bg-white/10 text-slate-400'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                >
                                    {diff}
                                </button>
                            ))}
                        </div>

                        {/* Challenge List */}
                        <div className="space-y-2">
                            {CODING_CHALLENGES[difficulty].map((ch) => (
                                <button
                                    key={ch.id}
                                    onClick={() => selectChallenge(ch)}
                                    className={`w-full text-left p-3 rounded-xl transition-all ${currentChallenge.id === ch.id
                                            ? isDark
                                                ? 'bg-indigo-500/20 border border-indigo-500/30'
                                                : 'bg-indigo-50 border border-indigo-200'
                                            : isDark
                                                ? 'hover:bg-white/5'
                                                : 'hover:bg-slate-50'
                                        }`}
                                >
                                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                        {ch.title}
                                    </h4>
                                    <p className={`text-sm truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                        {ch.description}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Hint */}
                        <div className={`mt-4 p-3 rounded-xl ${isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'
                            }`}>
                            <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
                                💡 <strong>Hint:</strong> {currentChallenge.hint}
                            </p>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className={`rounded-2xl overflow-hidden ${isDark ? 'border border-white/10' : 'border border-slate-200'
                            }`}>
                            {/* Editor Header */}
                            <div className={`flex items-center justify-between p-3 ${isDark ? 'bg-white/5' : 'bg-slate-50'
                                }`}>
                                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {currentChallenge.title}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={copyCode}
                                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                                            }`}
                                    >
                                        <Copy size={16} />
                                    </button>
                                    <button
                                        onClick={resetCode}
                                        className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                                            }`}
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <Editor
                                height="400px"
                                defaultLanguage="javascript"
                                theme={isDark ? 'vs-dark' : 'light'}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                onMount={handleEditorMount}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16 },
                                }}
                            />
                        </div>

                        {/* Run Button */}
                        <motion.button
                            onClick={runCode}
                            disabled={isRunning}
                            className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${isDark
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Play size={20} className="fill-current" />
                            {isRunning ? 'Running...' : 'Run Code'}
                        </motion.button>

                        {/* Output */}
                        <div className={`rounded-xl p-4 ${isDark ? 'bg-black/50 border border-white/10' : 'bg-slate-900'
                            }`}>
                            <h4 className="text-sm font-medium text-slate-400 mb-2">Output</h4>
                            <pre className="text-sm text-emerald-400 font-mono whitespace-pre-wrap min-h-[60px]">
                                {output || 'Click "Run Code" to see output...'}
                            </pre>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
