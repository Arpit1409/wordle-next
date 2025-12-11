'use client';

import { useState } from 'react';
import Wordle from '@/components/Wordle';
import { getRandomWord } from '@/lib/data';

export default function Home() {
  const [solution, setSolution] = useState<string>(getRandomWord());

  // Log solution for debugging/cheating
  console.log('Solution:', solution);

  const handlePlayAgain = () => {
    setSolution(getRandomWord());
  };

  // We use the solution as a key to force the Wordle component to completely remount
  // when a new game starts, ensuring all internal state is reset.
  return (
    <main>
      <Wordle key={solution} solution={solution} onPlayAgain={handlePlayAgain} />
    </main>
  );
}
