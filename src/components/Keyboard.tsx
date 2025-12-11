import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Delete, ArrowRight, Lightbulb } from 'lucide-react'; // Assuming lucide-react is installed or available, plan mentioned it

interface KeyboardProps {
    usedKeys: { [key: string]: string };
    onKeyup: (e: { key: string }) => void;
    onHint: () => void;
    hintsUsed: number;
}

export default function Keyboard({ usedKeys, onKeyup, onHint, hintsUsed }: KeyboardProps) {
    const letters = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ];

    return (
        <div className="pb-8">
            {letters.map((row, i) => (
                <div key={i} className="flex justify-center gap-1 my-1">
                    {i === 2 && (
                        <button
                            className="h-14 w-12 sm:w-16 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 rounded font-bold uppercase flex items-center justify-center"
                            onClick={() => onKeyup({ key: 'Enter' })}
                        >
                            Enter
                        </button>
                    )}

                    {row.map((l) => {
                        const color = usedKeys[l];
                        return (
                            <div
                                key={l}
                                onClick={() => onKeyup({ key: l })}
                                className={clsx(
                                    "h-14 w-8 sm:w-10 flex items-center justify-center rounded font-bold uppercase cursor-pointer select-none transition-colors duration-200",
                                    {
                                        'bg-gray-200 hover:bg-gray-300 text-black dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500': !color,
                                        'bg-green-500 text-white': color === 'green',
                                        'bg-yellow-500 text-white': color === 'yellow',
                                        'bg-gray-500 text-white': color === 'grey',
                                    }
                                )}
                            >
                                {l}
                            </div>
                        );
                    })}

                    {i === 2 && (
                        <button
                            className="h-14 w-12 sm:w-16 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 rounded font-bold uppercase flex items-center justify-center p-2"
                            onClick={() => onKeyup({ key: 'Backspace' })}
                        >
                            <Delete size={24} />
                        </button>
                    )}
                </div>
            ))}

            {/* Hint Button */}
            <div className="flex justify-center mt-4">
                <button
                    className={clsx(
                        "flex items-center gap-2 px-4 py-2 rounded font-bold text-white transition-opacity",
                        hintsUsed >= 2 ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-blue-500 hover:bg-blue-600"
                    )}
                    onClick={onHint}
                    disabled={hintsUsed >= 2}
                >
                    <Lightbulb size={20} />
                    Hint ({2 - hintsUsed} left)
                </button>
            </div>
        </div>
    );
}
