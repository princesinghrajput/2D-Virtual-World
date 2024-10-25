export const WORLD_SIZE = 20;
export const TILE_SIZE = 40;

export const TERRAIN_TYPES = {
  grass: { color: 'from-green-200 to-green-400', blocking: false },
  water: { color: 'from-blue-300 to-blue-500', blocking: true },
  forest: { color: 'from-green-700 to-green-900', blocking: true },
  mountain: { color: 'from-gray-400 to-gray-600', blocking: true },
};

export const COLLECTIBLE_TYPES = {
  coin: { icon: '🪙', points: 1 },
  gem: { icon: '💎', points: 5 },
  star: { icon: '⭐', points: 10 },
};

export const EMOTES = ['😀', '😂', '😍', '🤔', '😎', '👍', '👋', '🎉'];

export const generateWorld = () => {
  const tiles = Array(WORLD_SIZE).fill().map(() => 
    Array(WORLD_SIZE).fill().map(() => {
      const rand = Math.random();
      if (rand < 0.7) return 'grass';
      if (rand < 0.8) return 'water';
      if (rand < 0.9) return 'forest';
      return 'mountain';
    })
  );

  const items = Array(WORLD_SIZE).fill().map(() => ({
    id: Math.random().toString(36).substr(2, 9),
    type: Object.keys(COLLECTIBLE_TYPES)[Math.floor(Math.random() * Object.keys(COLLECTIBLE_TYPES).length)],
    x: Math.floor(Math.random() * WORLD_SIZE),
    y: Math.floor(Math.random() * WORLD_SIZE),
  }));

  return { tiles, items };
};

export const getAvatarUrl = (name) => `https://api.dicebear.com/6.x/adventurer/svg?seed=${name}`;
