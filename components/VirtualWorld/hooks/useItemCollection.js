import { useCallback } from 'react';
import { COLLECTIBLE_TYPES } from '../constants';

const useItemCollection = (worldData, setWorldData, players, setPlayers) => {
  const collectItems = useCallback((x, y, playerId) => {
    const itemsAtPosition = worldData.items.filter(item => item.x === x && item.y === y);
    if (itemsAtPosition.length > 0) {
      const newItems = worldData.items.filter(item => !itemsAtPosition.includes(item));
      const points = itemsAtPosition.reduce((sum, item) => sum + COLLECTIBLE_TYPES[item.type].points, 0);
      
      setWorldData(prev => ({ ...prev, items: newItems }));
      setPlayers(prev => prev.map(p => 
        p.id === playerId ? { ...p, score: p.score + points } : p
      ));
    }
  }, [worldData, setWorldData, setPlayers]);

  return { collectItems };
};

export default useItemCollection;
