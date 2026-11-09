"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import "./styles.scss";

interface PhotoGalleryProps {
  images: string[];
  // Sert à nommer les photos (« {title} - Photo 3 »)
  title: string;
  // Nombre maximum de vignettes affichées : la dernière devient « +N » et ouvre
  // la visionneuse sur les photos restantes (hauteur de carte maîtrisée)
  maxVisible?: number;
}

// Grille adaptative de vignettes de même taille + visionneuse plein écran
// avec navigation (boutons, flèches clavier, balayage tactile).
const PhotoGallery = ({ images, title, maxVisible }: PhotoGalleryProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const total = images.length;
  const isCapped = maxVisible !== undefined && total > maxVisible;
  const visibleCount = isCapped ? maxVisible : total;
  // La dernière vignette est remplacée par « +N » : N photos ne sont pas montrées seules
  const hiddenCount = total - (visibleCount - 1);

  const openAt = (index: number) => {
    setCurrent(index);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const go = (step: number) =>
    setCurrent((i) => (i === null ? i : (i + step + total) % total));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
  };

  return (
    <>
      <ul className="photo-gallery">
        {images.slice(0, visibleCount).map((src, index) => {
          const isMore = isCapped && index === visibleCount - 1;
          return (
            <li key={src} className="photo-gallery__item">
              <button
                type="button"
                className="photo-gallery__tile"
                onClick={() => openAt(index)}
                aria-label={
                  isMore
                    ? `Voir les ${hiddenCount} autres photos : ${title}`
                    : `Agrandir la photo ${index + 1} sur ${total} : ${title}`
                }
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 33vw, 160px"
                  className="photo-gallery__img"
                  loading="lazy"
                />
                {isMore && (
                  <span className="photo-gallery__more" aria-hidden="true">
                    +{hiddenCount}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="photo-viewer"
        aria-label={`Photos : ${title}`}
        onClose={() => setCurrent(null)}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <button
          type="button"
          className="photo-viewer__close"
          onClick={close}
          aria-label="Fermer la vue agrandie"
        >
          &times;
        </button>

        {current !== null && (
          <>
            <div
              className="photo-viewer__stage"
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX;
              }}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={images[current]}
                src={images[current]}
                alt={`${title} - Photo ${current + 1}`}
                fill
                sizes="90vw"
                priority
                className="photo-viewer__img"
              />
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  className="photo-viewer__nav photo-viewer__nav--prev"
                  onClick={() => go(-1)}
                  aria-label="Photo précédente"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="photo-viewer__nav photo-viewer__nav--next"
                  onClick={() => go(1)}
                  aria-label="Photo suivante"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <p className="photo-viewer__counter" aria-live="polite">
                  {current + 1} / {total}
                </p>
              </>
            )}
          </>
        )}
      </dialog>
    </>
  );
};

export default PhotoGallery;
