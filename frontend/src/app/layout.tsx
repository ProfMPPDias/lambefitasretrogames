import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lambe Fitas - Games Retrô",
  description: "Plataforma de emulação de jogos retrô no navegador",
  icons: {
    icon: "/favicon.gif",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
