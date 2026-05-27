import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Literata } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.scss";
import Navbar from "./components/Navbar/NavBar";

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
  description: "Site internet de la mairie de Sauqueville",
  creator: "Antoine Bottin",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "Mairie",
    "Sauqueville",
    "Mairie de Sauqueville",
    "76550",
    "Communauté d'agglomération de la ville de Dieppe",
    "Evènements",
    "Vie communale",
    "Associations",
    "Informations",
  ],
  metadataBase: new URL("https://www.sauqueville.fr"),
  openGraph: {
    title: "Mairie de Sauqueville ",
    description: `Site internet de la mairie de Sauqueville`,
    images: [{ url: "/assets/logo-mairie-black.svg" }],
    type: "website",
    url: "https://www.sauqueville.fr",
  },
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
      <SpeedInsights />
      <Analytics />
      <body className={PlusJakartaSansFont.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
