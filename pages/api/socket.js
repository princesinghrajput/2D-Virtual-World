import { Server } from 'socket.io';
import { generateWorld, WORLD_SIZE, findSafePosition } from '../../components/VirtualWorld/constants';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    let players = [];
    let worldData = null;
    let gameState = 'waiting';

    const resetGame = () => {
      players = [];
      worldData = null;
      gameState = 'waiting';
      console.log('Game reset');
    };

    io.on('connection', (socket) => {
      console.log(`New client connected: ${socket.id}`);

      socket.on('join_game', (playerName) => {
        console.log(`Player ${playerName} (${socket.id}) is trying to join the game`);
        if (players.length < 2) {
          if (!worldData) {
            worldData = generateWorld();
            console.log('New world generated:', worldData);
          }
          const newPlayer = {
            id: socket.id,
            name: playerName,
            score: 0,
            ...findSafePosition(worldData)
          };
          players.push(newPlayer);
          console.log(`Player ${playerName} (${socket.id}) joined the game`);
          console.log('Current players:', players);
          io.emit('player_joined', newPlayer);

          if (players.length === 2) {
            gameState = 'playing';
            console.log('Game is starting with players:', players);
            io.emit('game_start', { players, worldData });
          }
        } else {
          console.log(`Game is full, ${playerName} (${socket.id}) cannot join`);
          socket.emit('game_full');
        }
      });

      socket.on('player_move', (data) => {
        const playerIndex = players.findIndex(p => p.id === data.id);
        if (playerIndex !== -1) {
          players[playerIndex] = { ...players[playerIndex], ...data };
          socket.broadcast.emit('player_moved', data);
        }
      });

      socket.on('chat_message', (message) => {
        console.log('Chat message received on server:', message);
        io.emit('new_message', message);
      });

      socket.on('player_emote', (data) => {
        console.log('Player emote received:', data);
        io.emit('player_emote', data);
      });

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
        players = players.filter(p => p.id !== socket.id);
        console.log('Players after disconnect:', players);
        if (players.length === 0) {
          resetGame();
        } else if (players.length === 1 && gameState === 'playing') {
          gameState = 'waiting';
          io.emit('player_left', socket.id);
        }
      });
    });
  }
  res.end();
};

export default SocketHandler;
