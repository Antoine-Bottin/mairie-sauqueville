"use client";

import { useRef } from "react";
import Image from "next/image";

interface PhotoCardProps {
  url: string;
  cleanTitle: string;
  sizeClass: string;
}

export default function PhotoCard({
  url,
  cleanTitle,
  sizeClass,
}: PhotoCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <>
      {/* La carte de la galerie */}
      <div className={`gallery-page__card ${sizeClass}`} onClick={openModal}>
        <div className="gallery-page__image-wrapper">
          <Image
            src={url}
            alt={cleanTitle}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="gallery-page__img"
            loading="lazy"
          />
        </div>
        <div className="gallery-page__meta">
          <span className="gallery-page__caption">{cleanTitle}</span>
        </div>
      </div>

      {/* La Modale Épurée */}
      <dialog
        ref={dialogRef}
        className="gallery-modal"
        onClick={(e) => e.target === dialogRef.current && closeModal()}
      >
        {/* Bouton Fermer directement dans l'overlay */}
        <button
          className="gallery-modal__close-btn"
          onClick={closeModal}
          aria-label="Fermer la vue agrandie"
        >
          &times;
        </button>

        {/* Juste l'image, sans conteneur blanc ni texte */}
        <div className="gallery-modal__image-container">
          <Image
            src={url}
            alt={cleanTitle}
            fill
            sizes="90vw"
            priority
            className="gallery-modal__full-img"
          />
        </div>
      </dialog>
    </>
  );
}
