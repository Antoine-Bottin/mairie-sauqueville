"use client";

import { useRef } from "react";
import Image from "next/image";

import "./styles.scss";

interface PhotoCardProps {
  url: string;
  cleanTitle: string;
  sizeClass?: string;

  customWrapperClass?: string;
  customImageClass?: string;
  hideCaption?: boolean;
}

export default function PhotoCard({
  url,
  cleanTitle,
  sizeClass = "",
  customWrapperClass,
  customImageClass,
  hideCaption = false,
}: PhotoCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const wrapperClass = customWrapperClass || `gallery-page__card ${sizeClass}`;
  const imageClass = customImageClass || "gallery-page__img";

  return (
    <>
      <button
        type="button"
        className={wrapperClass}
        onClick={openModal}
        aria-label={`Agrandir la photo : ${cleanTitle}`}
      >
        {customWrapperClass ? (
          <Image
            src={url}
            alt={cleanTitle}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={imageClass}
            loading="lazy"
          />
        ) : (
          <div className="gallery-page__image-wrapper">
            <Image
              src={url}
              alt={cleanTitle}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={imageClass}
              loading="lazy"
            />
          </div>
        )}

        {!hideCaption && (
          <div className="gallery-page__meta">
            <span className="gallery-page__caption">{cleanTitle}</span>
          </div>
        )}
      </button>

      <dialog
        ref={dialogRef}
        className="gallery-modal"
        onClick={(e) => e.target === dialogRef.current && closeModal()}
      >
        <button
          className="gallery-modal__close-btn"
          onClick={closeModal}
          aria-label="Fermer la vue agrandie"
        >
          &times;
        </button>
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
