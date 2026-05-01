"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import GamePlayer from "@/components/GamePlayer";
import { GAME_METADATA, type GameMeta } from "@/data/gameMetadata";

interface ApiGame {
  id: string;
  title: string;
  year: number | null;
  genre: string | null;
  cover: string | null;
  rom: string;
  core: string;
  romFile: string;
  coverFile: string | null;
}

interface GameDetail extends GameMeta {
  cover: string;
  rom: string;
  core: string;
}

const defaultControls = [
  { action: "Mover", key: "Setas Direcionais" },
  { action: "Ação / Ataque", key: "Z / A" },
  { action: "Pular / Especial", key: "X / S" },
  { action: "Pausar", key: "Start / Enter" },
];

export default function GamePage() {
  const params = useParams();
  const id = params.id as string;

  const [game, setGame] = useState<GameDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/api/games/megadrive")
      .then((res) => res.json())
      .then((data) => {
        const found = (data.games || []).find((g: ApiGame) => g.id === id);
        if (!found) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const meta = GAME_METADATA[id];

        setGame({
          title: meta?.title || found.title,
          year: meta?.year || found.year || 0,
          genre: meta?.genre || found.genre || "Ação",
          console: meta?.console || "Mega Drive",
          curiosities:
            meta?.curiosities || [
              "Jogo clássico do Mega Drive.",
              "Título original: " + found.romFile.replace(/\.[^.]+$/, ""),
            ],
          controls: meta?.controls || defaultControls,
          cover: found.cover || "",
          rom: found.rom,
          core: found.core,
        });
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </main>
    );
  }

  if (notFound || !game) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-retro-accent mb-4">404</h1>
          <p className="text-gray-400">Jogo não encontrado</p>
          <a href="/" className="text-retro-gold hover:underline mt-4 block">
            ← Voltar ao início
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8">
      <header className="max-w-6xl mx-auto mb-6">
        <nav className="flex items-center gap-3 text-sm">
          <a
            href="/"
            className="text-gray-400 hover:text-retro-gold transition-colors"
          >
            Consoles
          </a>
          <span className="text-gray-600">/</span>
          <a
            href="/megadrive"
            className="text-gray-400 hover:text-retro-gold transition-colors"
          >
            Mega Drive
          </a>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300">{game.title}</span>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto">
        <GamePlayer game={game} />
      </section>
    </main>
  );
}
