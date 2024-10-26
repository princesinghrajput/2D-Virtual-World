export const WORLD_SIZE = 20;
export const TILE_SIZE = 40;

export const TERRAIN_TYPES = {
  grass: { color: 'from-green-200 to-green-400', blocking: false },
  water: { color: 'from-blue-300 to-blue-500', blocking: true },
  forest: { color: 'from-green-700 to-green-900', blocking: true },
  mountain: { color: 'from-gray-400 to-gray-600', blocking: true },
  lava: { color: 'from-red-500 to-orange-500', blocking: true },
  desert: { color: 'from-yellow-200 to-yellow-400', blocking: false },
};

export const COLLECTIBLE_TYPES = {
  coin: { icon: '🪙', points: 1 },
  gem: { icon: '💎', points: 5 },
  star: { icon: '⭐', points: 10 },
  potion: { icon: '🧪', points: 15 },
};

export const EMOTES = ['😀', '😂', '😍', '🤔', '😎', '👍', '👋', '🎉'];

export const VILLAIN_TYPES = {
  CHASER: {
    name: 'Chaser',
    emoji: '👹',
    speed: 1000,
    behavior: 'chase'
  },
  WANDERER: {
    name: 'Wanderer',
    emoji: '👻',
    speed: 1500,
    behavior: 'wander'
  },
  TELEPORTER: {
    name: 'Teleporter',
    emoji: '🧙',
    speed: 2000,
    behavior: 'teleport'
  },
  AMBUSHER: {
    name: 'Ambusher',
    emoji: '🕷️',
    speed: 2500,
    behavior: 'ambush'
  }
};

export const generateWorld = () => {
  const tiles = Array(WORLD_SIZE).fill().map(() => Array(WORLD_SIZE).fill('grass'));

  // Generate rivers
  for (let i = 0; i < 2; i++) {
    let x = Math.floor(Math.random() * WORLD_SIZE);
    let y = 0;
    while (y < WORLD_SIZE) {
      tiles[y][x] = 'water';
      y++;
      if (Math.random() < 0.3) x = Math.max(0, Math.min(WORLD_SIZE - 1, x + (Math.random() < 0.5 ? 1 : -1)));
    }
  }

  // Generate forests
  for (let i = 0; i < 5; i++) {
    const centerX = Math.floor(Math.random() * WORLD_SIZE);
    const centerY = Math.floor(Math.random() * WORLD_SIZE);
    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE && Math.random() < 0.7) {
          tiles[y][x] = 'forest';
        }
      }
    }
  }

  // Generate mountains
  for (let i = 0; i < 3; i++) {
    const centerX = Math.floor(Math.random() * WORLD_SIZE);
    const centerY = Math.floor(Math.random() * WORLD_SIZE);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE) {
          tiles[y][x] = 'mountain';
        }
      }
    }
  }

  // Generate lava pools
  for (let i = 0; i < 2; i++) {
    const x = Math.floor(Math.random() * WORLD_SIZE);
    const y = Math.floor(Math.random() * WORLD_SIZE);
    tiles[y][x] = 'lava';
    if (x > 0) tiles[y][x-1] = 'lava';
    if (x < WORLD_SIZE - 1) tiles[y][x+1] = 'lava';
    if (y > 0) tiles[y-1][x] = 'lava';
    if (y < WORLD_SIZE - 1) tiles[y+1][x] = 'lava';
  }

  // Generate desert areas
  for (let i = 0; i < 2; i++) {
    const centerX = Math.floor(Math.random() * WORLD_SIZE);
    const centerY = Math.floor(Math.random() * WORLD_SIZE);
    for (let dy = -3; dy <= 3; dy++) {
      for (let dx = -3; dx <= 3; dx++) {
        const x = centerX + dx;
        const y = centerY + dy;
        if (x >= 0 && x < WORLD_SIZE && y >= 0 && y < WORLD_SIZE && Math.random() < 0.8) {
          tiles[y][x] = 'desert';
        }
      }
    }
  }

  const items = Array(Math.floor(WORLD_SIZE * WORLD_SIZE * 0.1)).fill().map(() => ({
    id: Math.random().toString(36).substr(2, 9),
    type: Object.keys(COLLECTIBLE_TYPES)[Math.floor(Math.random() * Object.keys(COLLECTIBLE_TYPES).length)],
    x: Math.floor(Math.random() * WORLD_SIZE),
    y: Math.floor(Math.random() * WORLD_SIZE),
  }));

  return { tiles, items };
};

export const getAvatarUrl = (name) => `https://api.dicebear.com/6.x/adventurer/svg?seed=${name}`;

export const findSafePosition = (worldData) => {
  let x, y;
  do {
    x = Math.floor(Math.random() * WORLD_SIZE);
    y = Math.floor(Math.random() * WORLD_SIZE);
  } while (TERRAIN_TYPES[worldData.tiles[y][x]].blocking);
  return { x, y };
};

export const POWER_UPS = [
  { name: 'Speed Boost', duration: 10, effect: 'speed' },
  { name: 'Invincibility', duration: 5, effect: 'invincible' },
  { name: 'Score Multiplier', duration: 15, effect: 'multiplier' },
];

export const OBSTACLES = [
  { name: 'Mud', effect: 'slow', duration: 3 },
  { name: 'Trap', effect: 'stun', duration: 2 },
  { name: 'Poison', effect: 'damage', duration: 5 },
];
