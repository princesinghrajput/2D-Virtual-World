import React from 'react';
import { Card } from '@/components/ui/card';
import { getAvatarUrl } from './constants';

const Leaderboard = ({ players }) => (
  <Card className="p-6 mb-6 w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg">
    <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
    <div className="flex justify-around">
      {players.map(player => (
        <div key={player.id} className="flex flex-col items-center">
          <img src={getAvatarUrl(player.name)} alt={player.name} className="w-16 h-16 rounded-full mb-2" />
          <div className="font-semibold">{player.name}</div>
          <div className="text-lg font-bold">{player.score}pts</div>
        </div>
      ))}
    </div>
  </Card>
);

export default Leaderboard;
