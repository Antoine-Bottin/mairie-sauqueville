"use client";
import { FaTrashAlt } from "react-icons/fa";
import { getNextCollection } from "@/app/utils";
import "./styles.scss";

export default function CollectCard() {
  const today = new Date();
  const nextCollection = getNextCollection(today);

  if (!nextCollection) return null;

  const dateFormatted = nextCollection.date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="small-card small-card--green" suppressHydrationWarning>
      <div className="small-card__left">
        <div className="small-card__icon-wrapper">
          <FaTrashAlt />
        </div>
      </div>

      {/* COLONNE DROITE : Le contenu */}
      <div className="small-card__right">
        <h3 className="small-card__title">Prochaine collecte</h3>

        <div className="small-card__description" suppressHydrationWarning>
          <p
            style={{
              fontWeight: 700,
              textTransform: "capitalize",
              marginBottom: "1rem",
            }}
          >
            {dateFormatted}
          </p>

          <ul>
            {(nextCollection.type === "OM" ||
              nextCollection.type === "OM_CS") && (
              <li>
                <span className="bac bac--gris">Bac Gris (Ordures)</span>
              </li>
            )}

            {(nextCollection.type === "CS" ||
              nextCollection.type === "OM_CS") && (
              <li>
                <span className="bac bac--jaune">Bac Jaune (Tri)</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
