import { FaLandmark } from "react-icons/fa";
import FeatureCard from "./components/FeatureCard/FeatureCard";
import Hero from "./components/Hero/Hero";
import SmallCard from "./components/SmallCard/SmallCard";
import AnnonceCard from "./components/AnnonceCard/AnnonceCard";
import { smallCardContent } from "./data";
import {
  ActualiteImportante,
  AnnonceExterne,
  EvenementMunicipal,
  getActualitesImportantes,
  getAnnonces,
  getEvenements,
  getRetoursSur,
  RetourSur,
} from "@/sanity/lib/queries";
import { formatSimpleDate } from "./utils";
import CalendarCard from "./components/CalendarCard/CalendarCard";
import CollecteCard from "./components/CollectCard/CollectCard";

import "./styles.scss";

const LIENS_UTILES = [
  {
    label: "Communauté d'agglomération Dieppe Maritime",
    href: "http://www.agglodieppe-maritime.com/",
  },
  { label: "Ville de Dieppe", href: "https://www.dieppe.fr/" },
  { label: "Mairie d'Offranville", href: "https://www.offranville.fr/" },
  {
    label: "Mairie de Saint-Aubin-sur-Scie",
    href: "https://www.saint-aubin-sur-scie.fr/",
  },
];

const Page = async () => {
  const evenements = await getEvenements();
  const firstEvents = evenements.slice(0, 4);

  const isOnlyOne = firstEvents.length === 1;

  const retoursSur = await getRetoursSur();

  const annonces = await getAnnonces();

  const actualitesImportantes = await getActualitesImportantes();

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

      {actualitesImportantes.length > 0 && (
        <>
          <hr className="home-divider" />

          {/* Ancre ciblée par le bandeau d'alerte (lien "/#actualite-importante") */}
          <section id="actualite-importante" className="home-section">
            <h2 className="home-section__title">Actualité importante</h2>
            <div className="home-page__actualites">
              {actualitesImportantes.map((actualite: ActualiteImportante) => (
                <article key={actualite._id} className="home-page__actualite">
                  <h3 className="home-page__actualite-title">
                    {actualite.titre}
                  </h3>
                  <div className="home-page__annonces">
                    {actualite.fichiers.map((fichier, index) => (
                      <AnnonceCard
                        key={fichier.url}
                        annonce={{
                          _id: `${actualite._id}-${index}`,
                          titre: `${actualite.titre} (document ${index + 1})`,
                          ...(fichier._type === "image"
                            ? { image: fichier.url }
                            : { fichier: fichier.url }),
                        }}
                        hideContent
                      />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

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

      {annonces.length > 0 && (
        <>
          <hr className="home-divider" />

          <section className="home-section">
            <h2 className="home-section__title">À noter</h2>
            <div className="home-page__annonces">
              {annonces.map((annonce: AnnonceExterne) => (
                <AnnonceCard key={annonce._id} annonce={annonce} />
              ))}
            </div>
          </section>
        </>
      )}

      <hr className="home-divider" />

      <section className="home-section">
        <h2 className="home-section__title">Liens utiles</h2>
        <ul className="home-page__liens-utiles">
          {LIENS_UTILES.map((lien) => (
            <li key={lien.href}>
              <a href={lien.href} target="_blank" rel="noopener noreferrer">
                <FaLandmark aria-hidden="true" />
                {lien.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;
