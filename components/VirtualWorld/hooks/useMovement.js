import { useCallback } from 'react';
import { WORLD_SIZE, TERRAIN_TYPES } from '../constants';

const useMovement = (currentPlayer, setCurrentPlayer, players, setPlayers, worldData, collectItems) => {
  const checkCollision = useCallback((x, y) => {
    const terrain = worldData.tiles[y][x];
    if (!TERRAIN_TYPES[terrain].walkable) return true;
    return players.some(p => p.id !== currentPlayer.id && p.x === x && p.y === y);
  }, [currentPlayer.id, players, worldData.tiles]);

  const handleMovement = useCallback((key, newX = currentPlayer.x, newY = currentPlayer.y, player = currentPlayer) => {
    switch (key) {
      case 'w': newY = Math.max(0, newY - 1); break;
      case 'x': newY = Math.min(WORLD_SIZE - 1, newY + 1); break;
      case 'a': newX = Math.max(0, newX - 1); break;
      case 'd': newX = Math.min(WORLD_SIZE - 1, newX + 1); break;
      default: break;
    }

    if (!checkCollision(newX, newY)) {
      const newPlayer = { ...player, x: newX, y: newY };
      if (player.id === currentPlayer.id) {
        setCurrentPlayer(newPlayer);
        collectItems(newX, newY);  // Call collectItems after movement
      }
      setPlayers(prev => prev.map(p => p.id === player.id ? newPlayer : p));
      return false; // Movement successful
    }
    return true; // Collision detected
  }, [currentPlayer, setCurrentPlayer, players, setPlayers, checkCollision, collectItems]);

  return { handleMovement };
};

export default useMovement;
