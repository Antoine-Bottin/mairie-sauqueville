import { defineField, defineType } from "sanity";

export const alert = defineType({
  name: "alerte",
  title: "Bandeau d'Alerte",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre de l'alerte (Interne)",
      type: "string",
      description:
        "Sert uniquement à vous y retrouver dans l'administration (ex: Verglas Janvier).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Message affiché aux habitants",
      type: "text",
      rows: 2,
      description:
        "Le texte court qui s'affichera dans le bandeau. Soyez concis !",
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error("Le message doit être court (max 150 caractères)."),
    }),
    defineField({
      name: "niveau",
      title: "Niveau de gravité (Couleur du bandeau)",
      type: "string",
      options: {
        list: [
          {
            title: "Information (Bleu - ex: Coupure d'eau prévue)",
            value: "info",
          },
          {
            title: "Attention (Orange - ex: Verglas, Travaux)",
            value: "warning",
          },
          {
            title: "Urgence (Rouge - ex: Incendie, Route barrée)",
            value: "danger",
          },
        ],
        layout: "radio",
      },
      initialValue: "warning",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Activer le bandeau en ligne",
      type: "boolean",
      description:
        "Désactivez ce bouton pour masquer l'alerte quand le danger est passé.",
      initialValue: true,
    }),
    defineField({
      name: "lien",
      title: "Lien d'information (Optionnel)",
      type: "url",
      description:
        "Lien vers un article du site, l'arrêté municipal, ou Météo France.",
    }),
  ],
  // Personnalisation de l'affichage dans la liste Sanity
  preview: {
    select: {
      title: "titre",
      active: "isActive",
      niveau: "niveau",
    },
    prepare({ title, active, niveau }) {
      const status = active ? "🟢 EN LIGNE" : "⚫ INACTIF";
      return {
        title: `${status} - ${title}`,
        subtitle: `Niveau : ${niveau}`,
      };
    },
  },
});
