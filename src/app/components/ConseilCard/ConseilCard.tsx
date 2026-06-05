import { Elu } from "@/app/data";
import Image from "next/image";

import "./styles.scss";
import { getRandomColor } from "@/app/utils";

interface ConseilCardProps {
  elu: Elu;
}

const ConseilCard = ({ elu }: ConseilCardProps) => {
  // Si photoUrl est vide ou non défini, on utilise une image générique
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
          sizes="300px"
        />
      </div>
      <div className="conseil-card__info">
        <h3>{elu.nom}</h3>
        <p>{elu.poste}</p>
      </div>
    </article>
  );
};
export default ConseilCard;
