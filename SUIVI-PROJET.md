# SUIVI-PROJET
_Dernière mise à jour : 2026-11-06_

## Objectif
Site de la mairie de Sauqueville (Next.js + Sanity), contenu géré via le Studio `/admin`.

## Fait
- Aperçu PDF testé sur Chrome mobile : OK (v1.2.1).
- Aperçu PDF des cartes « À noter » rendu en canvas (pdf.js) via `PdfThumbnail`, pour fonctionner sur mobile.

## En cours
- Vérification de l'aperçu PDF sur iOS Safari (Chrome OK).

## Prochaine étape
- Refonte design ambitieuse (design actuel trop fade, site vitrine du portfolio) : définir une direction artistique d'abord.

## Décisions (avec le pourquoi)
- pdf.js plutôt qu'iframe : les navigateurs mobiles n'affichent pas les PDF en iframe (bouton « Ouvrir » seul).
- Sur écran tactile, un clic ouvre le PDF dans le visionneur natif (nouvel onglet) ; la modale iframe reste pour le desktop.

## Points ouverts / blocages
- L'aperçu dépend du CORS du CDN Sanity (normalement `*`) : à confirmer en conditions réelles.
