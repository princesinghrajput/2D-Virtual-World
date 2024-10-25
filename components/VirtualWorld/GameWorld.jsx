import React from 'react';
import { Card } from '@/components/ui/card';
import { WORLD_SIZE, TILE_SIZE, TERRAIN_TYPES, COLLECTIBLE_TYPES, getAvatarUrl } from './constants';

const GameWorld = ({ worldData, players }) => (
  <Card className="p-4 bg-white/90 backdrop-blur-sm shadow-lg">
    <div className="relative" style={{ 
      width: WORLD_SIZE * TILE_SIZE,
      height: WORLD_SIZE * TILE_SIZE,
    }}>
      {/* Render world tiles */}
      {worldData.tiles.map((row, y) => (
        <div key={y} className="flex">
          {row.map((tile, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-10 h-10 border border-slate-300
                bg-gradient-to-br ${TERRAIN_TYPES[tile].color}
              `}
            />
          ))}
        </div>
      ))}
      
      {/* Render collectible items */}
      {worldData.items.map((item) => (
        <div
          key={item.id}
          className="absolute flex items-center justify-center w-10 h-10"
          style={{
            left: item.x * TILE_SIZE,
            top: item.y * TILE_SIZE,
            zIndex: 5,
          }}
        >
          <span className="text-2xl animate-bounce">{COLLECTIBLE_TYPES[item.type].icon}</span>
        </div>
      ))}
      
      {/* Render players */}
      {players.map((player) => (
        <div
          key={player.id}
          className="absolute flex flex-col items-center"
          style={{
            left: player.x * TILE_SIZE,
            top: player.y * TILE_SIZE,
            transition: 'all 0.3s',
            zIndex: 10,
          }}
        >
          {/* Emote bubble */}
          {player.emote && (
            <div className="text-3xl mb-1 animate-bounce">
              {player.emote}
            </div>
          )}
          
          {/* Chat bubble */}
          {player.chat && (
            <div className="absolute -top-10 bg-white px-3 py-2 rounded-lg shadow-md text-sm whitespace-nowrap max-w-xs overflow-hidden">
              {player.chat}
            </div>
          )}
          
          {/* Player avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <img src={getAvatarUrl(player.name)} alt={player.name} className="w-full h-full" />
          </div>
          
          {/* Player name */}
          <div className="text-xs mt-1 font-semibold bg-black/50 text-white px-2 py-1 rounded-full">
            {player.name}
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export default GameWorld;
