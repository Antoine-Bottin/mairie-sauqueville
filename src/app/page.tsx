import { list } from "@vercel/blob";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import { smallCardContent } from "./homeContent";
import { EvenementMunicipal, getEvenements } from "@/sanity/lib/queries";

import "./styles.scss";
import BandeauAlerte from "./components/AlertBanner/AlertBanner";

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);

  return (
    date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    " à " +
    date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

const Page = async () => {
  const evenements = await getEvenements();
  const firstEvents = evenements.slice(0, 3);

  const response = await list({ prefix: "evenements/fete_des_voisins_2026" });
  const photos = response.blobs.filter((blob) =>
    /\.(webp|jpg|jpeg|png)$/i.test(blob.pathname),
  );

  return (
    <div className="home-page">
      <Hero />
      <section className="home-section">
        <h2 className="home-section__title">Informations utiles</h2>
        <div className="home-page__cards">
          {smallCardContent.map((card, index) => (
            <SmallCard key={index} {...card} />
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      {/* 2. ÉVÉNEMENTS À VENIR */}
      <section className="home-section">
        <h2 className="home-section__title">Événements à venir</h2>
        <div className="home-events__grid">
          {firstEvents.length === 0 ? (
            <p className="home-events__empty">
              Aucun événement de prévu pour le moment.
            </p>
          ) : (
            firstEvents.map((event: EvenementMunicipal) => {
              const dateFormatee = formatEventDate(event.dateDebut);
              return (
                <article
                  key={event._id}
                  className={`event-simple-card event-simple-card--${event.categorie}`}
                >
                  <div className="event-simple-card__content">
                    <span className="event-simple-card__badge">
                      {event.categorie}
                    </span>
                    <span className="event-simple-card__date">
                      {dateFormatee}
                    </span>
                    <h3 className="event-simple-card__card-title">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="event-simple-card__desc">
                        {event.description}
                      </p>
                    )}
                    <span className="event-simple-card__lieu">
                      📍 {event.lieu}
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <h2 className="home-section__title">Retour sur</h2>
        <div className="home-page__cards">
          <FeatureCard
            title="La Fête des voisins"
            date="29 Juin 2026"
            description="Une bien belle soirée qui a réuni pas loin de 70 personnes dans la cour de la Mairie cette année. Sauqueville comme on l'aime, intergénérationel, festif et plein de bonne humeur"
            images={photos.map((photo) => photo.url)}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
