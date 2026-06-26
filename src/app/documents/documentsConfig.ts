export interface DocumentCategory {
  slug: string;
  title: string;
  subtitle: string;
  blobPrefix: string;
}

export const documentCategories: DocumentCategory[] = [
  {
    slug: "comptes-rendus",
    title: "Comptes rendus des conseils municipaux",
    subtitle:
      "Retrouvez l'historique des décisions et des délibérations de la commune.",
    blobPrefix: "conseil-municipal/",
  },
  {
    slug: "urbanisme",
    title: "Documents d'urbanisme",
    subtitle: "Retrouvez ici vos documents d'urbanisme.",
    blobPrefix: "urbanisme/",
  },
  {
    slug: "sivos",
    title: "Documents du SIVOS",
    subtitle: "Retrouvez ici les documents du SIVOS.",
    blobPrefix: "sivos/",
  },
  {
    slug: "autres-documents",
    title: "Autres documents",
    subtitle: "Retrouvez ici des documents utiles.",
    blobPrefix: "autres-documents/",
  },
];

export function getDocumentCategory(slug: string) {
  return documentCategories.find((category) => category.slug === slug);
}
