"use client";

import { useState, useMemo } from "react";

interface Game {
  title: string;
  year: number;
  genre: string;
  cover: string;
  rom: string;
  core: string;
  console: string;
  curiosities: string[];
  controls: { action: string; key: string }[];
}

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const emulatorUrl = useMemo(
    () =>
      `/emulator.html?core=${encodeURIComponent(game.core)}&rom=${encodeURIComponent(game.rom)}`,
    [game.core, game.rom]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50">
          <img
            src={game.cover}
            alt={game.title}
            className="w-full aspect-[3/4] object-cover"
          />
        </div>

        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="
              w-full py-4 px-6 rounded-xl font-bold text-lg
              bg-gradient-to-r from-retro-accent to-red-700
              hover:from-red-600 hover:to-red-800
              text-white shadow-lg hover:shadow-2xl
              transition-all duration-300 hover:scale-[1.02]
              flex items-center justify-center gap-3
            "
          >
            <span className="text-2xl">▶</span>
            Jogar
          </button>
        )}

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="
              w-full py-3 px-6 rounded-xl font-semibold text-sm
              bg-gray-700 hover:bg-gray-600
              text-white transition-colors
              flex items-center justify-center gap-2
            "
          >
            ✕ Fechar Emulador
          </button>
        )}
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            <span className="text-retro-gold neon-glow">{game.title}</span>
          </h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="bg-retro-secondary/60 text-gray-200 px-3 py-1 rounded-full border border-retro-secondary">
              {game.console}
            </span>
            <span className="bg-retro-primary/60 text-gray-200 px-3 py-1 rounded-full border border-retro-primary">
              {game.year}
            </span>
            <span className="bg-retro-purple/30 text-gray-200 px-3 py-1 rounded-full border border-retro-purple/50">
              {game.genre}
            </span>
          </div>
        </div>

        {isPlaying && (
          <div className="w-full rounded-xl overflow-hidden border-2 border-gray-700 bg-black">
            <iframe
              src={emulatorUrl}
              className="w-full border-0"
              style={{ height: "540px" }}
              allowFullScreen
            />
          </div>
        )}

        {!isPlaying && (
          <div
            className="
              w-full aspect-video rounded-xl
              bg-gradient-to-br from-retro-surface to-retro-primary
              border-2 border-gray-700/50
              flex flex-col items-center justify-center gap-3
            "
          >
            <span className="text-6xl opacity-20">🎮</span>
            <p className="text-gray-500 text-sm">
              Clique em &quot;Jogar&quot; para iniciar o emulador
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-retro-surface rounded-xl p-5 border border-gray-700/50">
            <h3 className="text-retro-gold font-bold mb-3 flex items-center gap-2">
              💡 Curiosidades
            </h3>
            <ul className="space-y-2">
              {game.curiosities.map((fact, i) => (
                <li key={i} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-retro-accent mt-0.5 shrink-0">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-retro-surface rounded-xl p-5 border border-gray-700/50">
            <h3 className="text-retro-gold font-bold mb-3 flex items-center gap-2">
              🎮 Controles
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-700/50">
                  <th className="text-left py-1 font-medium">Ação</th>
                  <th className="text-left py-1 font-medium">Tecla</th>
                </tr>
              </thead>
              <tbody>
                {game.controls.map((ctrl, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800/50 last:border-0"
                  >
                    <td className="py-2 text-gray-300">{ctrl.action}</td>
                    <td className="py-2">
                      <kbd className="bg-gray-800 text-retro-gold px-2 py-0.5 rounded text-xs font-mono border border-gray-600">
                        {ctrl.key}
                      </kbd>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
