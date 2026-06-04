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
  images?: string[];
  lieu: string;
}

export interface AlerteMunicipale {
  _id: string;
  message: string;
  niveau: "info" | "warning" | "danger";
  lien?: string;
}

export async function getEvenements(): Promise<EvenementMunicipal[]> {
  return client.fetch(`
    *[_type == "evenement"] | order(dateDebut asc) {
      _id,
      title,
      dateDebut,
      dateFin,
      categorie,
      description,
      "images": images[].asset->url,
      lieu
    }
  `);
}

export async function getAlerteActive(): Promise<AlerteMunicipale | null> {
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
}
