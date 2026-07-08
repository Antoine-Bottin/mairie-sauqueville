import {
  distanceKm,
  getCommuneCentre,
  getCommunesEpci,
  getEpciNom,
} from "../geo/geoApiGouv";
import { fetchMelodiData, latestYear, MelodiObservation } from "./melodi";

// Fonction "couteau suisse" utilisée par toutes les fonctions get*() de ce fichier.
// Un jeu de données Melodi renvoie une observation par combinaison de dimensions
// (âge, sexe, statut d'emploi, etc.), y compris des lignes "totaux" marquées "_T".
// Cette fonction additionne la valeur de toutes les observations d'une année donnée
// qui correspondent exactement aux dimensions demandées (les dimensions non précisées
// ne sont pas filtrées, donc si on les laisse de côté leurs valeurs sont sommées ensemble).
// Exemple : sumObservations(obs, "2023", { SEX: "_T", AGE: "Y15T64" }) donne le total
// toutes tranches d'âge 15-64 confondues, pour les deux sexes.
const sumObservations = (
  observations: MelodiObservation[],
  year: string,
  exactDimensions: Record<string, string>,
): number => {
  return observations
    .filter(
      (o) =>
        o.dimensions.TIME_PERIOD === year &&
        Object.entries(exactDimensions).every(
          ([key, value]) => o.dimensions[key] === value,
        ),
    )
    .reduce((sum, o) => sum + o.measures.OBS_VALUE_NIVEAU.value, 0);
};

export interface PopulationEvolution {
  series: { year: number; population: number }[];
  latest: { year: number; population: number };
}

// Population de Sauqueville pour chaque recensement depuis 1968, plus le dernier
// chiffre connu à part. Alimente le graphique d'évolution (KeyFigure + PopulationChart)
// en haut de la page /sauqueville/chiffres.
// PMUN = "population municipale", la seule mesure présente dans ce jeu de données.
export const getPopulationEvolution = async (): Promise<PopulationEvolution> => {
  const observations = await fetchMelodiData("DS_POPULATIONS_HISTORIQUES");

  const series = observations
    .filter((o) => o.dimensions.POPREF_MEASURE === "PMUN")
    .map((o) => ({
      year: Number(o.dimensions.TIME_PERIOD),
      population: o.measures.OBS_VALUE_NIVEAU.value,
    }))
    .sort((a, b) => a.year - b.year);

  return { series, latest: series[series.length - 1] };
};

export interface PyramideAgesTranche {
  label: string;
  hommes: number;
  femmes: number;
}

// Tranches d'âge de DS_RP_POPULATION_PRINC qui se complètent exactement (aucun
// chevauchement) : leur somme donne le total de la population, vérifié pour Sauqueville
// (354 = 76 + 23 + 62 + 72 + 51 + 51 + 19 en 2023). Ordonnées ici de la plus âgée
// à la plus jeune pour être affichées directement du haut vers le bas de la pyramide.
const AGE_BRACKETS: { code: string; label: string }[] = [
  { code: "Y_GE80", label: "80 ans et +" },
  { code: "Y65T79", label: "65-79 ans" },
  { code: "Y55T64", label: "55-64 ans" },
  { code: "Y40T54", label: "40-54 ans" },
  { code: "Y25T39", label: "25-39 ans" },
  { code: "Y15T24", label: "15-24 ans" },
  { code: "Y_LT15", label: "Moins de 15 ans" },
];

// Pyramide des âges de Sauqueville : population par tranche d'âge et par sexe,
// pour le graphique PyramideAges de la section "Population".
export const getPyramideDesAges = async (): Promise<PyramideAgesTranche[]> => {
  const observations = await fetchMelodiData("DS_RP_POPULATION_PRINC");
  const year = latestYear(observations);

  const valeur = (age: string, sexe: string) =>
    sumObservations(observations, year, { AGE: age, SEX: sexe });

  return AGE_BRACKETS.map(({ code, label }) => ({
    label,
    hommes: valeur(code, "M"),
    femmes: valeur(code, "F"),
  }));
};

