"use client";

import { useEffect, useRef, useState } from "react";
import { FaFilePdf } from "react-icons/fa";

import "./styles.scss";

interface PdfThumbnailProps {
  url: string;
}

// Largeur de rendu du canvas (px) : suffisante pour rester net sur mobile retina
const RENDER_WIDTH = 800;

// Rend la première page d'un PDF dans un <canvas>. Les navigateurs mobiles
// n'affichent pas les PDF dans une <iframe> (simple bouton « Ouvrir »), d'où
// ce rendu via pdf.js, identique sur tous les appareils.
const PdfThumbnail = ({ url }: PdfThumbnailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;

    const render = async () => {
      try {
        // Build « legacy » : polyfills pour les navigateurs mobiles plus anciens
        // (le build moderne exige Promise.withResolvers, Safari ≥ 17.4 / Chrome ≥ 119)
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const task = pdfjs.getDocument({ url });
        destroy = () => task.destroy();
        const pdf = await task.promise;
        const page = await pdf.getPage(1);

        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: RENDER_WIDTH / base.width });

        const canvas = canvasRef.current;
        if (cancelled || !canvas) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvas, viewport }).promise;
        if (!cancelled) setStatus("ready");
      } catch (error) {
        console.error("Aperçu PDF indisponible :", error);
        if (!cancelled) setStatus("error");
      }
    };

    render();

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [url]);

  return (
    <div className="pdf-thumbnail" data-status={status} aria-hidden="true">
      <canvas ref={canvasRef} className="pdf-thumbnail__canvas" />
      {status === "loading" && (
        <span className="pdf-thumbnail__placeholder">
          Chargement de l&apos;aperçu…
        </span>
      )}
      {status === "error" && (
        // Échec du rendu : la carte reste un document cliquable, pas un message d'erreur
        <span className="pdf-thumbnail__placeholder pdf-thumbnail__placeholder--fallback">
          <FaFilePdf className="pdf-thumbnail__fallback-icon" />
          Document PDF
          <span className="pdf-thumbnail__fallback-hint">
            Toucher pour ouvrir
          </span>
        </span>
      )}
    </div>
  );
};

export default PdfThumbnail;
