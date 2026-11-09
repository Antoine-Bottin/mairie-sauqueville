// fetch avec nouvelles tentatives pour les API externes appelées pendant le build
// (INSEE Melodi, geo.api.gouv.fr).
//
// Pourquoi : la page « Sauqueville en chiffres » est prérendue au déploiement. Un
// simple refus de connexion passager (ECONNREFUSED) d'une de ces API suffisait à faire
// échouer tout le build de production (constaté sur la release v1.3.0).
// On retente donc les erreurs réseau, les timeouts, les 5xx et les 429 ; une vraie
// erreur 4xx (mauvaise requête) n'est pas retentée, elle remonte tout de suite.

const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 1000;
const ATTEMPT_TIMEOUT_MS = 15_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableStatus = (status: number) => status === 429 || status >= 500;

export const fetchWithRetry = async (
  url: string,
  init: RequestInit & { next?: { revalidate?: number | false } } = {},
): Promise<Response> => {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS),
      });

      if (!isRetryableStatus(res.status) || attempt === MAX_ATTEMPTS) {
        return res;
      }
      lastError = new Error(`HTTP ${res.status}`);
    } catch (error) {
      // Erreur réseau ou timeout
      lastError = error;
      if (attempt === MAX_ATTEMPTS) throw error;
    }

    // Attente croissante : 1 s, 2 s, 4 s
    await wait(BASE_DELAY_MS * 2 ** (attempt - 1));
  }

  throw lastError;
};