export interface Logements {
  total: number;
  residencesPrincipales: number;
  residencesSecondaires: number;
  vacants: number;
  maisons: number;
  appartements: number;
  menagesAvecVoiture: number;
  menagesTotal: number;
}

// DS_RP_LOGEMENT_PRINC a beaucoup de dimensions (type de logement, occupation,
// nombre de voitures, date de construction, chauffage...). Pour lire un chiffre précis
// (ex: "combien de maisons ?") il faut préciser "_T" (total, pas de filtre) sur toutes
// les dimensions qu'on ne regarde pas, sinon on additionnerait plusieurs sous-catégories.
// Cette constante sert de base "tout en _T" que dwellings() ci-dessous vient surcharger
// dimension par dimension (voir sumObservations pour le mécanisme).
const LOGEMENT_DIMS_ALL_T = {
  OCS: "_T",
  TDW: "_T",
  CARS: "_T",
  CARPARK: "_T",
  NOR: "_T",
  NRG_SRC: "_T",
  BUILD_END: "_T",
  TSH: "_T",
  L_STAY: "_T",
};

// Chiffres clés du logement à Sauqueville pour l'année la plus récente disponible :
// répartition résidences principales / secondaires / vacantes, maisons / appartements,
// et taux de motorisation des ménages. Alimente la section "Logement" de la page.
export const getLogements = async (): Promise<Logements> => {
  const observations = await fetchMelodiData("DS_RP_LOGEMENT_PRINC");
  const year = latestYear(observations);

  // Petit raccourci local : demande un chiffre "nombre de logements" (RP_MEASURE)
  // en partant de la base "tout en _T" et en ne précisant que ce qui change.
  // Ex: dwellings({ OCS: "DW_MAIN" }) = nombre de résidences principales.
  const dwellings = (overrides: Record<string, string> = {}) =>
    sumObservations(observations, year, {
      RP_MEASURE: "DWELLINGS",
      ...LOGEMENT_DIMS_ALL_T,
      ...overrides,
    });

  return {
    total: dwellings(),
    residencesPrincipales: dwellings({ OCS: "DW_MAIN" }),
    residencesSecondaires: dwellings({ OCS: "DW_SEC_DW_OCC" }),
    vacants: dwellings({ OCS: "DW_VAC" }),
    maisons: dwellings({ TDW: "1" }),
    appartements: dwellings({ TDW: "2" }),
    menagesAvecVoiture: dwellings({ OCS: "DW_MAIN", CARS: "C_GE1" }),
    menagesTotal: dwellings({ OCS: "DW_MAIN" }),
  };
};

export interface Menages {
  statutMatrimonial: { code: string; label: string; value: number }[];
  viventSeuls: number;
  viventEnCouple: number;
}

// Correspondance entre les codes CIVIL_STATUS de l'INSEE et leur libellé français
// (l'API renvoie "1", "2"... pas les noms). Récupérée en interrogeant l'endpoint
// /melodi/range/DS_RP_MENAGES_PRINC une fois, lors de la construction de cette page.
const CIVIL_STATUS_LABELS: Record<string, string> = {
  "1": "Mariés",
  "2": "Pacsés",
  "3": "En concubinage",
  "4": "Veufs",
  "5": "Divorcés",
  "6": "Célibataires",
};

// Répartition des 15 ans et plus par statut matrimonial, et par "vit seul / vit en couple".
// Alimente la section "Ménages" de la page.
export const getMenages = async (): Promise<Menages> => {
  const observations = await fetchMelodiData("DS_RP_MENAGES_PRINC");
  const year = latestYear(observations);

  // Une entrée par statut matrimonial (marié, célibataire...), avec son libellé et sa valeur.
  const statutMatrimonial = Object.entries(CIVIL_STATUS_LABELS).map(
    ([code, label]) => ({
      code,
      label,
      value: sumObservations(observations, year, {
        RP_MEASURE: "POP",
        NOC: "_T",
        COUPLE: "_T",
        OCS: "_T",
        AGE: "Y_GE15",
        CIVIL_STATUS: code,
      }),
    }),
  );

  // COUPLE: "0" = vit seul, "1" = vit en couple (dimension différente de CIVIL_STATUS,
  // qui elle donne l'état civil légal plutôt que le mode de cohabitation réel).
  const coupleValue = (coupleCode: string) =>
    sumObservations(observations, year, {
      RP_MEASURE: "POP",
      CIVIL_STATUS: "_T",
      NOC: "_T",
      OCS: "_T",
      COUPLE: coupleCode,
    });

  return {
    statutMatrimonial,
    viventSeuls: coupleValue("0"),
    viventEnCouple: coupleValue("1"),
  };
};

