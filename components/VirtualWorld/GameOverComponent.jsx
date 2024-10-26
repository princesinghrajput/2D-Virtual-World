import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GameOverComponent = ({ winner }) => {
  return (
    <Card className="p-6 w-full max-w-md bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-red-500/50 text-white">
      <h2 className="text-3xl font-bold mb-4 text-center">Game Over!</h2>
      {winner ? (
        <p className="text-xl mb-4 text-center">
          {winner.name} wins with a score of {winner.score}!
        </p>
      ) : (
        <p className="text-xl mb-4 text-center">It's a tie!</p>
      )}
      <Button
        onClick={() => window.location.reload()}
        className="w-full bg-orange-600 hover:bg-orange-500"
      >
        Play Again
      </Button>
    </Card>
  );
};

export default GameOverComponent;
