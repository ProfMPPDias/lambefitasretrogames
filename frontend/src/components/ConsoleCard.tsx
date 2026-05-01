import Link from "next/link";
import Image from "next/image";

interface ConsoleCardProps {
  console: {
    id: string;
    name: string;
    manufacturer: string;
    year: number;
    color: string;
    accent: string;
    logo: string;
    active: boolean;
  };
}

export default function ConsoleCard({ console }: ConsoleCardProps) {
  const isActive = console.active;

  const cardContent = (
    <div
      className={`
        relative group rounded-2xl border-2 overflow-hidden
        transition-all duration-300
        ${isActive
          ? `${console.accent} ${console.color} bg-gradient-to-br cursor-pointer hover:scale-105 hover:shadow-2xl`
          : "border-gray-700 bg-gradient-to-br from-gray-900 to-gray-800 cursor-not-allowed opacity-60"
        }
      `}
    >
      <div className="p-6 flex flex-col items-center text-center h-full">
        <div className="h-28 w-full flex items-center justify-center mb-4">
          <Image src={console.logo} alt={console.name} width={140} height={140} className="object-contain max-h-full" />
        </div>
        <h2 className="text-xl font-bold mb-1">{console.name}</h2>
        <p className="text-sm text-gray-300">{console.manufacturer}</p>
        <p className="text-xs text-gray-400 mt-1">{console.year}</p>

        {isActive ? (
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-retro-gold bg-retro-gold/10 px-3 py-1 rounded-full border border-retro-gold/30">
            ▶ Disponível
          </span>
        ) : (
          <span className="mt-4 inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            Em breve
          </span>
        )}
      </div>

      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );

  if (!isActive) {
    return cardContent;
  }

  return (
    <Link href={`/${console.id}`}>
      {cardContent}
    </Link>
  );
}
