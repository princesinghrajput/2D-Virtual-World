"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import GameWorld from './GameWorld';
import ChatInput from './ChatInput';
import { generateWorld, WORLD_SIZE } from './constants';
import useMovement from './hooks/useMovement';
import useItemCollection from './hooks/useItemCollection';
import useChatAndEmotes from './hooks/useChatAndEmotes';

const VirtualWorld = () => {
  const [worldData, setWorldData] = useState(generateWorld());
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', x: 5, y: 5, score: 0 },
    { id: 2, name: 'Player 2', x: 15, y: 15, score: 0 },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);

  const { movePlayer } = useMovement(WORLD_SIZE);
  const { collectItems } = useItemCollection(worldData, setWorldData, players, setPlayers);
  const { chatInput, setChatInput, sendChat, sendEmote } = useChatAndEmotes(players, setPlayers, currentPlayer);

  const handleMove = useCallback((direction) => {
    const newPosition = movePlayer(currentPlayer, direction, worldData);
    setCurrentPlayer(prev => ({ ...prev, ...newPosition }));
    setPlayers(prev => prev.map(p => p.id === currentPlayer.id ? { ...p, ...newPosition } : p));
    collectItems(newPosition.x, newPosition.y, currentPlayer.id);
  }, [currentPlayer, movePlayer, collectItems, worldData]);

  // Simulate other player's movement and item collection
  useEffect(() => {
    const otherPlayer = players.find(p => p.id !== currentPlayer.id);
    const interval = setInterval(() => {
      const direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
      const newPosition = movePlayer(otherPlayer, direction, worldData);
      setPlayers(prev => prev.map(p => p.id === otherPlayer.id ? { ...p, ...newPosition } : p));
      collectItems(newPosition.x, newPosition.y, otherPlayer.id);
    }, 2000);

    return () => clearInterval(interval);
  }, [players, currentPlayer, movePlayer, collectItems, worldData]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key.toLowerCase()) {
        case 'w': handleMove('up'); break;
        case 's': handleMove('down'); break;
        case 'a': handleMove('left'); break;
        case 'd': handleMove('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove]);

  return (
    <div className="flex flex-col items-center">
      <Instructions sendEmote={sendEmote} />
      <Leaderboard players={players} />
      <GameWorld worldData={worldData} players={players} />
      <ChatInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendChat={sendChat}
      />
    </div>
  );
};

export default VirtualWorld;
