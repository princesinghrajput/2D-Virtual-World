import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LobbyComponent = ({ playerName, setPlayerName, onJoinGame }) => {
  return (
    <Card className="p-6 w-full max-w-md bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-indigo-500/50 text-white">
      <h2 className="text-2xl font-bold mb-4">Join Game</h2>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
        className="w-full px-4 py-2 mb-4 bg-indigo-800/50 border border-indigo-500/50 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-indigo-300"
      />
      <Button 
        onClick={() => {
          console.log('Join Game button clicked');
          onJoinGame();
        }} 
        className="w-full bg-purple-600 hover:bg-purple-500"
      >
        Join Game
      </Button>
    </Card>
  );
};

export default LobbyComponent;
