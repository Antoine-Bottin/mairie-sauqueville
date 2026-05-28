// components/Hero/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import "./styles.scss";
import Button from "../Button/Button";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // 2. On applique le coefficient de vitesse dès que le composant est monté
      // 0.5 = Vitesse divisée par 2
      // 0.75 = Vitesse idéale pour garder un mouvement naturel mais apaisant
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <header className="hero-section">
      {/* COUCHE 1 : La vidéo en arrière-plan */}
      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        ref={videoRef}
      >
        <source
          src="https://u4qk5gakwyzi6aiz.public.blob.vercel-storage.com/site-assets/Hero%20Section%20Video_reworked%20_trimmed.webm"
          type="video/webm"
        />
        <source
          src="https://u4qk5gakwyzi6aiz.public.blob.vercel-storage.com/site-assets/Hero%20Section%20Video_reworked%20_trimmed.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* COUCHE 2 : L'overlay (le filtre coloré pour le contraste) */}
      <div className="hero-overlay"></div>

      {/* COUCHE 3 : Le contenu textuel */}
      <div className="hero-content">
        <h1 className="hero-title">Bien vivre ensemble à Sauqueville</h1>
        <p className="hero-subtitle">
          Découvrez l&apos;actualité et les démarches de votre commune
        </p>
        <div className="hero-actions">
          <Button size="large" variant="primary">
            Actualités
          </Button>
        </div>
      </div>
    </header>
  );
}
