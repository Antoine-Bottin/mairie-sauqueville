"use client";

import { ReactNode, useEffect, useId, useRef, useState } from "react";

import "./styles.scss";

interface ReadMoreProps {
  // Titre repris dans la modale (et dans le nom accessible du bouton)
  title: string;
  text: string;
  // Nombre de lignes affichées avant la coupure
  lines?: number;
  // Classe typographique de la carte hôte (taille, couleur du texte)
  textClassName?: string;
  // Infos affichées au-dessus du titre dans la modale (badge, date, lieu…)
  meta?: ReactNode;
}

// Texte tronqué à N lignes ; si (et seulement si) il déborde, un bouton
// « Lire + » ouvre une modale animée avec le texte complet.
const ReadMore = ({
  title,
  text,
  lines = 4,
  textClassName = "",
  meta,
}: ReadMoreProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    measure();

    // La coupure dépend de la largeur et du chargement des polices
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, lines]);

  const open = () => {
    setIsClosing(false);
    dialogRef.current?.showModal();
  };

  // On joue l'animation de sortie avant de fermer réellement le <dialog>
  const close = () => setIsClosing(true);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDialogElement>) => {
    if (isClosing && e.target === dialogRef.current) {
      dialogRef.current?.close();
      setIsClosing(false);
    }
  };

  return (
    <>
      <p
        ref={textRef}
        className={`read-more__text ${textClassName}`}
        style={{ "--read-more-lines": lines } as React.CSSProperties}
      >
        {text}
      </p>

      {isTruncated && (
        <button
          type="button"
          className="read-more__trigger"
          onClick={open}
          aria-label={`Lire la suite : ${title}`}
        >
          Lire +
          <svg
            className="read-more__arrow"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}

      <dialog
        ref={dialogRef}
        className={`read-more-modal${isClosing ? " read-more-modal--closing" : ""}`}
        aria-labelledby={titleId}
        onAnimationEnd={handleAnimationEnd}
        // Échap : on passe aussi par l'animation de sortie
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => e.target === dialogRef.current && close()}
      >
        <div className="read-more-modal__panel">
          <button
            type="button"
            className="read-more-modal__close"
            onClick={close}
            aria-label="Fermer"
          >
            &times;
          </button>
          {meta && <div className="read-more-modal__meta">{meta}</div>}
          <h3 id={titleId} className="read-more-modal__title">
            {title}
          </h3>
          <p className="read-more-modal__text">{text}</p>
        </div>
      </dialog>
    </>
  );
};

export default ReadMore;
