// Client bas niveau pour l'API Melodi de l'INSEE (https://portail-api.insee.fr)
// Données ouvertes, pas de clé d'API requise.

export const SAUQUEVILLE_GEO = "COM-76667";

// Les données du recensement ne sont republiées qu'une fois par an (~janvier) :
// une revalidation mensuelle suffit largement.
export const MELODI_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

const MELODI_BASE_URL = "https://api.insee.fr/melodi";

export interface MelodiObservation {
  dimensions: Record<string, string>;
  measures: {
    OBS_VALUE_NIVEAU: { value: number };
  };
}

interface MelodiDataResponse {
  observations: MelodiObservation[];
}

// Appelle une URL Melodi et parse la réponse JSON.
// Tous les appels passent par ici pour partager la même stratégie de cache (revalidate)
// et le même traitement d'erreur (les erreurs HTTP deviennent des exceptions JS).
const fetchMelodiJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url, {
    next: { revalidate: MELODI_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Melodi API error (${res.status}) for ${url}`);
  }

  return res.json();
};

// Récupère les observations brutes d'un jeu de données Melodi (ex: "DS_RP_LOGEMENT_PRINC").
// Par défaut interroge Sauqueville (SAUQUEVILLE_GEO) ; passer { GEO: "EPCI-..." } dans
// `params` pour interroger un autre territoire (ex: l'agglomération) à la place.
// Une "observation" est une mesure pour une combinaison de dimensions donnée
// (ex: { AGE: "Y15T24", SEX: "F", TIME_PERIOD: "2023" } -> valeur).
// C'est la fonction que toutes les fonctions de sauqueville.ts appellent pour obtenir leurs données.
export const fetchMelodiData = async (
  datasetId: string,
  params: Record<string, string> = {},
): Promise<MelodiObservation[]> => {
  const searchParams = new URLSearchParams({
    GEO: SAUQUEVILLE_GEO,
    maxResult: "2000",
    ...params,
  });

  const url = `${MELODI_BASE_URL}/data/${datasetId}?${searchParams.toString()}`;
  const data = await fetchMelodiJson<MelodiDataResponse>(url);
  return data.observations;
};

// La plupart des jeux de données Melodi contiennent plusieurs millésimes (ex: 2012, 2017, 2023).
// Cette fonction trouve l'année la plus récente présente dans une liste d'observations,
// pour ne jamais avoir à écrire une année en dur dans le code (utile quand un nouveau
// recensement est publié : les chiffres se mettent à jour automatiquement).
export const latestYear = (observations: MelodiObservation[]): string => {
  return observations.reduce(
    (max, o) => (o.dimensions.TIME_PERIOD > max ? o.dimensions.TIME_PERIOD : max),
    observations[0]?.dimensions.TIME_PERIOD ?? "",
  );
};
