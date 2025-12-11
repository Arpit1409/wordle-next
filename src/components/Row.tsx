import React from 'react';
import clsx from 'clsx';
import { FormattedGuess } from '@/hooks/useWordle';

interface RowProps {
    guess?: FormattedGuess[];
    currentGuess?: string;
}

export default function Row({ guess, currentGuess }: RowProps) {
    if (guess) {
        return (
            <div className="flex gap-1 mb-1 justify-center">
                {guess.map((l, i) => (
                    <div
                        key={i}
                        className={clsx(
                            "w-14 h-14 border-2 flex items-center justify-center text-3xl font-bold uppercase select-none",
                            {
                                'bg-gray-500 border-gray-500 text-white dark:bg-gray-700 dark:border-gray-700': l.color === 'grey',
                                'bg-yellow-500 border-yellow-500 text-white dark:bg-yellow-700 dark:border-yellow-700': l.color === 'yellow',
                                'bg-green-500 border-green-500 text-white dark:bg-green-700 dark:border-green-700': l.color === 'green',
                            }
                        )}
                    >
                        {l.key}
                    </div>
                ))}
            </div>
        );
    }

    if (currentGuess) {
        let letters = currentGuess.split('');

        return (
            <div className="flex gap-1 mb-1 justify-center">
                {letters.map((letter, i) => (
                    <div
                        key={i}
                        className="w-14 h-14 border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center text-3xl font-bold uppercase animate-pulse select-none dark:text-gray-100"
                    >
                        {letter}
                    </div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div
                        key={i}
                        className="w-14 h-14 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-3xl font-bold uppercase select-none"
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex gap-1 mb-1 justify-center">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="w-14 h-14 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center text-3xl font-bold uppercase select-none"
                ></div>
            ))}
        </div>
    );
}
