import { Elu } from "@/app/data";
import Image from "next/image";

import "./styles.scss";

interface ConseilCardProps {
  elu: Elu;
}

const ConseilCard = ({ elu }: ConseilCardProps) => {
  const imageSrc =
    elu.photoUrl ||
    // Avatar d'initiales aux couleurs du site (fond lin clair, lettres lin) en attendant de vraies photos
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(elu.nom) +
      "&background=dce6fb&color=1f4fd1&bold=true&size=200";

  return (
    <article className="conseil-card">
      <div className="conseil-card__photo-container">
        <Image
          src={imageSrc}
          alt={elu.nom}
          fill
          style={{ objectFit: "cover" }}
          sizes="96px"
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
