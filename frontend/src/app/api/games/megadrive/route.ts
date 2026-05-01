import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ROMS_DIR = path.join(process.cwd(), "public", "roms", "md");
const COVERS_DIR = path.join(process.cwd(), "public", "covers", "md");

const ROM_EXTENSIONS = new Set([".md", ".bin", ".smd", ".gen"]);
const COVER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);

function cleanName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function normalizeName(name: string): string {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function generateId(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function extractTitle(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/\s*\(.*?\)\s*/g, "")
    .replace(/\s*\[.*?\]\s*/g, "")
    .replace(/~\s*/g, " - ")
    .replace(/\s+-\s+/g, " - ")
    .trim();
}

function extractYear(filename: string): number | null {
  const yearMatch = filename.match(/\((\d{4})\)/);
  return yearMatch ? parseInt(yearMatch[1], 10) : null;
}

export async function GET() {
  try {
    const romFiles = fs.existsSync(ROMS_DIR)
      ? fs.readdirSync(ROMS_DIR).filter((f) =>
          ROM_EXTENSIONS.has(path.extname(f).toLowerCase())
        )
      : [];

    const coverFiles = fs.existsSync(COVERS_DIR)
      ? fs.readdirSync(COVERS_DIR).filter((f) =>
          COVER_EXTENSIONS.has(path.extname(f).toLowerCase())
        )
      : [];

    const coverByClean = new Map<string, string>();
    const coverByNorm = new Map<string, string>();
    for (const cover of coverFiles) {
      coverByClean.set(cleanName(cover), cover);
      coverByNorm.set(normalizeName(cover), cover);
    }

    const games = [];

    for (const rom of romFiles) {
      const romClean = cleanName(rom);
      const romNorm = normalizeName(rom);

      let matchedCover: string | null = null;

      if (coverByClean.has(romClean)) {
        matchedCover = coverByClean.get(romClean)!;
      } else if (coverByNorm.has(romNorm)) {
        matchedCover = coverByNorm.get(romNorm)!;
      } else {
        coverByClean.forEach((coverFile, key) => {
          if (matchedCover) return;
          if (key === romClean) {
            matchedCover = coverFile;
          }
        });
      }

      if (!matchedCover) {
        coverByNorm.forEach((coverFile, key) => {
          if (matchedCover) return;
          if (key === romNorm) {
            matchedCover = coverFile;
          }
        });
      }

      const romBase = rom.replace(/\.[^.]+$/, "");
      const id = generateId(rom);
      const title = extractTitle(romBase);
      const year = extractYear(rom);

      games.push({
        id,
        title,
        year,
        genre: null,
        cover: matchedCover ? `/covers/md/${encodeURIComponent(matchedCover)}` : null,
        rom: `/roms/md/${encodeURIComponent(rom)}`,
        core: "segaMD",
        romFile: rom,
        coverFile: matchedCover,
      });
    }

    games.sort((a, b) => a.title.localeCompare(b.title));

    return NextResponse.json({ console: "megadrive", total: games.length, games });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
