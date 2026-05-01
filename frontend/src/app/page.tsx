import ConsoleCard from "@/components/ConsoleCard";
import Image from "next/image";
import genesisLogo from "@/assets/genesis_md_logo.png";
import masterSystemLogo from "@/assets/master-system_sega_logo.png";
import nesLogo from "@/assets/nes_nintendo_logo.png";
import snesLogo from "@/assets/snes_nintendo_logo.png";
import lambefitasLogo from "@/assets/logo_lambefitas.png";

const consoles = [
  {
    id: "megadrive",
    name: "Mega Drive",
    manufacturer: "Sega",
    year: 1988,
    color: "from-blue-900 to-blue-700",
    accent: "border-blue-400",
    logo: genesisLogo,
    active: true,
  },
  {
    id: "mastersystem",
    name: "Master System",
    manufacturer: "Sega",
    year: 1986,
    color: "from-gray-800 to-gray-600",
    accent: "border-gray-500",
    logo: masterSystemLogo,
    active: false,
  },
  {
    id: "nes",
    name: "NES",
    manufacturer: "Nintendo",
    year: 1983,
    color: "from-gray-800 to-gray-600",
    accent: "border-gray-500",
    logo: nesLogo,
    active: false,
  },
  {
    id: "snes",
    name: "Super Nintendo",
    manufacturer: "Nintendo",
    year: 1990,
    color: "from-gray-800 to-gray-600",
    accent: "border-gray-500",
    logo: snesLogo,
    active: false,
  },
];

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center px-0 py-12">
        <header className="text-center mb-8 w-full max-w-6xl px-4">
          <Image src={lambefitasLogo} alt="Lambe Fitas - Games Retrô" className="w-80 md:w-[28rem] mx-auto" priority />
          <p className="mt-6 text-left text-3xl md:text-4xl font-extrabold text-yellow-300 neon-glow-yellow">
            Escolha o Video-Game:
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
          {consoles.map((console) => (
            <ConsoleCard key={console.id} console={console} />
          ))}
        </section>
      </main>

      <footer className="w-full">
        <div className="hazard-stripe py-4 px-4 text-center">
          <p className="font-bold text-white text-sm md:text-base" style={{ textShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)" }}>
            Todos direitos Reservados á Lambe Fitas Games Retrô ©2026
          </p>
        </div>
      </footer>
    </>
  );
}
