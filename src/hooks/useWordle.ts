import { useState, useEffect, useCallback } from 'react';
import { TARGET_WORDS, DICTIONARY, getRandomWord } from '@/lib/data';
import toast from 'react-hot-toast';

export type FormattedGuess = {
    key: string;
    color: 'grey' | 'yellow' | 'green';
};

export const useWordle = (solution: string) => {
    const [turn, setTurn] = useState<number>(0);
    const [currentGuess, setCurrentGuess] = useState<string>('');
    const [guesses, setGuesses] = useState<FormattedGuess[][]>([...Array(6)]); // History of formatted guesses
    const [history, setHistory] = useState<string[]>([]); // History of guess strings
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({});
    const [hintsUsed, setHintsUsed] = useState<number>(0);
    const MAX_HINTS = 2;

    // Format a guess into an array of { key, color } objects
    const formatGuess = useCallback(() => {
        let solutionArray: (string | null)[] = [...solution];
        let formattedGuess: FormattedGuess[] = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' };
        });

        // First pass: find exact matches (green)
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        });

        // Second pass: find partial matches (yellow)
        formattedGuess.forEach((l, i) => {
            if (l.color !== 'green' && solutionArray.includes(l.key)) {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    }, [currentGuess, solution]);

    // Add a new guess to the state
    const addNewGuess = useCallback((formattedGuess: FormattedGuess[]) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
            toast.success('Splendid!', { duration: 2500 });
        }

        setGuesses((prevGuesses) => {
            // Create a new array from previous guesses
            let newGuesses = [...prevGuesses];
            // Update the guess at the current turn index
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess];
        });

        setTurn((prevTurn) => {
            return prevTurn + 1;
        });

        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys };

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key];

                if (l.color === 'green') {
                    newKeys[l.key] = 'green';
                    return;
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    newKeys[l.key] = 'yellow';
                    return;
                }
                if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newKeys[l.key] = 'grey';
                    return;
                }
            });

            return newKeys;
        });

        setCurrentGuess('');
    }, [currentGuess, solution, turn]);

    // Handle keyup events & virtual keyboard input
    const handleKeyup = useCallback(({ key }: { key: string }) => {
        if (isCorrect || turn > 5) {
            return;
        }

        if (key === 'Enter') {
            // Only allow guess if turn is less than 6
            if (turn > 5) {
                return;
            }
            // Check word length
            if (currentGuess.length !== 5) {
                toast.error('Not enough letters');
                return;
            }
            // Check if word is valid
            // Combine TARGET_WORDS and DICTIONARY for validation
            // Note: In strict mode usually only dictionary words are allowed.
            // The original game used `DICTIONARY.includes(currentGuessString)`.
            // It implies `DICTIONARY` contains all valid words (including targets?).
            // Let's assume we check against both to be safe, or just DICTIONARY if it's comprehensive.
            // Based on lib/data.ts, TARGET_WORDS are separate.
            // In script.js: `if (!DICTIONARY.includes(currentGuessString) && !TARGET_WORDS.includes(currentGuessString)) ...`?
            // Let's check script.js validation logic logic if needed.
            // Assuming simple includes for now.
            if (!DICTIONARY.includes(currentGuess) && !TARGET_WORDS.includes(currentGuess)) {
                toast.error('Not in word list');
                return;
            }
            // Check if already guessed
            if (history.includes(currentGuess)) {
                toast.error('You already guessed that!');
                return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key);
            }
        }
    }, [currentGuess, turn, isCorrect, history, formatGuess, addNewGuess]);

    // Handle Hint
    const handleHint = useCallback(() => {
        if (isCorrect || turn > 5) return;

        if (hintsUsed >= MAX_HINTS) {
            toast.error('No hints remaining');
            return;
        }

        if (currentGuess.length >= 5) {
            toast.error('Delete letters to get a hint');
            return;
        }

        // Reveal the correct letter for the CURRENT position (next empty spot)
        const nextIndex = currentGuess.length;
        const letterToReveal = solution[nextIndex];

        setCurrentGuess((prev) => prev + letterToReveal);
        setHintsUsed((prev) => prev + 1);
        toast('Hint used!', { icon: '💡' });

    }, [currentGuess, hintsUsed, isCorrect, solution, turn]);

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup, hintsUsed, handleHint };
};
