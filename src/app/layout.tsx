import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Literata } from "next/font/google";
import "./globals.scss";

const PlusJakartaSansFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const LiterataFont = Literata({
  variable: "--font-literata-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mairie de Sauqueville",
  description: "Site web de la commune de Sauqueville",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${PlusJakartaSansFont.variable} ${LiterataFont.variable}`}
    >
      <body className={PlusJakartaSansFont.className}>{children}</body>
    </html>
  );
}
