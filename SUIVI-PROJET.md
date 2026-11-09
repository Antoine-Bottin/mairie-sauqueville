# SUIVI-PROJET
_Dernière mise à jour : 2026-11-09_

## Objectif
Site de la mairie de Sauqueville (Next.js + Sanity), contenu géré via le Studio `/admin`.

## Fait
- Aperçu PDF testé sur Chrome mobile : OK (v1.2.1).
- Aperçu PDF des cartes « À noter » rendu en canvas (pdf.js) via `PdfThumbnail`, pour fonctionner sur mobile.

## En cours
- Refonte design, branche `feat/refonte-design` (commitée, pas encore mergée dans `develop`) : phases 1, 2 et 3 faites (variables « silex & lin », Bricolage Grotesque, Hero à lettres découpées, accueil en bandes craie/silex/lin, cartes à bord franc via le mixin `src/app/card.scss`, Footer en silex) ; espacements resserrés (page d'accueil ≈ −17 % de hauteur) et titre du Hero sur une seule ligne en mobile ; bandeau d'alerte en aplats (colza/lin/rouge), Navbar à filet silex, cartes intérieures au nouveau style, focus clavier global ; textes tronqués avec « Lire + » (composant `ReadMore`, modale animée) sur évènements, retours et annonces ; galerie photo en grille adaptative + visionneuse à navigation (`PhotoGallery`) à la place du slider.
- Vérification de l'aperçu PDF sur iOS Safari (Chrome OK).

## Prochaine étape
- Valider la refonte en local avec `BLOB_READ_WRITE_TOKEN` (pages Documents et « Sauqueville avant » non vérifiées visuellement), puis commit de `feat/refonte-design`, merge dans `develop`, release (flow dans `AGENTS.md`).
- Vérifier sur mobile réel : Hero, menu burger, focus clavier ; passer un outil d'audit (axe / Lighthouse).

## Décisions (avec le pourquoi)
- pdf.js plutôt qu'iframe : les navigateurs mobiles n'affichent pas les PDF en iframe (bouton « Ouvrir » seul).
- Sur écran tactile, un clic ouvre le PDF dans le visionneur natif (nouvel onglet) ; la modale iframe reste pour le desktop.

- Direction « Silex & lin » (craie #f4f6f3, silex #0f1b26, lin #1f4fd1, colza #f5c400) : ancrée dans le territoire (falaises, silex, lin, colza) ; remplace crème + vert forêt jugé générique. Noms de variables CSS conservés pour que tout le site bascule.
- Un seul moment « waouh » (Hero), le reste sobre et contrasté.

## Points ouverts / blocages
- L'aperçu dépend du CORS du CDN Sanity (normalement `*`) : à confirmer en conditions réelles.
