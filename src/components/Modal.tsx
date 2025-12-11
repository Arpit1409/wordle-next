import React from 'react';

interface ModalProps {
    isCorrect: boolean;
    turn: number;
    solution: string;
    isGameOver: boolean;
    onPlayAgain: () => void;
}

export default function Modal({ isCorrect, turn, solution, isGameOver, onPlayAgain }: ModalProps) {
    if (!isGameOver) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center -mt-96 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 p-10 rounded-lg shadow-xl max-w-sm w-full text-center animate-in fade-in zoom-in duration-300">
                {isCorrect ? (
                    <div>
                        <h1 className="text-3xl font-bold mb-4 dark:text-white">You Win!</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            You found the solution in {turn} guess{turn !== 1 && 'es'}!
                        </p>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-3xl font-bold mb-4 text-red-500">Game Over!</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">The solution was:</p>
                        <p className="text-2xl font-bold text-green-600 mb-6 uppercase tracking-wider">{solution}</p>
                    </div>
                )}

                <button
                    onClick={onPlayAgain}
                    className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold hover:bg-indigo-700 transition w-full"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
}
