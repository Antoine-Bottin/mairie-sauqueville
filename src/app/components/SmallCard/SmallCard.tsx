import { ReactNode } from "react";
import "./styles.scss";

export type CardColor = "green" | "blue" | "yellow";

interface SmallCardProps {
  color: CardColor;
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

const SmallCard = ({ color, icon, title, description }: SmallCardProps) => {
  const containerClass = `small-card small-card--${color}`;

  return (
    <div className={containerClass}>
      <div className="small-card__left">
        <div className="small-card__icon-wrapper">{icon}</div>
      </div>

      <div className="small-card__right">
        <h3 className="small-card__title">{title}</h3>
        <div className="small-card__description">{description}</div>
      </div>
    </div>
  );
};

export default SmallCard;
