// Client bas niveau pour l'API Découpage administratif (https://geo.api.gouv.fr)
// Données ouvertes, pas de clé d'API requise.

const GEO_API_BASE_URL = "https://geo.api.gouv.fr";

// Le découpage communal/intercommunal ne change qu'une fois par an au mieux :
// une revalidation mensuelle suffit largement.
const GEO_API_REVALIDATE_SECONDS = 60 * 60 * 24 * 30;

interface CommuneSummary {
  nom: string;
  population: number;
}

interface CommuneCentreResponse {
  centre: { coordinates: [number, number] };
}

// Appelle une URL de l'API Découpage administratif et parse la réponse JSON.
// Même rôle que fetchMelodiJson côté Melodi : centralise le cache et la gestion d'erreur
// pour tous les appels à geo.api.gouv.fr.
const fetchGeoApiJson = async <T,>(path: string): Promise<T> => {
  const res = await fetch(`${GEO_API_BASE_URL}${path}`, {
    next: { revalidate: GEO_API_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Geo API error (${res.status}) for ${path}`);
  }

  return res.json();
};

// Récupère le nom officiel d'un EPCI (intercommunalité) à partir de son code
// (ex: "247600786" -> "CA de la Région Dieppoise"). Utilisé pour ne pas écrire
// ce nom en dur dans le code : s'il change, l'API le reflète directement.
export const getEpciNom = async (codeEpci: string): Promise<string> => {
  const data = await fetchGeoApiJson<{ nom: string }>(
    `/epcis/${codeEpci}?fields=nom`,
  );
  return data.nom;
};

// Liste toutes les communes membres d'un EPCI, avec leur population.
// Sert à calculer le rang de Sauqueville (nombre d'habitants) parmi les communes
// de son agglomération, sans avoir à maintenir cette liste à la main.
export const getCommunesEpci = async (
  codeEpci: string,
): Promise<CommuneSummary[]> => {
  return fetchGeoApiJson(
    `/communes?codeEpci=${codeEpci}&fields=nom,population`,
  );
};

// Récupère les coordonnées géographiques (longitude, latitude) du centre d'une commune,
// à partir de son code INSEE. Utilisé avec distanceKm() pour calculer la distance
// entre Sauqueville et Dieppe.
export const getCommuneCentre = async (
  codeInsee: string,
): Promise<[number, number]> => {
  const data = await fetchGeoApiJson<CommuneCentreResponse>(
    `/communes/${codeInsee}?fields=centre`,
  );
  return data.centre.coordinates;
};

// Calcule la distance "à vol d'oiseau" entre deux points GPS (formule de haversine,
// qui tient compte de la courbure de la Terre). Coordonnées attendues au format
// [longitude, latitude], comme les renvoie geo.api.gouv.fr.
export const distanceKm = (
  [lon1, lat1]: [number, number],
  [lon2, lat2]: [number, number],
): number => {
  const EARTH_RADIUS_KM = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
