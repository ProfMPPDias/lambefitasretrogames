"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Game {
  id: string;
  title: string;
  year: number | null;
  genre: string | null;
  cover: string | null;
  rom: string;
  core: string;
}

interface GameShelfProps {
  games: Game[];
}

const PAGE_SIZE = 24;

export default function GameShelf({ games }: GameShelfProps) {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(games.length / PAGE_SIZE);

  const paged = useMemo(() => {
    const start = page * PAGE_SIZE;
    return games.slice(start, start + PAGE_SIZE);
  }, [games, page]);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2">
        <span className="text-retro-accent">▎</span> Acervo de Cartuchos
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({games.length} jogos)
        </span>
      </h2>

      {paged.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          Nenhum jogo encontrado.
        </div>
      ) : (
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-6 pb-6 px-2 pt-2">
            {paged.map((game) => (
              <Link key={game.id} href={`/play/${game.id}`} className="block">
                <div className="cartridge-case group w-[160px]">
                  <div
                    className="
                      relative rounded-t-lg overflow-hidden
                      bg-gradient-to-b from-gray-800 to-gray-900
                      border-2 border-gray-700 group-hover:border-retro-accent/50
                      shadow-cartridge group-hover:shadow-cartridge-hover
                      transition-colors duration-300
                    "
                  >
                    <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-gray-600 to-gray-700 flex items-center justify-center">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-0.5 bg-gray-500 rounded-full" />
                        <span className="w-1.5 h-0.5 bg-gray-500 rounded-full" />
                        <span className="w-1.5 h-0.5 bg-gray-500 rounded-full" />
                      </div>
                    </div>

                    <div className="p-2.5 pt-6">
                      <div className="aspect-[3/4] rounded overflow-hidden bg-gray-950 mb-2">
                        {game.cover ? (
                          <img
                            src={game.cover}
                            alt={game.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs text-center p-2">
                            Sem capa
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] font-bold text-gray-200 truncate text-center leading-tight">
                        {game.title}
                      </p>
                      <p className="text-[9px] text-gray-500 text-center">
                        {game.year || ""}{" "}
                        {game.genre ? `• ${game.genre}` : ""}
                      </p>
                    </div>

                    <div className="h-1.5 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-b-sm" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="shelf-board rounded-b-md h-4 mx-auto max-w-5xl" />
          <div className="h-3 bg-gradient-to-b from-black/40 to-transparent mx-auto max-w-5xl rounded-b-full" />
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="px-4 py-2 rounded-lg bg-retro-surface border border-gray-700 text-gray-300 hover:border-retro-gold disabled:opacity-30 disabled:hover:border-gray-700 transition-colors"
          >
            ← Anterior
          </button>

          <span className="text-gray-400 text-sm">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded-lg bg-retro-surface border border-gray-700 text-gray-300 hover:border-retro-gold disabled:opacity-30 disabled:hover:border-gray-700 transition-colors"
          >
            Próximo →
          </button>
        </div>
      )}
    </div>
  );
}
