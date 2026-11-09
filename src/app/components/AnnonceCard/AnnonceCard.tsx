"use client";

import { useRef } from "react";
import { AnnonceExterne } from "@/sanity/lib/queries";
import PhotoCard from "../PhotoCard/PhotoCard";
import PdfThumbnail from "../PdfThumbnail/PdfThumbnail";
import ReadMore from "../ReadMore/ReadMore";

import "./styles.scss";

interface AnnonceCardProps {
  annonce: AnnonceExterne;
  // Masque le titre et la description (le titre reste utilisé pour l'accessibilité)
  hideContent?: boolean;
}

const AnnonceCard = ({ annonce, hideContent = false }: AnnonceCardProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sur mobile/tactile, l'iframe PDF de la modale ne s'affiche pas :
  // on ouvre le document dans le visionneur natif du navigateur.
  const openModal = () => {
    if (window.matchMedia("(pointer: coarse)").matches && annonce.fichier) {
      window.open(annonce.fichier, "_blank", "noopener");
      return;
    }
    dialogRef.current?.showModal();
  };
  const closeModal = () => dialogRef.current?.close();

  return (
    <article className="annonce-card">
      {annonce.image ? (
        <PhotoCard
          url={annonce.image}
          cleanTitle={annonce.titre}
          customWrapperClass="annonce-card__image-wrapper"
          customImageClass="annonce-card__image"
          hideCaption={true}
        />
      ) : (
        annonce.fichier && (
          <>
            <div className="annonce-card__pdf-wrapper">
              {/*
                Aperçu rendu en canvas (pdf.js) : une iframe PDF ne s'affiche
                pas sur mobile. Un bouton transparent superposé gère le clic.
              */}
              <PdfThumbnail url={annonce.fichier} />
              <button
                type="button"
                className="annonce-card__pdf-overlay"
                onClick={openModal}
                aria-label={`Agrandir le document : ${annonce.titre}`}
              />
            </div>

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
                <iframe
                  src={annonce.fichier}
                  title={annonce.titre}
                  className="annonce-card__pdf-modal-frame"
                />
              </div>
            </dialog>
          </>
        )
      )}

      {!hideContent && (
        <div className="annonce-card__content">
          <h3 className="annonce-card__title">{annonce.titre}</h3>
          {annonce.description && (
            <ReadMore
              title={annonce.titre}
              text={annonce.description}
              lines={3}
              textClassName="annonce-card__description"
            />
          )}
        </div>
      )}
    </article>
  );
};

export default AnnonceCard;
