import React from 'react';
import Row from './Row';
import { FormattedGuess } from '@/hooks/useWordle';

interface BoardProps {
    currentGuess: string;
    guesses: FormattedGuess[][];
    turn: number;
}

export default function Board({ currentGuess, guesses, turn }: BoardProps) {
    return (
        <div className="pb-10">
            {guesses.map((g, i) => {
                if (turn === i) {
                    return <Row key={i} currentGuess={currentGuess} />;
                }
                return <Row key={i} guess={g} />;
            })}
        </div>
    );
}
