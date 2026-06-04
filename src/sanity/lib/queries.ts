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

export async function getEvenements(): Promise<EvenementMunicipal[]> {
  // Requête GROQ : on extrait les infos et on transforme le tableau d'images en tableau d'URL propres
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
