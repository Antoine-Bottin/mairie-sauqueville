# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commandes

```bash
npm run dev      # Démarrage du serveur de développement (Turbopack)
npm run build    # Build de production
npm run lint     # ESLint sur src/
npx tsc --noEmit # Vérification TypeScript sans émettre de fichiers
```

Pas de tests automatisés dans ce projet.

## Stack

- **Next.js 16.2.6** (App Router, React 19, TypeScript, SCSS)
- **Sanity CMS v5** — Studio embarqué à `/admin`, schémas dans `src/sanity/schemaTypes/`
- **Vercel Blob** — stockage des PDFs uniquement (plus les photos d'événements, migrées vers Sanity)
- **Vercel** — déploiement, variables d'environnement de production

## Architecture

### Données et CMS

Toutes les requêtes Sanity passent par `src/sanity/lib/queries.ts`. Deux schémas actifs :

- `evenement` — utilisé de deux façons selon la date :
  - `getEvenements()` → événements futurs (section "Évènements à venir")
  - `getRetoursSur()` → événements passés **avec** le champ `galerie` renseigné (section "Retour sur"). Pour faire apparaître un retour sur, il suffit d'ajouter des photos dans le champ `galerie` d'un événement passé dans le Studio — pas de code à toucher.
- `alerte` — bandeau d'alerte affiché en haut du site si `isActive == true`

### PDFs / Documents

Route dynamique unique `src/app/documents/[slug]/page.tsx` configurée par `src/app/documents/documentsConfig.ts`. Pour ajouter une nouvelle catégorie de documents : ajouter une entrée dans `documentCategories` + un lien dans `navigationLinks.ts`. Les anciens chemins `/mairie/comptes-rendus`, `/mairie/urbanisme`, `/mairie/autres-documents` redirigent en 308 vers `/documents/...` (défini dans `next.config.ts`).

### Navigation

`src/app/components/Navbar/navigationLinks.ts` — source unique pour desktop et mobile. La Navbar, le Footer et l'AlertBanner sont chacun enveloppés dans un `*Wrapper` client (`NavbarWrapper`, `FooterWrapper`, `AlertBannerWrapper`) qui les masque sur `/admin` via `usePathname`.

### Données statiques

`src/app/data.tsx` — membres du conseil municipal, horaires de la mairie, permanence numérique. `src/app/utils.ts` — algorithme de collecte des déchets (hardcodé pour 2026, à mettre à jour en 2027) et formateurs de dates.

### Couleurs et styles

Variables CSS dans `src/app/globals.scss`. Toujours utiliser les variables (`var(--primary-color)`, `var(--primary-color-rgb)`, etc.) — ne jamais coder de couleurs en dur. Les variables `*-rgb` permettent `rgba(var(--x-rgb), alpha)`.

### PhotoCard

`src/app/components/PhotoCard/PhotoCard.tsx` — composant réutilisable qui rend une miniature cliquable + une modale plein écran (`<dialog>`). Utilisé dans `FeatureCard` (carrousel) et `CalendarCard` (photo de couverture). Accepte `customWrapperClass` et `customImageClass` pour s'adapter à n'importe quel conteneur.
