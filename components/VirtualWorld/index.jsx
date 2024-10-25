"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import GameWorld from './GameWorld';
import ChatInput from './ChatInput';
import { generateWorld, WORLD_SIZE, TERRAIN_TYPES, COLLECTIBLE_TYPES } from './constants';
import useMovement from './hooks/useMovement';
import useItemCollection from './hooks/useItemCollection';
import useChatAndEmotes from './hooks/useChatAndEmotes';

const VirtualWorld = () => {
  const [worldData, setWorldData] = useState(generateWorld());
  const [players, setPlayers] = useState([
    { id: 1, x: 5, y: 5, color: 'red', name: 'Player 1', score: 0, emote: null, chat: null },
    { id: 2, x: 15, y: 15, color: 'blue', name: 'Player 2', score: 0, emote: null, chat: null },
    { id: 3, x: 10, y: 10, color: 'green', name: 'Player 3', score: 0, emote: null, chat: null }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);

  const { collectItems } = useItemCollection(worldData, setWorldData, players, setPlayers, currentPlayer, setCurrentPlayer);
  const { handleMovement } = useMovement(currentPlayer, setCurrentPlayer, players, setPlayers, worldData, collectItems);
  const { chatInput, setChatInput, sendChat, sendEmote } = useChatAndEmotes(players, setPlayers, currentPlayer);

  // Handle movement
  useEffect(() => {
    const handleKeyPress = (e) => handleMovement(e.key.toLowerCase());
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMovement]);

  // Simulate other players' movement
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPlayers(prev => prev.map(player => {
        if (player.id === currentPlayer.id) return player;
        
        const dx = Math.floor(Math.random() * 3) - 1;
        const dy = Math.floor(Math.random() * 3) - 1;
        const newX = Math.max(0, Math.min(WORLD_SIZE - 1, player.x + dx));
        const newY = Math.max(0, Math.min(WORLD_SIZE - 1, player.y + dy));
        
        if (!handleMovement('', newX, newY, player)) {
          return { ...player, x: newX, y: newY };
        }
        return player;
      }));
    }, 2000);

    return () => clearInterval(moveInterval);
  }, [currentPlayer.id, handleMovement]);

  return (
    <div className="flex flex-col items-center p-4">
      <Instructions sendEmote={sendEmote} />
      <Leaderboard players={players} />
      <GameWorld worldData={worldData} players={players} />
      <ChatInput chatInput={chatInput} setChatInput={setChatInput} sendChat={sendChat} />
    </div>
  );
};

export default VirtualWorld;
