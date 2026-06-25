export const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);

  return (
    date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " à " +
    date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export const getRandomColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

// Collecte des déchets

// Jours fériés 2026 en France (mois-jour)
const holidays2026 = [
  "01-01", // Jour de l'An
  "04-06", // Lundi de Pâques
  "05-01", // Fête du Travail
  "05-08", // Victoire 1945
  "05-14", // Ascension
  "05-25", // Lundi de Pentecôte
  "07-14", // Fête Nationale
  "08-15", // Assomption
  "11-01", // Toussaint
  "11-11", // Armistice
  "12-25", // Noël
];

// Fonction pour obtenir le numéro de semaine ISO (indispensable pour les semaines impaires)
const getISOWeekNumber = (d: Date): number => {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

// Vérifie si une date est un jour férié
const isHoliday = (d: Date): boolean => {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return holidays2026.includes(`${month}-${day}`);
};

export type CollecteType = "OM" | "CS" | "OM_CS" | "AUCUNE";

// L'algorithme principal pour un jour donné
const getCollectionType = (date: Date): CollecteType => {
  // L'algorithme est conçu pour l'année 2026
  if (date.getFullYear() !== 2026) return "AUCUNE";

  const dayOfWeek = date.getDay(); // 0 = Dimanche, 1 = Lundi, 2 = Mardi...
  const weekNumber = getISOWeekNumber(date);
  const isOddWeek = weekNumber % 2 !== 0;
  const month = date.getMonth(); // 0 = Janvier, 1 = Février

  // Gestion du report : a-t-on eu un lundi ou mardi férié cette semaine ?
  let isShifted = false;
  const monday = new Date(date);
  monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const tuesday = new Date(monday);
  tuesday.setDate(monday.getDate() + 1);

  if (isHoliday(monday) || isHoliday(tuesday)) {
    isShifted = true; // La collecte est décalée d'un jour
  }

  // Jours réels de collecte
  const actualOmDay = isShifted ? 3 : 2; // Passe à Mercredi (3) si décalé

  // CS est le mercredi en Janvier/Février, sinon même jour que OM
  const actualCsDay = month === 0 || month === 1 ? 3 : actualOmDay;

  let type: CollecteType = "AUCUNE";

  // Vérification Ordures Ménagères
  if (dayOfWeek === actualOmDay) {
    type = "OM";
  }

  // Vérification Collecte Sélective (Semaines impaires)
  if (isOddWeek && dayOfWeek === actualCsDay) {
    type = type === "OM" ? "OM_CS" : "CS";
  }

  return type;
};

// Fonction utilitaire pour la Card : Trouve la prochaine collecte à venir
export function getNextCollection(fromDate: Date = new Date()) {
  const checkDate = new Date(fromDate);
  checkDate.setHours(0, 0, 0, 0);

  // On boucle sur les 14 prochains jours pour trouver la prochaine collecte
  for (let i = 0; i < 14; i++) {
    const type = getCollectionType(checkDate);
    if (type !== "AUCUNE") {
      return {
        date: new Date(checkDate),
        type: type,
      };
    }
    checkDate.setDate(checkDate.getDate() + 1);
  }
  return null;
}
