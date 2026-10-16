// sanity/schemaTypes/actualiteImportante.ts
import { defineArrayMember, defineField, defineType } from "sanity";

export const actualiteImportante = defineType({
  name: "actualiteImportante",
  title: "Actualité importante",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre de l'actualité",
      type: "string",
      description:
        "Affiché dans l'encadré orangé de la rubrique \"Actualité importante\", sous \"Informations utiles\" sur la page d'accueil.",
      validation: (Rule) => Rule.required().error("Le titre est obligatoire."),
    }),
    defineField({
      name: "fichiers",
      title: "Documents (PDF ou image)",
      type: "array",
      of: [
        defineArrayMember({
          type: "file",
          title: "PDF",
          options: { accept: "application/pdf" },
        }),
        defineArrayMember({
          type: "image",
          title: "Image",
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("Ajoutez au moins un document."),
    }),
    defineField({
      name: "isActive",
      title: "Activer l'actualité",
      type: "boolean",
      description:
        "Désactivez ce bouton pour retirer la rubrique de la page d'accueil sans la supprimer.",
      initialValue: true,
    }),
    defineField({
      name: "dateExpiration",
      title: "Date d'expiration (Optionnel)",
      type: "date",
      description:
        "Si renseignée, la rubrique disparaît automatiquement de la page d'accueil après cette date.",
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
