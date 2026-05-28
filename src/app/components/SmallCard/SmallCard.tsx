import { ReactElement } from "react";
import "./styles.scss";

export interface SmallCardProps {
  color: "green" | "blue" | "yellow";
  icon: ReactElement;
  title: string;
  description: ReactElement;
}

const SmallCard = ({ color, icon, title, description }: SmallCardProps) => {
  const smallCardContainerClasses = `small-card-container small-card-container--${color}`;

  return (
    <div className={smallCardContainerClasses}>
      {icon}
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SmallCard;
