import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ players }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-indigo-500/50 text-white p-4 w-64"
  >
    <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
      <Trophy className="mr-2" size={24} />
      Leaderboard
    </h2>
    {players.sort((a, b) => b.score - a.score).map((player, index) => (
      <motion.div
        key={player.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center justify-between mb-2 p-2 bg-indigo-800/50 rounded-lg"
      >
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${player.name}`} alt={player.name} />
          </div>
          <span>{player.name}</span>
        </div>
        <span className="font-bold">{player.score}</span>
      </motion.div>
    ))}
  </motion.div>
);

export default Leaderboard;
