import type { Metadata } from "next";
import { Cormorant_Garamond, Pinyon_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
});

export const metadata: Metadata = {
  title: "Convite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${pinyon.variable}`}>
      <body className="min-h-dvh bg-vinho-escuro bg-[radial-gradient(130%_100%_at_50%_0%,#5A1220_0%,#3F0B14_55%,#24050B_100%)] bg-fixed font-cormorant text-marfim antialiased">
        {children}
      </body>
    </html>
  );
}
