import PhotoGallery from "../PhotoGallery/PhotoGallery";
import ReadMore from "../ReadMore/ReadMore";
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
}: FeatureCardProps) => (
  <article className="feature-card">
    <div className="feature-card__content">
      <span className="feature-card__date">{date}</span>
      <h3 className="feature-card__title">{title}</h3>
      {description && (
        <ReadMore
          title={title}
          text={description}
          lines={5}
          textClassName="feature-card__description"
          meta={<span className="feature-card__date">{date}</span>}
        />
      )}
    </div>

    <div className="feature-card__gallery-wrapper">
      <PhotoGallery images={images} title={title} maxVisible={6} />
    </div>
  </article>
);

export default FeatureCard;
