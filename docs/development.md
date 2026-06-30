# Guide de développement

## Prérequis

- Node.js 18+
- npm 9+

---

## Installation

```bash
cd score-app
npm install
```

---

## Commandes

Toutes les commandes sont à lancer depuis le dossier `score-app/`.

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite (hot reload) |
| `npm run build` | Build de production → `dist/` |
| `npm run preview` | Prévisualise le build de production en local |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run deploy` | Build + déploiement sur GitHub Pages |

---

## Déploiement

L'app est déployée sur GitHub Pages via le package `gh-pages`.

```bash
npm run deploy
```

Ce script exécute `predeploy` (= `npm run build`) puis publie le dossier `dist/` sur la branche `gh-pages` du dépôt.

**URL de production :** https://ChrisirhC1.github.io/ScoreApp/

Le `base` Vite est configuré à `/ScoreApp/` dans `vite.config.js` pour que les assets soient correctement résolus sur GitHub Pages.

---

## Ajouter une fonctionnalité

### Nouveau paramètre dans Options

1. Ajouter le state dans `PlayerContext` (ou `ThemeContext` si c'est visuel)
2. Persister dans `localStorage` (voir pattern existant dans `PlayerContext.jsx`)
3. Ajouter un `Form.Check` dans `ModalOptions.jsx`

### Nouveau type de score

Les options de score dans `ModalMoreScore` sont définies comme constante de module :

```js
// ModalMoreScore.jsx
const SCORE_OPTIONS = [1, 2, 5, 10, 100, 1000];
```

Modifier ce tableau suffit à ajouter ou retirer des valeurs.

### Nouveau composant

Conventions à respecter :
- Fichier JSX + CSS co-localisés dans un sous-dossier de `components/`
- Consommer le contexte via `usePlayers()` directement dans le composant, sans prop drilling
- Ne pas importer `React` (nouveau JSX transform — inutile)
- Utiliser `var(--c-*)` pour toutes les couleurs afin de supporter les deux thèmes

---

## ESLint

Configuration dans `score-app/eslint.config.js`.

**Règles notables :**
- `react/prop-types: off` — pas de TypeScript, les PropTypes ajoutent de la verbosité sans bénéfice
- `no-unused-vars: ['error', { ignoreRestSiblings: true }]` — autorise le pattern `{ team, ...rest }` pour omettre une propriété
- `react-refresh/only-export-components: warn` — avertissement sur les fichiers qui exportent des hooks + composants (cas de `PlayerContext.jsx`)

---

## Dépendances remarquables

### `react-confetti`
Utilisé uniquement pour l'easter egg (clic sur "Score App" dans le header). La taille de la fenêtre est suivie via un `resize` event listener pour que les confettis couvrent toujours tout l'écran.

### `gh-pages`
Déploiement. Ne nécessite pas de configuration CI — le déploiement est manuel via `npm run deploy`.

### `bootstrap` + `react-bootstrap`
Bootstrap 5.3 est importé comme CSS pur dans `main.jsx`. React-Bootstrap fournit les composants (`Button`, `Modal`, `Form`, `Card`, etc.). Ne pas importer Bootstrap JS — React-Bootstrap le remplace.

---

## Points d'attention

### localStorage et hydratation
Le `useEffect` d'initialisation dans `PlayerContext` ne s'exécute qu'une fois au montage. Si `localStorage` est vide, l'app démarre avec un state vide (aucun joueur). C'est le comportement attendu.

### IDs non réinitialisés après suppression
Après suppression d'un joueur `p3`, le prochain joueur ajouté sera `p4` (pas `p3`). C'est intentionnel — `getNewId` garantit l'unicité et évite les collisions avec des données éventuellement encore en localStorage.

### Thème et flash
Le script inline dans `index.html` applique `data-bs-theme` avant que React charge. Ne pas supprimer ce script sous peine d'un flash de thème incorrect au premier chargement sur GitHub Pages (réseau lent).

### Mode équipe et toggle
Quand on active le mode équipe alors que des équipes existent déjà (ex : retour arrière via toggle), les joueurs sont redistribués entre les équipes existantes — ils ne gardent pas leur ancienne équipe.
