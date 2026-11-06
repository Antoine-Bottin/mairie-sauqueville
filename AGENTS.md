<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Flow de release (git)

Deux branches : `develop` (travail + Preview Vercel) et `main` (production Vercel, www.sauqueville.fr). La branche `production` n'existe plus. **Tout push sur `main` déploie en production.**

## 1. Développer (sur `develop`)

```bash
git checkout develop
git add .
git commit -m "feat(scope): description"
git push origin develop   # Vercel génère un lien de Preview
```

## 2. Publier une version (merge sur `main` + tag)

D'abord, sur `develop`, aligner la version de `package.json` (et `package-lock.json`) sur le futur tag, puis pousser :

```bash
git checkout develop
npm version 1.0.0 --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: aligner la version de package.json sur 1.0.0"
git push origin develop
```

Puis merger sur `main` et taguer :

```bash
git checkout main
git merge develop --no-ff -m "Release v1.0.0"
git tag -a v1.0.0 -m "Version 1.0.0 - description de la version"
git push origin main --tags   # déploie en production
git checkout develop
```

- Le tag est posé sur le commit de merge de `main`.
- Un merge sans tag (simple synchro) reste possible : `chore: synchro de develop vers main`, mais il déploie aussi en production.
- Ne jamais committer directement sur `main` : toujours passer par `develop`.
