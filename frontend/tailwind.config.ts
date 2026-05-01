import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shelf: {
          wood: "#8B6914",
          dark: "#5C4410",
          highlight: "#C49A2A",
        },
        retro: {
          bg: "#0f0f1a",
          surface: "#1a1a2e",
          accent: "#e94560",
          primary: "#16213e",
          secondary: "#0f3460",
          gold: "#f5c518",
          purple: "#7b2d8e",
        },
      },
      backgroundImage: {
        "shelf-gradient": "linear-gradient(180deg, #8B6914 0%, #6B5210 40%, #5C4410 100%)",
        "shelf-shadow": "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)",
      },
      boxShadow: {
        cartridge: "0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        "cartridge-hover": "0 8px 24px rgba(0,0,0,0.6), 0 0 20px rgba(233,69,96,0.3)",
        shelf: "0 8px 32px rgba(0,0,0,0.4), inset 0 -2px 8px rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
