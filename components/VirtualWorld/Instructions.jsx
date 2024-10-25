import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLLECTIBLE_TYPES, EMOTES } from './constants';
import { Sparkles } from 'lucide-react';

const Instructions = ({ sendEmote }) => (
  <Card className="p-8 mb-8 w-full max-w-2xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-indigo-500/50 text-white">
    <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-400 flex items-center">
      <Sparkles className="mr-2" /> How to Play
    </h2>
    <div className="text-sm space-y-6">
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
              <Button
                key={emote}
                variant="outline"
                size="sm"
                onClick={() => sendEmote(emote)}
                className="bg-purple-700/50 hover:bg-purple-600/50 text-white border-purple-400/50 transition-all duration-300 transform hover:scale-110"
              >
                {emote}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Card>
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
