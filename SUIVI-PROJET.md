# SUIVI-PROJET
_Dernière mise à jour : 2026-11-06_

## Objectif
Site de la mairie de Sauqueville (Next.js + Sanity), contenu géré via le Studio `/admin`.

## Fait
- Aperçu PDF des cartes « À noter » rendu en canvas (pdf.js) via `PdfThumbnail`, pour fonctionner sur mobile.

## En cours
- Vérification visuelle de l'aperçu PDF sur un vrai mobile.

## Prochaine étape
- Tester sur mobile (iOS Safari + Android Chrome) avec un PDF Sanity réel.

## Décisions (avec le pourquoi)
- pdf.js plutôt qu'iframe : les navigateurs mobiles n'affichent pas les PDF en iframe (bouton « Ouvrir » seul).
- Sur écran tactile, un clic ouvre le PDF dans le visionneur natif (nouvel onglet) ; la modale iframe reste pour le desktop.

## Points ouverts / blocages
- L'aperçu dépend du CORS du CDN Sanity (normalement `*`) : à confirmer en conditions réelles.
