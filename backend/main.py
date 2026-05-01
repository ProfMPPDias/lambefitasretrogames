from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path

app = FastAPI(title="Video-Games Retrô API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

roms_dir = BASE_DIR / "roms"
covers_dir = BASE_DIR / "covers"

roms_dir.mkdir(exist_ok=True)
covers_dir.mkdir(exist_ok=True)

app.mount("/roms", StaticFiles(directory=str(roms_dir)), name="roms")
app.mount("/covers", StaticFiles(directory=str(covers_dir)), name="covers")


@app.get("/games/megadrive")
async def list_megadrive_games():
    games = []
    for f in roms_dir.iterdir():
        if f.suffix in (".bin", ".md", ".smd", ".gen"):
            cover_name = f"cover_{f.stem}.png"
            cover_exists = (covers_dir / cover_name).exists()
            games.append({
                "id": f.stem,
                "filename": f.name,
                "cover": f"/covers/{cover_name}" if cover_exists else None,
                "rom": f"/roms/{f.name}",
            })
    return {"console": "megadrive", "games": games}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