export interface Emploi {
  population1564: number;
  actifs: number;
  actifsOccupes: number;
  chomeurs: number;
  tauxChomage: number;
  inactifs: number;
  retraites: number;
  etudiants: number;
  autresInactifs: number;
}

// Emploi et chômage de la population 15-64 ans à Sauqueville. Alimente la section
// "Emploi" de la page (taux de chômage + répartition actifs/retraités/étudiants...).
export const getEmploi = async (): Promise<Emploi> => {
  const observations = await fetchMelodiData("DS_RP_EMPLOI_LR_PRINC");
  const year = latestYear(observations);

  // Raccourci local : demande une catégorie de statut d'emploi (EMPSTA_ENQ) pour
  // la tranche d'âge 15-64 ans, tous sexes confondus. Codes utilisés plus bas :
  // "1" = actif occupé, "2" = chômeur, "1T2" = actif (occupé + chômeur), "3" = inactif,
  // "31" = retraité, "33" = étudiant, "35T36" = autre inactif (foyer, etc.), "_T" = total.
  const empsta = (code: string) =>
    sumObservations(observations, year, {
      RP_MEASURE: "POP",
      SEX: "_T",
      EDUC: "_T",
      AGE: "Y15T64",
      EMPSTA_ENQ: code,
    });

  const actifs = empsta("1T2");
  const chomeurs = empsta("2");

  return {
    population1564: empsta("_T"),
    actifs,
    actifsOccupes: empsta("1"),
    chomeurs,
    tauxChomage: actifs > 0 ? Math.round((chomeurs / actifs) * 1000) / 10 : 0,
    inactifs: empsta("3"),
    retraites: empsta("31"),
    etudiants: empsta("33"),
    autresInactifs: empsta("35T36"),
  };
};

// Sauqueville appartient à l'intercommunalité (EPCI) "CA de la Région Dieppoise".
// EPCI_GEO est le format attendu par Melodi pour interroger ce territoire plutôt
// que la seule commune (voir fetchMelodiData). Les codes INSEE des communes servent
// eux à geo.api.gouv.fr (getCommuneCentre) pour calculer la distance à Dieppe.
const EPCI_CODE = "247600786"; // CA de la Région Dieppoise
const EPCI_GEO = `EPCI-${EPCI_CODE}`;
const SAUQUEVILLE_INSEE_CODE = "76667";
const DIEPPE_INSEE_CODE = "76217";

export interface ComparaisonAgglomeration {
  epciNom: string;
  nbCommunes: number;
  rangSauqueville: number;
  distanceDieppeKm: number;
  evolutionPopulation: { sauqueville: number; agglomeration: number };
  tauxChomage: { sauqueville: number; agglomeration: number };
  partMaisons: { sauqueville: number; agglomeration: number };
}

// Calcule l'évolution de la population en % entre 2012 et 2023 (les 3 seuls millésimes
// disponibles dans DS_RP_POPULATION_PRINC). Réutilisée à la fois pour Sauqueville et
// pour l'EPCI : on lui passe simplement les observations de l'un ou l'autre territoire.
const evolutionPopulationPct = (observations: MelodiObservation[]): number => {
  const parAnnee = (year: string) =>
    sumObservations(observations, year, {
      RP_MEASURE: "POP",
      AGE: "_T",
      SEX: "_T",
    });

  const debut = parAnnee("2012");
  const fin = parAnnee("2023");
  return debut > 0 ? Math.round(((fin - debut) / debut) * 1000) / 10 : 0;
};

