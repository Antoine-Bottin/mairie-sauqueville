import FeatureCard from "./components/FeatureCard/FeatureCard";
import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import { smallCardContent } from "./data";
import {
  EvenementMunicipal,
  getEvenements,
  getRetoursSur,
  RetourSur,
} from "@/sanity/lib/queries";
import { formatSimpleDate } from "./utils";
import CalendarCard from "./components/CalendarCard/CalendarCard";
import CollecteCard from "./components/CollectCard/CollectCard";

import "./styles.scss";

const Page = async () => {
  const evenements = await getEvenements();
  const firstEvents = evenements.slice(0, 4);

  const isOnlyOne = firstEvents.length === 1;

  const retoursSur = await getRetoursSur();

  return (
    <div className="home-page">
      <Hero />
      <section className="home-section">
        <h2 className="home-section__title">Informations utiles</h2>
        <div className="home-page__cards">
          <CollecteCard />
          {smallCardContent.map((card, index) => (
            <SmallCard key={index} {...card} />
          ))}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <h2 className="home-section__title">Évènements à venir</h2>
        <div className="home-events__grid">
          {firstEvents.length === 0 ? (
            <p className="home-events__empty">
              Aucun événement de prévu pour le moment.
            </p>
          ) : (
            firstEvents.map((event: EvenementMunicipal) => {
              return (
                <CalendarCard
                  isSingle={isOnlyOne}
                  key={event._id}
                  event={event}
                  date={event.dateDebut}
                />
              );
            })
          )}
        </div>
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <h2 className="home-section__title">Retour sur</h2>
        <div className="home-page__retours">
          {retoursSur.length === 0 ? (
            <p className="home-events__empty">
              Aucun retour sur les événements passés pour le moment.
            </p>
          ) : (
            retoursSur.map((retour: RetourSur) => (
              <FeatureCard
                key={retour._id}
                title={retour.title}
                date={formatSimpleDate(retour.dateDebut)}
                description={retour.description || ""}
                images={retour.images}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
