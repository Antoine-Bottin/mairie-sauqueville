import { getAlerteActive } from "@/sanity/lib/queries";
import "./styles.scss";

const NIVEAU_LABELS: Record<string, string> = {
  info: "Information",
  warning: "Avertissement",
  danger: "Urgent",
};

export default async function BandeauAlerte() {
  const alerte = await getAlerteActive();

  if (!alerte) return null;

  return (
    <div className={`alerte-bandeau alerte-bandeau--${alerte.niveau}`}>
      <div className="alerte-bandeau__container">
        <div className="alerte-bandeau__fixed-left">
          <span className="alerte-bandeau__icon" aria-hidden="true">
            {alerte.niveau === "info" && "ℹ️"}
            {alerte.niveau === "warning" && "⚠️"}
            {alerte.niveau === "danger" && "🚨"}
          </span>
          <span className="sr-only">
            {NIVEAU_LABELS[alerte.niveau]} —{" "}
          </span>
          <strong>Info Mairie :</strong>
        </div>

        {/* 2. PARTIE CENTRALE DÉFILANTE */}
        <div className="alerte-bandeau__scroll-area">
          <p className="alerte-bandeau__message">{alerte.message}</p>
        </div>

        {/* 3. PARTIE DROITE FIXE (Lien) */}
        {alerte.lien && (
          <div className="alerte-bandeau__fixed-right">
            <a href={alerte.lien} className="alerte-bandeau__link">
              En savoir plus &rarr;
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
