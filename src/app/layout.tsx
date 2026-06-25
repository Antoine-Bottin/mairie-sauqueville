import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Literata } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./components/Footer/Footer";
import AlertBanner from "./components/AlertBanner/AlertBanner";
import NavbarWrapper from "./components/NavbarWrapper/NavbarWrapper";

import "./globals.scss";

const PlusJakartaSansFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

const LiterataFont = Literata({
  variable: "--font-literata-serif",
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Mairie de Sauqueville",
  description: "Site internet de la mairie de Sauqueville",
  creator: "Antoine Bottin",
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
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blason de la commune de Sauqueville",
      },
    ],
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
      <body className={PlusJakartaSansFont.className}>
        <Analytics />
        <AlertBanner />
        <NavbarWrapper />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