// Taux de chômage (chômeurs / actifs) pour la tranche d'âge 15-64 ans. Même logique
// que dans getEmploi(), extraite ici pour être appliquée aussi bien à Sauqueville
// qu'à l'agglomération.
const tauxChomageValue = (
  observations: MelodiObservation[],
  year: string,
): number => {
  const empsta = (code: string) =>
    sumObservations(observations, year, {
      RP_MEASURE: "POP",
      SEX: "_T",
      EDUC: "_T",
      AGE: "Y15T64",
      EMPSTA_ENQ: code,
    });

  const actifs = empsta("1T2");
  const chomeurs = empsta("2");
  return actifs > 0 ? Math.round((chomeurs / actifs) * 1000) / 10 : 0;
};

// Part des maisons individuelles parmi (maisons + appartements). Même logique que
// dans getLogements(), réutilisée ici pour comparer Sauqueville à l'agglomération.
const partMaisonsValue = (
  observations: MelodiObservation[],
  year: string,
): number => {
  const dwellings = (overrides: Record<string, string>) =>
    sumObservations(observations, year, {
      RP_MEASURE: "DWELLINGS",
      ...LOGEMENT_DIMS_ALL_T,
      ...overrides,
    });

  const maisons = dwellings({ TDW: "1" });
  const appartements = dwellings({ TDW: "2" });
  const total = maisons + appartements;
  return total > 0 ? Math.round((maisons / total) * 1000) / 10 : 0;
};

// Fonction "chef d'orchestre" de la section "Sauqueville dans l'agglomération" :
// lance en parallèle tous les appels nécessaires (Melodi pour les chiffres INSEE,
// geo.api.gouv.fr pour le classement démographique et la distance), puis combine
// les résultats en un seul objet prêt à être affiché par la page.
export const getComparaisonAgglomeration = async (): Promise<ComparaisonAgglomeration> => {
  const [
    epciNom,
    communesEpci,
    sauquevilleCentre,
    dieppeCentre,
    populationSauqueville,
    populationEpci,
    emploiSauqueville,
    emploiEpci,
    logementSauqueville,
    logementEpci,
  ] = await Promise.all([
    getEpciNom(EPCI_CODE),
    getCommunesEpci(EPCI_CODE),
    getCommuneCentre(SAUQUEVILLE_INSEE_CODE),
    getCommuneCentre(DIEPPE_INSEE_CODE),
    fetchMelodiData("DS_RP_POPULATION_PRINC"),
    fetchMelodiData("DS_RP_POPULATION_PRINC", { GEO: EPCI_GEO }),
    fetchMelodiData("DS_RP_EMPLOI_LR_PRINC"),
    fetchMelodiData("DS_RP_EMPLOI_LR_PRINC", { GEO: EPCI_GEO }),
    fetchMelodiData("DS_RP_LOGEMENT_PRINC"),
    fetchMelodiData("DS_RP_LOGEMENT_PRINC", { GEO: EPCI_GEO }),
  ]);

  // Classe les communes de l'EPCI par population décroissante, puis trouve la position
  // de Sauqueville dans ce classement (+1 car findIndex commence à 0, donc "3e" et non "2e").
  const rangSauqueville =
    [...communesEpci]
      .sort((a, b) => b.population - a.population)
      .findIndex((commune) => commune.nom === "Sauqueville") + 1;

  return {
    epciNom,
    nbCommunes: communesEpci.length,
    rangSauqueville,
    distanceDieppeKm:
      Math.round(distanceKm(sauquevilleCentre, dieppeCentre) * 10) / 10,
    evolutionPopulation: {
      sauqueville: evolutionPopulationPct(populationSauqueville),
      agglomeration: evolutionPopulationPct(populationEpci),
    },
    tauxChomage: {
      sauqueville: tauxChomageValue(
        emploiSauqueville,
        latestYear(emploiSauqueville),
      ),
      agglomeration: tauxChomageValue(emploiEpci, latestYear(emploiEpci)),
    },
    partMaisons: {
      sauqueville: partMaisonsValue(
        logementSauqueville,
        latestYear(logementSauqueville),
      ),
      agglomeration: partMaisonsValue(logementEpci, latestYear(logementEpci)),
    },
  };
};
