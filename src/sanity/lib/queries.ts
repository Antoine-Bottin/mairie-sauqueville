// lib/sanity.queries.ts
import { client } from "./client";

// On définit le type TypeScript de ce que Sanity va nous renvoyer
export interface EvenementMunicipal {
  _id: string;
  title: string;
  dateDebut: string;
  dateFin?: string;
  categorie: "municipale" | "association" | "culture" | "info";
  description?: string;
  image: string;
  lieu: string;
}

export interface RetourSur {
  _id: string;
  title: string;
  dateDebut: string;
  description?: string;
  images: string[];
}

export interface AlerteMunicipale {
  _id: string;
  message: string;
  niveau: "info" | "warning" | "danger";
  lien?: string;
}

export interface AnnonceExterne {
  _id: string;
  titre: string;
  description?: string;
  image?: string;
  fichier?: string;
  lien?: string;
}

export const getEvenements = async (): Promise<EvenementMunicipal[]> => {
  return client.fetch(`
  *[_type == "evenement" && dateTime(dateDebut) >= dateTime(now()) - 60*60*24] | order(dateDebut asc) {
    _id,
    title,
    dateDebut,
    dateFin,
    categorie,
    description,
    "image": image.asset->url,
    lieu
}
  `);
};

export const getRetoursSur = async (): Promise<RetourSur[]> => {
  return client.fetch(`
  *[_type == "evenement" && dateTime(dateDebut) < dateTime(now()) && defined(galerie)] | order(dateDebut desc) [0...6] {
    _id,
    title,
    dateDebut,
    description,
    "images": galerie[].asset->url
}
  `);
};

export const getAlerteActive = async (): Promise<AlerteMunicipale | null> => {
  return client.fetch(
    `*[_type == "alerte" && isActive == true] | order(_updatedAt desc)[0] {
      _id,
      message,
      niveau,
      lien
    }`,
    {},
    { cache: "no-store" },
  );
};

export const getAnnonces = async (): Promise<AnnonceExterne[]> => {
  return client.fetch(`
  *[_type == "annonce" && isActive == true && (!defined(dateExpiration) || dateTime(dateExpiration) >= dateTime(now()))] | order(_createdAt desc) [0...4] {
    _id,
    titre,
    description,
    "image": image.asset->url,
    "fichier": fichier.asset->url,
    lien
}
  `);
};
