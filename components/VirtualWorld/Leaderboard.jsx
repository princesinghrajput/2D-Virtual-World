import React from 'react';
import { Card } from '@/components/ui/card';
import { getAvatarUrl } from './constants';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ players }) => (
  <Card className="p-6 mb-6 w-full max-w-2xl bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-blue-500/50 text-white">
    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 flex items-center">
      <Trophy className="mr-2" /> Leaderboard
    </h2>
    <div className="flex justify-around">
      {players.map((player, index) => (
        <div key={player.id} className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
          <div className="relative">
            <img src={getAvatarUrl(player.name)} alt={player.name} className="w-16 h-16 rounded-full mb-2 border-2 border-indigo-400 shadow-lg" />
            {index === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1"><Trophy size={16} /></div>}
          </div>
          <div className="font-semibold text-indigo-200">{player.name}</div>
          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">{player.score}pts</div>
        </div>
      ))}
    </div>
  </Card>
);

export default Leaderboard;
