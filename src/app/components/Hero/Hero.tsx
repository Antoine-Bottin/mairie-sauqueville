"use client";

import { useEffect, useRef } from "react";
import "./styles.scss";
import Button from "../Button/Button";

const Hero = () => {
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

      {/*
        Calque silex en mix-blend-mode: multiply : le blanc du titre laisse
        passer la vidéo (les lettres sont des « fenêtres »), le fond silex
        l'assombrit presque entièrement.
      */}
      <div className="hero__mask">
        <h1 className="hero__title">Sauqueville</h1>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Bien vivre ensemble</p>
        <div className="hero__actions">
          <Button size="medium" variant="tertiary" href="#discutons">
            Discutons
          </Button>
          <Button size="medium" variant="secondary" href="/contact">
            Nous contacter
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
