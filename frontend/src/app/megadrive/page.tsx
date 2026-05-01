"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import GameShelf from "@/components/GameShelf";
import genesisLogo from "@/assets/genesis_md_logo.png";

interface GameEntry {
  id: string;
  title: string;
  year: number | null;
  genre: string | null;
  cover: string | null;
  rom: string;
  core: string;
}

export default function MegaDrivePage() {
  const [games, setGames] = useState<GameEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/games/megadrive")
      .then((res) => res.json())
      .then((data) => {
        setGames(data.games || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return games;
    const q = search.toLowerCase();
    return games.filter((g) => g.title.toLowerCase().includes(q));
  }, [games, search]);

  return (
    <main className="min-h-screen px-4 py-8">
      <header className="max-w-6xl mx-auto mb-8">
        <nav className="flex items-center gap-3 mb-6">
          <a
            href="/"
            className="text-gray-400 hover:text-retro-gold transition-colors text-sm"
          >
            ← Voltar aos Consoles
          </a>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-4">
            <Image src={genesisLogo} alt="Mega Drive" width={52} height={52} className="object-contain" />
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-retro-gold neon-glow">
                Mega Drive
              </h1>
              <p className="text-gray-400">
                Sega &bull; 1988 &bull; 16-bit &bull; {games.length} jogos
              </p>
            </div>
          </div>

          <div className="sm:ml-auto w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar jogo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-retro-surface border border-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-retro-gold transition-colors"
            />
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Carregando acervo...
          </div>
        ) : (
          <GameShelf games={filtered} />
        )}
      </section>
    </main>
  );
}
