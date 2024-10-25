import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLLECTIBLE_TYPES, EMOTES } from './constants';

const Instructions = ({ sendEmote }) => (
  <Card className="p-6 mb-6 w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg">
    <h2 className="text-2xl font-bold mb-4">How to Play</h2>
    <div className="text-sm space-y-3">
      <div className="flex items-center">
        <span className="text-2xl mr-2">🎮</span> Use WASD keys to move your character:
        <span className="ml-2 font-semibold">W (up), X (down), A (left), D (right)</span>
      </div>
      <div className="flex items-center"><span className="text-2xl mr-2">💬</span> Type in chat and press Enter to send messages</div>
      <div className="flex items-center"><span className="text-2xl mr-2">🎯</span> Collect items for points: 
        {Object.entries(COLLECTIBLE_TYPES).map(([key, value]) => (
          <span key={key} className="ml-2">{value.icon} = {value.points}pts</span>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl mr-2">😄</span> Emotes: 
        {EMOTES.map(emote => (
          <Button
            key={emote}
            variant="outline"
            size="sm"
            onClick={() => sendEmote(emote)}
            className="hover:bg-gray-100"
          >
            {emote}
          </Button>
        ))}
      </div>
    </div>
  </Card>
);

export default Instructions;
