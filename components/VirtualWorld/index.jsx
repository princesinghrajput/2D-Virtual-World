"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import GameWorld from './GameWorld';
import ChatInput from './ChatInput';
import { generateWorld, WORLD_SIZE, VILLAIN_TYPES, TERRAIN_TYPES, findSafePosition, POWER_UPS, OBSTACLES } from './constants';
import useMovement from './hooks/useMovement';
import useItemCollection from './hooks/useItemCollection';
import useChatAndEmotes from './hooks/useChatAndEmotes';
import io from 'socket.io-client';
import GameOverComponent from './GameOverComponent';
import LobbyComponent from './LobbyComponent';
import ChatMessages from './ChatMessages';
import { motion } from 'framer-motion';

const VirtualWorld = () => {
  const [worldData, setWorldData] = useState(null);
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [villains, setVillains] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const socketInitialized = useRef(false);
  const [gameState, setGameState] = useState('waiting');
  const [winner, setWinner] = useState(null);
  const [powerUps, setPowerUps] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [error, setError] = useState(null);

  const { movePlayer } = useMovement(WORLD_SIZE);
  const { collectItems } = useItemCollection(worldData, setWorldData, players, setPlayers);
  const { chatInput, setChatInput, sendChat, sendEmote, chatMessages, setChatMessages } = useChatAndEmotes(players, setPlayers, currentPlayer, socket);

  useEffect(() => {
    if (!socketInitialized.current) {
      socketInitialized.current = true;
      initializeSocket();
    }
  }, []);

  const initializeSocket = () => {
    fetch('/api/socket').finally(() => {
      const newSocket = io();
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server with ID:', newSocket.id);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        setError('Failed to connect to the server. Please try again.');
      });

      newSocket.on('player_joined', (newPlayer) => {
        console.log('Player joined event received:', newPlayer);
        setPlayers(prev => [...prev, newPlayer]);
        if (newPlayer.id === newSocket.id) {
          setCurrentPlayer(newPlayer);
          console.log('Current player set:', newPlayer);
        }
      });

      newSocket.on('game_start', handleGameStart);
      newSocket.on('player_moved', handlePlayerMoved);
      newSocket.on('new_message', handleNewMessage);
      newSocket.on('game_over', handleGameOver);
      newSocket.on('game_full', handleGameFull);
      newSocket.on('player_left', handlePlayerLeft);

      return () => {
        newSocket.disconnect();
      };
    });
  };

  const handleGameStart = ({ players: gamePlayers, worldData: gameWorldData }) => {
    console.log('Game starting with players:', gamePlayers);
    console.log('World data:', gameWorldData);
    setPlayers(gamePlayers);
    setWorldData(gameWorldData);
    
    // Check if socket is available and has an id
    if (socket && socket.id) {
      const currentPlayerData = gamePlayers.find(p => p.id === socket.id);
      if (currentPlayerData) {
        setCurrentPlayer(currentPlayerData);
      } else {
        console.error('Current player not found in game players');
      }
    } else {
      console.error('Socket not initialized or missing id');
    }
    
    setGameState('playing');
    initializeGameElements(gameWorldData);
  };

  const handlePlayerMoved = (data) => {
    console.log('Player moved:', data);
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => (p.id === data.id ? { ...p, ...data } : p))
    );
  };

  const handleNewMessage = (message) => {
    console.log('New message received:', message);
    setChatMessages(prev => [...prev, message]);
  };

  const handleGameOver = (winnerData) => {
    console.log('Game over. Winner:', winnerData);
    setGameState('gameOver');
    setWinner(winnerData);
  };

  const handleGameFull = () => {
    console.log('Game is full');
    setError('The game is full. Please try again later.');
  };

  const handlePlayerLeft = (playerId) => {
    console.log('Player left:', playerId);
    setPlayers(prev => prev.filter(p => p.id !== playerId));
    if (gameState === 'playing') {
      setGameState('waiting');
      setError('The other player has left the game. Waiting for a new player to join.');
    }
  };

  const initializeGameElements = useCallback((worldData) => {
    initializeVillains(worldData);
    initializePowerUps(worldData);
    initializeObstacles(worldData);
  }, []);

  const initializeVillains = useCallback((worldData) => {
    const newVillains = Object.values(VILLAIN_TYPES).map((villain, index) => ({
      id: index + 1,
      ...villain,
      ...findSafePosition(worldData),
    }));
    setVillains(newVillains);
  }, []);

  const initializePowerUps = useCallback((worldData) => {
    const newPowerUps = Array(3).fill().map(() => ({
      ...POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)],
      ...findSafePosition(worldData),
    }));
    setPowerUps(newPowerUps);
  }, []);

  const initializeObstacles = useCallback((worldData) => {
    const newObstacles = Array(5).fill().map(() => ({
      ...OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)],
      ...findSafePosition(worldData),
    }));
    setObstacles(newObstacles);
  }, []);

  const checkGameOver = useCallback(() => {
    if (!currentPlayer || !villains) return;

    const isPlayerCaught = villains.some(villain => 
      villain.x === currentPlayer.x && villain.y === currentPlayer.y
    );
    
    if (isPlayerCaught) {
      console.log('Player caught by villain!');
      setGameOver(true);
      setGameState('gameOver');
      const winner = players.find(p => p.id !== currentPlayer.id);
      setWinner(winner);
      if (socket) {
        socket.emit('game_over', { winner });
      }
    }
  }, [currentPlayer, villains, players, socket]);

  const handleMove = useCallback((direction) => {
    if (gameOver || !socket || !currentPlayer || !worldData) return;
    const newPosition = movePlayer(currentPlayer, direction, worldData);
    if (newPosition.x !== currentPlayer.x || newPosition.y !== currentPlayer.y) {
      handleCollisions(newPosition);
      updatePlayerPosition(newPosition);
      socket.emit('player_move', { id: currentPlayer.id, ...newPosition });
      checkGameOver(); // Check for game over after each move
    }
  }, [currentPlayer, movePlayer, worldData, gameOver, socket, powerUps, obstacles, checkGameOver]);

  const handleCollisions = (newPosition) => {
    const collidedPowerUp = powerUps.find(p => p.x === newPosition.x && p.y === newPosition.y);
    if (collidedPowerUp) {
      applyPowerUp(collidedPowerUp);
      setPowerUps(prev => prev.filter(p => p !== collidedPowerUp));
    }

    const collidedObstacle = obstacles.find(o => o.x === newPosition.x && o.y === newPosition.y);
    if (collidedObstacle) {
      applyObstacle(collidedObstacle);
    }

    collectItems(newPosition.x, newPosition.y, currentPlayer.id);
  };

  const updatePlayerPosition = (newPosition) => {
    setCurrentPlayer((prev) => ({ ...prev, ...newPosition }));
    setPlayers((prev) =>
      prev.map((p) => (p.id === currentPlayer.id ? { ...p, ...newPosition } : p))
    );
  };

  const applyPowerUp = useCallback((powerUp) => {
    console.log(`Applied power-up: ${powerUp.name}`);
    // Implement power-up effects (e.g., speed boost, invincibility)
    socket.emit('power_up_collected', { id: currentPlayer.id, powerUp });
  }, [currentPlayer, socket]);

  const applyObstacle = useCallback((obstacle) => {
    console.log(`Hit obstacle: ${obstacle.name}`);
    // Implement obstacle effects (e.g., slow down, stun)
    socket.emit('obstacle_hit', { id: currentPlayer.id, obstacle });
  }, [currentPlayer, socket]);

  const moveVillain = useCallback((villain) => {
    let newPosition;
    switch (villain.behavior) {
      case 'chase':
        newPosition = chasePlayer(villain);
        break;
      case 'wander':
        newPosition = wanderRandomly(villain);
        break;
      case 'teleport':
        newPosition = teleportVillain(villain);
        break;
      case 'ambush':
        newPosition = ambushPlayer(villain);
        break;
      default:
        newPosition = { x: villain.x, y: villain.y };
    }
    return { ...villain, ...newPosition };
  }, [currentPlayer, movePlayer, worldData, gameTime, players]);

  const chasePlayer = (villain) => {
    const dx = Math.sign(currentPlayer.x - villain.x);
    const dy = Math.sign(currentPlayer.y - villain.y);
    return Math.abs(dx) > Math.abs(dy)
      ? movePlayer(villain, dx > 0 ? 'right' : 'left', worldData)
      : movePlayer(villain, dy > 0 ? 'down' : 'up', worldData);
  };

  const wanderRandomly = (villain) => {
    const directions = ['up', 'down', 'left', 'right'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    return movePlayer(villain, randomDirection, worldData);
  };

  const teleportVillain = (villain) => {
    let newPosition;
    do {
      newPosition = findSafePosition(worldData);
    } while (newPosition.x === villain.x && newPosition.y === villain.y);
    return newPosition;
  };

  const ambushPlayer = (villain) => {
    if (villain.ambushTimer > 0) {
      villain.ambushTimer--;
      return { x: villain.x, y: villain.y };
    } else {
      const playerDistance = Math.sqrt(Math.pow(currentPlayer.x - villain.x, 2) + Math.pow(currentPlayer.y - villain.y, 2));
      if (playerDistance <= 3) {
        villain.ambushTimer = 5; // Wait for 5 turns after ambushing
        return { x: currentPlayer.x, y: currentPlayer.y };
      } else {
        return wanderRandomly(villain);
      }
    }
  };

  const moveVillains = useCallback(() => {
    setVillains(prevVillains => prevVillains.map(villain => moveVillain(villain)));
  }, [moveVillain]);

  useEffect(() => {
    if (gameState === 'playing') {
      const gameLoop = setInterval(() => {
        setGameTime(prev => prev + 1);
        moveVillains();
        checkGameOver();
      }, 1000);
      return () => clearInterval(gameLoop);
    }
  }, [gameState, moveVillains, checkGameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!currentPlayer) return;
      switch (e.key.toLowerCase()) {
        case 'w': handleMove('up'); break;
        case 's': handleMove('down'); break;
        case 'a': handleMove('left'); break;
        case 'd': handleMove('right'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleMove, currentPlayer]);

  useEffect(() => {
    if (gameTime % 30 === 0 && gameTime > 0) {
      // Spawn new power-ups or obstacles every 30 seconds
      initializePowerUps(worldData);
      initializeObstacles(worldData);
    }
  }, [gameTime, worldData, initializePowerUps, initializeObstacles]);

  const handleJoinGame = () => {
    if (playerName.trim()) {
      console.log('Attempting to join game with name:', playerName);
      if (socket) {
        socket.emit('join_game', playerName);
        console.log('join_game event emitted');
      } else {
        setError('Socket is not initialized. Please refresh the page.');
      }
    } else {
      setError('Please enter a valid name.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500 text-white p-3 rounded-lg mb-4 shadow-lg"
        >
          {error}
        </motion.div>
      )}
      {gameState === 'waiting' ? (
        <LobbyComponent
          playerName={playerName}
          setPlayerName={setPlayerName}
          onJoinGame={handleJoinGame}
        />
      ) : gameState === 'playing' && worldData ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="flex justify-between w-full max-w-6xl mb-4">
            <Instructions sendEmote={sendEmote} />
            <Leaderboard players={players} />
          </div>
          <GameWorld 
            worldData={worldData} 
            players={players} 
            villains={villains}
            powerUps={powerUps}
            obstacles={obstacles}
          />
          <div className="w-full max-w-2xl mt-4">
            <ChatMessages messages={chatMessages} />
            <ChatInput
              chatInput={chatInput}
              setChatInput={setChatInput}
              sendChat={sendChat}
            />
          </div>
        </motion.div>
      ) : gameState === 'gameOver' ? (
        <GameOverComponent winner={winner} />
      ) : (
        <div className="text-white text-2xl">Loading game...</div>
      )}
    </div>
  );
};

export default VirtualWorld;
