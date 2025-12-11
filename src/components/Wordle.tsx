'use client';

import React, { useEffect, useState } from 'react';
import { useWordle } from '@/hooks/useWordle';
import Board from './Board';
import Keyboard from './Keyboard';
import Modal from './Modal';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeToggle } from './theme-toggle';

interface WordleProps {
    solution: string;
    onPlayAgain: () => void;
}

export default function Wordle({ solution, onPlayAgain }: WordleProps) {
    const { currentGuess, guesses, turn, isCorrect, usedKeys, handleKeyup, hintsUsed, handleHint } = useWordle(solution);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup as any);

        return () => window.removeEventListener('keyup', handleKeyup as any);
    }, [handleKeyup]);

    useEffect(() => {
        if (isCorrect || turn > 5) {
            setTimeout(() => setShowModal(true), 2000);
        }
    }, [isCorrect, turn]);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen pt-4 sm:pt-10 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
            <Toaster position="top-center" />

            <header className="border-b border-gray-300 dark:border-gray-700 w-full flex justify-between items-center px-4 pb-4 mb-4 sm:mb-10 max-w-lg">
                <div className="w-8"></div> {/* Spacer for alignment */}
                <h1 className="text-3xl sm:text-5xl font-bold tracking-wider uppercase">Wordle</h1>
                <ThemeToggle />
            </header>

            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-lg px-2">
                <Board currentGuess={currentGuess} guesses={guesses} turn={turn} />
            </div>

            <div className="w-full max-w-lg px-2 text-center pb-10">
                <Keyboard
                    usedKeys={usedKeys}
                    onKeyup={handleKeyup}
                    onHint={handleHint}
                    hintsUsed={hintsUsed}
                />
            </div>

            {showModal && (
                <Modal
                    isCorrect={isCorrect}
                    turn={turn}
                    solution={solution}
                    isGameOver={turn > 5 || isCorrect}
                    onPlayAgain={onPlayAgain}
                />
            )}
        </div>
    );
}
