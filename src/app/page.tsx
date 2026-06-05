import { list } from "@vercel/blob";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import { smallCardContent } from "./homeContent";
import { EvenementMunicipal, getEvenements } from "@/sanity/lib/queries";
import CalendarCard from "./components/CalendarCard/CalendarCard";

import "./styles.scss";

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
  const firstEvents = evenements.slice(0, 4);

  const fete_des_voisins_2026 = await list({
    prefix: "evenements/fete_des_voisins_2026",
  });

  const photos = fete_des_voisins_2026.blobs.filter((blob) =>
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
              return (
                <CalendarCard
                  key={event._id}
                  event={event}
                  dateFormatee={formatEventDate(event.dateDebut)}
                />
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
