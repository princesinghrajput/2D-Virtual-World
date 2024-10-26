import { useCallback } from 'react';
import { TERRAIN_TYPES } from '../constants';

const useMovement = (worldSize) => {
  const movePlayer = useCallback((player, direction, worldData) => {
    let newX = player.x;
    let newY = player.y;

    switch (direction) {
      case 'up': newY = Math.max(0, player.y - 1); break;
      case 'down': newY = Math.min(worldSize - 1, player.y + 1); break;
      case 'left': newX = Math.max(0, player.x - 1); break;
      case 'right': newX = Math.min(worldSize - 1, player.x + 1); break;
    }

    // Check if the new position is valid (not a blocking terrain)
    if (worldData && worldData.tiles) {
      const newTile = worldData.tiles[newY][newX];
      if (TERRAIN_TYPES[newTile].blocking) {
        return { x: player.x, y: player.y }; // Return original position if blocked
      }
    }

    return { x: newX, y: newY };
  }, [worldSize]);

  return { movePlayer };
};

export default useMovement;
