"use client";

import { useRef } from "react";
import { AnnonceExterne } from "@/sanity/lib/queries";
import PhotoCard from "../PhotoCard/PhotoCard";

import "./styles.scss";

interface AnnonceCardProps {
  annonce: AnnonceExterne;
  // Masque le titre et la description (le titre reste utilisé pour l'accessibilité)
  hideContent?: boolean;
}

const AnnonceCard = ({ annonce, hideContent = false }: AnnonceCardProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
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
                L'iframe ne peut pas déclencher le clic du bouton qui l'englobe :
                elle affiche un document dans son propre contexte de navigation,
                qui capture ses propres clics. On l'affiche donc en aperçu non
                interactif (pointer-events: none) et un bouton transparent
                superposé se charge d'ouvrir la vue plein écran au clic.
              */}
              <iframe
                src={`${annonce.fichier}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                title=""
                aria-hidden="true"
                tabIndex={-1}
                loading="lazy"
                className="annonce-card__pdf"
              />
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
            <p className="annonce-card__description">{annonce.description}</p>
          )}
        </div>
      )}
    </article>
  );
};

export default AnnonceCard;
