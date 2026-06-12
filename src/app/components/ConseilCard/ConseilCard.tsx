import { Elu } from "@/app/data";
import Image from "next/image";

import { getRandomColor } from "@/app/utils";
import "./styles.scss";

interface ConseilCardProps {
  elu: Elu;
}

const ConseilCard = ({ elu }: ConseilCardProps) => {
  const imageSrc =
    elu.photoUrl ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(elu.nom) +
      `&background=e2e8f0&color=${getRandomColor()}&size=500`;

  return (
    <article className="conseil-card">
      <div className="conseil-card__photo-container">
        <Image
          src={imageSrc}
          alt={elu.nom}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="300px"
        />
      </div>
      <div className="conseil-card__info">
        <h3 className="conseil-card__nom">{elu.nom}</h3>
        <p className="conseil-card__poste">{elu.poste}</p>

        {elu.metier && (
          <p className="conseil-card__metier">
            <span className="conseil-card__label">Métier : </span>
            {elu.metier}
          </p>
        )}
      </div>
    </article>
  );
};
export default ConseilCard;
