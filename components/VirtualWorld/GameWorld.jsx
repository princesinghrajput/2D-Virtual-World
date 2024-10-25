import React from 'react';
import { Card } from '@/components/ui/card';
import { WORLD_SIZE, TILE_SIZE, TERRAIN_TYPES, COLLECTIBLE_TYPES, getAvatarUrl } from './constants';

// SVG icons
const TreeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 text-green-800">
    <path fill="currentColor" d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104v68H79.1C66.3 276 56 286.3 56 299.1c0 5.7 2.1 11.3 6 15.5L210.6 478.1c6.5 7.1 15.8 11.1 25.4 11.1s18.9-4 25.4-11.1L409.9 314.6c3.9-4.2 6-9.8 6-15.5c0-12.8-10.3-23.1-23.1-23.1H368V208h24.9c12.8 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L261.4 5.9C254.9-1.2 245.6-5.2 236-5.2s-18.9 4-25.4 11.1zM236 37.8L350.3 164.7H121.7L236 37.8zM184 208H264v68H184V208zm52 266.2L121.7 347.3H350.3L236 474.2z"/>
  </svg>
);

const WaterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 text-blue-500">
    <path fill="currentColor" d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288c11.1-7.9 25.9-7.9 37 0C366 373.4 393.5 384 421 384c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C486.5 437.7 454 448 421 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C173.7 372.2 202.1 384 229 384c27.5 0 55-10.6 77.5-26.1z"/>
  </svg>
);

const MountainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-gray-600">
    <path fill="currentColor" d="M256 32c12.5 0 24.1 6.4 30.7 17L503.4 394.4c5.6 8.9 8.6 19.2 8.6 29.7c0 30.9-25 55.9-55.9 55.9H55.9C25 480 0 455 0 424.1c0-10.5 3-20.8 8.6-29.7L225.2 49c6.6-10.6 18.3-17 30.8-17zm65 192L256 120.4 176.9 246.5 208 288l48-64h65z"/>
  </svg>
);

const CoinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-yellow-500 animate-bounce">
    <path fill="currentColor" d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/>
  </svg>
);

const GemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 text-blue-500 animate-bounce">
    <path fill="currentColor" d="M116.7 33.8c4.5-6.1 11.7-9.8 19.3-9.8H376c7.6 0 14.8 3.6 19.3 9.8l112 152c6.8 9.2 6.1 21.9-1.5 30.4l-232 256c-4.6 5-11 7.9-17.8 7.9s-13.2-2.9-17.8-7.9l-232-256c-7.7-8.5-8.3-21.2-1.5-30.4l112-152zm38.5 39.8c-3.3 2.5-4.2 7-2.1 10.5l57.4 95.6L63.3 192c-4.1 .3-7.3 3.8-7.3 8s3.2 7.6 7.3 8l192 16c.4 0 .9 0 1.3 0l192-16c4.1-.3 7.3-3.8 7.3-8s-3.2-7.6-7.3-8L301.5 179.8l57.4-95.6c2.1-3.5 1.2-8.1-2.1-10.5s-7.9-2-10.7 1L256 172.2 165.9 74.6c-2.8-3-7.4-3.4-10.7-1z"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-6 h-6 text-yellow-400 animate-bounce">
    <path fill="currentColor" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
  </svg>
);

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
                bg-gradient-to-br ${TERRAIN_TYPES[tile].color} flex items-center justify-center
              `}
            >
              {tile === 'forest' && <TreeIcon />}
              {tile === 'water' && <WaterIcon />}
              {tile === 'mountain' && <MountainIcon />}
            </div>
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
          {item.type === 'coin' && <CoinIcon />}
          {item.type === 'gem' && <GemIcon />}
          {item.type === 'star' && <StarIcon />}
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
