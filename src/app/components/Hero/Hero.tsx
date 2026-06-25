"use client";

import { useEffect, useRef } from "react";
import "./styles.scss";
import Button from "../Button/Button";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Une media query CSS ne peut pas arrêter un <video autoPlay> :
    // on respecte la préférence "Réduire les animations" en JS
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      videoRef.current.pause();
    } else {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  return (
    <header className="hero">
      <video
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        ref={videoRef}
      >
        <source
          src="https://u4qk5gakwyzi6aiz.public.blob.vercel-storage.com/site-assets/Hero%20Section%20Video%20Reworked%20%20Trimmed.webm"
          type="video/webm"
        />
        <source
          src="https://u4qk5gakwyzi6aiz.public.blob.vercel-storage.com/site-assets/Hero%20Section%20Video%20Reworked%20%20Trimmed.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      <div className="hero__overlay"></div>

      <div className="hero__content">
        <h1 className="hero__title">Bien vivre ensemble à Sauqueville</h1>
        <p className="hero__subtitle">
          Découvrez l&apos;actualité et les services de votre commune
        </p>
        <div className="hero__actions">
          <Button
            size="medium"
            variant="primary"
            disabled
            title="Bientôt disponible"
          >
            Actualités
          </Button>
          <Button size="medium" variant="secondary" href="/contact">
            Nous contacter
          </Button>
        </div>
      </div>
    </header>
  );
}
