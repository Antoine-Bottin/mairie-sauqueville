"use client";
import { useRef } from "react";
import PhotoCard from "../PhotoCard/PhotoCard";
import "./styles.scss";

interface FeatureCardProps {
  title: string;
  description: string;
  date: string;
  images: string[];
}

const FeatureCard = ({
  title,
  description,
  date,
  images,
}: FeatureCardProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <article className="feature-card">
      <div className="feature-card__content">
        <span className="feature-card__date">{date}</span>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__description">{description}</p>
      </div>

      <div className="feature-card__gallery-wrapper">
        <div
          className={`feature-card__gallery${images.length === 1 ? " feature-card__gallery--single" : ""}`}
          ref={carouselRef}
        >
          {images.map((src, index) => (
            <PhotoCard
              key={index}
              url={src}
              cleanTitle={`${title} - Photo ${index + 1}`}
              customWrapperClass="feature-card__image-wrapper"
              customImageClass="feature-card__image"
              hideCaption={true}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className="feature-card__controls">
            <button
              className="feature-card__arrow feature-card__arrow--left"
              onClick={() => scroll("left")}
              aria-label="Image précédente"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="feature-card__arrow feature-card__arrow--right"
              onClick={() => scroll("right")}
              aria-label="Image suivante"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default FeatureCard;
