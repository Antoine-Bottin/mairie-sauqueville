// sanity/schemaTypes/annonce.ts
import { defineField, defineType } from "sanity";

export const annonce = defineType({
  name: "annonce",
  title: "Annonce (À noter)",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre de l'annonce",
      type: "string",
      validation: (Rule) => Rule.required().error("Le titre est obligatoire."),
    }),
    defineField({
      name: "description",
      title: "Courte description",
      type: "text",
      rows: 3,
      description: "Apparaîtra sur la carte, dans la section \"À noter\".",
    }),
    defineField({
      name: "image",
      title: "Visuel de l'annonce (Optionnel)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Par exemple le flyer, s'il est fourni en image.",
    }),
    defineField({
      name: "fichier",
      title: "Fichier PDF (Optionnel)",
      type: "file",
      description: "Par exemple le flyer, s'il est fourni en PDF.",
    }),
    defineField({
      name: "lien",
      title: "Lien externe (Optionnel)",
      type: "url",
      description: "Site de l'organisme, page d'inscription, etc.",
    }),
    defineField({
      name: "isActive",
      title: "Activer l'annonce",
      type: "boolean",
      description:
        "Désactivez ce bouton pour retirer l'annonce de la page d'accueil sans la supprimer.",
      initialValue: true,
    }),
    defineField({
      name: "dateExpiration",
      title: "Date d'expiration (Optionnel)",
      type: "date",
      description:
        "Si renseignée, l'annonce disparaît automatiquement de la page d'accueil après cette date (ex: date limite d'inscription).",
    }),
  ],
  preview: {
    select: {
      title: "titre",
      active: "isActive",
      expiration: "dateExpiration",
    },
    prepare({ title, active, expiration }) {
      const status = active ? "🟢 EN LIGNE" : "⚫ INACTIF";
      return {
        title: `${status} - ${title}`,
        subtitle: expiration ? `Expire le ${expiration}` : "Pas d'expiration",
      };
    },
  },
});
