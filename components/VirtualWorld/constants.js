export const WORLD_SIZE = 20;
export const TILE_SIZE = 40;

export const TERRAIN_TYPES = {
  grass: { color: 'from-green-300 to-green-400', walkable: true },
  water: { color: 'from-blue-300 to-blue-400', walkable: false },
  sand: { color: 'from-yellow-200 to-yellow-300', walkable: true },
  forest: { color: 'from-green-700 to-green-800', walkable: true },
  mountain: { color: 'from-gray-400 to-gray-500', walkable: false },
  path: { color: 'from-amber-100 to-amber-200', walkable: true, speedBoost: true }
};

export const COLLECTIBLE_TYPES = {
  coin: { icon: '🪙', points: 10, color: 'text-yellow-500' },
  gem: { icon: '💎', points: 50, color: 'text-blue-500' },
  star: { icon: '⭐', points: 100, color: 'text-yellow-400' }
};

export const EMOTES = ['😊', '👋', '❤️', '😂', '🎉'];

export const generateWorld = () => {
  const tiles = [];
  const items = [];
  
  for (let y = 0; y < WORLD_SIZE; y++) {
    const row = [];
    for (let x = 0; x < WORLD_SIZE; x++) {
      const random = Math.random();
      if (random < 0.4) row.push('grass');
      else if (random < 0.5) row.push('water');
      else if (random < 0.6) row.push('sand');
      else if (random < 0.7) row.push('forest');
      else if (random < 0.8) row.push('mountain');
      else row.push('path');

      if (Math.random() < 0.1) {
        const itemTypes = Object.keys(COLLECTIBLE_TYPES);
        const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        items.push({ x, y, type: randomItem, id: `item-${x}-${y}` });
      }
    }
    tiles.push(row);
  }
  return { tiles, items };
};

export const getAvatarUrl = (name) => `https://api.dicebear.com/6.x/adventurer/svg?seed=${name}`;
