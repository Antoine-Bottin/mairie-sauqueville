import AgePyramid from "@/app/components/AgePyramid/AgePyramid";
import CompareStat from "@/app/components/CompareStat/CompareStat";
import KeyFigure from "@/app/components/KeyFigure/KeyFigure";
import PopulationChart from "@/app/components/PopulationChart/PopulationChart";
import ProportionBar from "@/app/components/ProportionBar/ProportionBar";
import {
  getComparaisonAgglomeration,
  getEmploi,
  getLogements,
  getMenages,
  getPopulationEvolution,
  getPyramideDesAges,
} from "@/lib/insee/sauqueville";

import "./styles.scss";

const PageChiffres = async () => {
  const [population, pyramideAges, logements, menages, emploi, agglomeration] =
    await Promise.all([
      getPopulationEvolution(),
      getPyramideDesAges(),
      getLogements(),
      getMenages(),
      getEmploi(),
      getComparaisonAgglomeration(),
    ]);

  return (
    <div className="chiffres-page">
      <div className="chiffres-page__header">
        <h1 className="chiffres-page__title">Sauqueville en chiffres</h1>
        <p className="chiffres-page__subtitle">
          Un portrait de la commune à partir des données publiques de
          l&apos;INSEE (recensement de la population {population.latest.year}
          ).
        </p>
      </div>

      <section className="chiffres-section">
        <h2 className="chiffres-section__title">Population</h2>
        <div className="chiffres-section__content chiffres-section__content--split">
          <KeyFigure
            value={`${population.latest.population}`}
            label="habitants"
            sublabel={`au recensement ${population.latest.year}`}
          />
          <PopulationChart series={population.series} />
        </div>
        <div className="chiffres-section__content chiffres-section__content--pyramid">
          <AgePyramid data={pyramideAges} />
        </div>
      </section>

      <div className="chiffres-page__row">
        <section className="chiffres-section">
          <h2 className="chiffres-section__title">Logement</h2>
          <div className="chiffres-section__content chiffres-section__content--groups">
            <div className="chiffres-section__group">
              <ProportionBar
                label="Résidences principales"
                value={logements.residencesPrincipales}
                total={logements.total}
              />
              <ProportionBar
                label="Résidences secondaires"
                value={logements.residencesSecondaires}
                total={logements.total}
              />
              <ProportionBar
                label="Logements vacants"
                value={logements.vacants}
                total={logements.total}
              />
            </div>
            <div className="chiffres-section__group">
              <ProportionBar
                label="Maisons"
                value={logements.maisons}
                total={logements.maisons + logements.appartements}
              />
              <ProportionBar
                label="Appartements"
                value={logements.appartements}
                total={logements.maisons + logements.appartements}
              />
            </div>
            <div className="chiffres-section__group">
              <ProportionBar
                label="Ménages avec au moins une voiture"
                value={logements.menagesAvecVoiture}
                total={logements.menagesTotal}
              />
              <ProportionBar
                label="Ménages sans voiture"
                value={logements.menagesTotal - logements.menagesAvecVoiture}
                total={logements.menagesTotal}
              />
            </div>
          </div>
        </section>

        <section className="chiffres-section">
          <h2 className="chiffres-section__title">Ménages</h2>
          <div className="chiffres-section__content chiffres-section__content--groups">
            <div className="chiffres-section__group">
              <ProportionBar
                label="Vivent en couple"
                value={menages.viventEnCouple}
                total={menages.viventSeuls + menages.viventEnCouple}
                color="blue"
              />
              <ProportionBar
                label="Vivent seuls"
                value={menages.viventSeuls}
                total={menages.viventSeuls + menages.viventEnCouple}
                color="blue"
              />
            </div>
            <div className="chiffres-section__group">
              {menages.statutMatrimonial.map((statut) => (
                <ProportionBar
                  key={statut.code}
                  label={statut.label}
                  value={statut.value}
                  total={menages.statutMatrimonial.reduce(
                    (sum, s) => sum + s.value,
                    0,
                  )}
                  color="blue"
                />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="chiffres-section">
        <h2 className="chiffres-section__title">Emploi</h2>
        <div className="chiffres-section__content chiffres-section__content--split">
          <KeyFigure
            value={`${emploi.tauxChomage}%`}
            label="taux de chômage"
            sublabel="parmi les actifs de 15 à 64 ans"
          />
          <div className="chiffres-section__content chiffres-section__content--groups">
            <div className="chiffres-section__group">
              <ProportionBar
                label="Actifs en emploi"
                value={emploi.actifsOccupes}
                total={emploi.actifs}
                color="yellow"
              />
              <ProportionBar
                label="Chômeurs"
                value={emploi.chomeurs}
                total={emploi.actifs}
                color="yellow"
              />
            </div>
            <div className="chiffres-section__group">
              <ProportionBar
                label="Retraités"
                value={emploi.retraites}
                total={emploi.inactifs}
                color="yellow"
              />
              <ProportionBar
                label="Étudiants"
                value={emploi.etudiants}
                total={emploi.inactifs}
                color="yellow"
              />
              <ProportionBar
                label="Autres inactifs"
                value={emploi.autresInactifs}
                total={emploi.inactifs}
                color="yellow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="chiffres-section">
        <h2 className="chiffres-section__title">
          Sauqueville dans l&apos;agglomération
        </h2>
        <p className="chiffres-section__intro">
          Sauqueville fait partie de la {agglomeration.epciNom} (
          {agglomeration.nbCommunes} communes), dont elle est la{" "}
          {agglomeration.rangSauqueville}ᵉ commune la plus peuplée, à environ{" "}
          {agglomeration.distanceDieppeKm}
          {" km à vol d'oiseau du centre de Dieppe."}
        </p>
        <div className="chiffres-section__content chiffres-section__content--compare">
          <CompareStat
            label="Évolution de la population (2012-2023)"
            sauquevilleValue={`${agglomeration.evolutionPopulation.sauqueville > 0 ? "+" : ""}${agglomeration.evolutionPopulation.sauqueville}%`}
            agglomerationValue={`${agglomeration.evolutionPopulation.agglomeration > 0 ? "+" : ""}${agglomeration.evolutionPopulation.agglomeration}%`}
          />
          <CompareStat
            label="Taux de chômage"
            sauquevilleValue={`${agglomeration.tauxChomage.sauqueville}%`}
            agglomerationValue={`${agglomeration.tauxChomage.agglomeration}%`}
          />
          <CompareStat
            label="Part de maisons individuelles"
            sauquevilleValue={`${agglomeration.partMaisons.sauqueville}%`}
            agglomerationValue={`${agglomeration.partMaisons.agglomeration}%`}
          />
        </div>
      </section>
    </div>
  );
};

export default PageChiffres;
