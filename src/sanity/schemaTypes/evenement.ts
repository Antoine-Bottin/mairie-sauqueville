// sanity/schemaTypes/evenement.ts
import { defineField, defineType } from "sanity";

export const evenement = defineType({
  name: "evenement",
  title: "Calendrier des Événements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre de l'événement",
      type: "string",
      validation: (Rule) => Rule.required().error("Le titre est obligatoire."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "dateDebut",
      title: "Date et Heure de début",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
        timeStep: 15,
      },
      validation: (Rule) =>
        Rule.required().error("La date de début est obligatoire."),
    }),
    defineField({
      name: "dateFin",
      title: "Date et Heure de fin (Optionnel)",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm",
      },
    }),
    defineField({
      name: "categorie",
      title: "Catégorie / Tag",
      type: "string",
      options: {
        list: [
          { title: "Vie Municipale (Conseils, vœux...)", value: "municipale" },
          { title: "Associations & Loisirs", value: "association" },
          { title: "Culture & Fêtes", value: "culture" },
          { title: "Urgent / Infos Pratiques", value: "info" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Courte Description",
      type: "text",
      rows: 3,
      description: "Apparaîtra sur la carte de l'événement.",
    }),
    defineField({
      name: "images",
      title: "Galerie Photos (Optionnel)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description:
        "Si tu ajoutes plusieurs photos, on pourra utiliser ta FeatureCard avec carrousel !",
    }),
    defineField({
      name: "lieu",
      title: "Lieu de l'événement",
      type: "string",
      initialValue: "Sauqueville",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateDebut",
    },
  },
});
