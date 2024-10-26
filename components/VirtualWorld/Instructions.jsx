import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLLECTIBLE_TYPES, EMOTES } from './constants';
import { Sparkles } from 'lucide-react';
import { HelpCircle } from 'lucide-react';

const Instructions = ({ sendEmote }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-indigo-500/50 text-white p-4 w-64"
  >
    <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
      <HelpCircle className="mr-2" size={24} />
      How to Play
    </h2>
    <div className="text-sm space-y-4">
      <InstructionItem
        icon="🎮"
        text="Use WASD keys to move your character:"
        detail="W (up), X (down), A (left), D (right)"
      />
      <InstructionItem
        icon="💬"
        text="Type in chat and press Enter to send messages"
      />
      <div className="flex items-start">
        <span className="text-3xl mr-4 mt-1">🎯</span>
        <div>
          <p className="font-semibold mb-2">Collect items for points:</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(COLLECTIBLE_TYPES).map(([key, value]) => (
              <span key={key} className="bg-indigo-700/50 rounded-full px-3 py-1 text-center border border-indigo-400/50 shadow-lg">
                {value.icon} = {value.points}pts
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <span className="text-3xl mr-4 mt-1">😄</span>
        <div>
          <p className="font-semibold mb-2">Emotes:</p>
          <div className="flex flex-wrap gap-2">
            {EMOTES.map(emote => (
              <motion.button
                key={emote}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => sendEmote(emote)}
                className="w-8 h-8 flex items-center justify-center bg-purple-700/50 hover:bg-purple-600/50 text-white border border-purple-400/50 rounded-full transition-all duration-300"
              >
                {emote}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const InstructionItem = ({ icon, text, detail }) => (
  <div className="flex items-start">
    <span className="text-3xl mr-4 mt-1">{icon}</span>
    <div>
      <p className="font-semibold">{text}</p>
      {detail && <p className="text-gray-600 mt-1">{detail}</p>}
    </div>
  </div>
);

export default Instructions;
