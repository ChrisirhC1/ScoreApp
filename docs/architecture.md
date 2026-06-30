# Architecture

## Structure des fichiers

```
score-app/
├── index.html                          # Point d'entrée HTML + script anti-flash thème
├── vite.config.js                      # Config Vite (base: /ScoreApp/)
├── eslint.config.js                    # ESLint (prop-types désactivé, ignoreRestSiblings)
└── src/
    ├── main.jsx                        # Racine React — montage des Providers
    ├── App.jsx                         # Composant racine minimal
    ├── index.css                       # Thème global + variables CSS dark/light
    ├── App.css                         # Layout container
    ├── context/
    │   ├── PlayerContext.jsx           # État joueurs/équipes + localStorage
    │   └── ThemeContext.jsx            # État thème dark/light + localStorage
    ├── pages/
    │   └── Home.jsx                    # Page principale (layout en 3 lignes)
    └── components/
        ├── header/
        │   ├── Header.jsx              # Titre + boutons de contrôle
        │   └── header.css
        ├── footer/
        │   ├── Footer.jsx              # Bouton classement
        │   └── footer.css
        ├── playerCard/
        │   ├── PlayerCard.jsx          # Carte par joueur : score + +/- buttons
        │   └── playerCard.css
        ├── confetti/
        │   ├── Confetti.jsx            # Easter egg (clic sur le titre)
        │   └── confetti.css
        └── modal/
            ├── modalPlayerSetup/
            │   ├── ModalPlayerSetup.jsx    # Wrapper : switch solo/équipe
            │   ├── FormSetupSolo.jsx       # Formulaire mode solo
            │   └── FormSetupEquipe.jsx     # Formulaire mode équipe
            ├── modalMoreScore/
            │   ├── ModalMoreScore.jsx      # Score détaillé : ±1/2/5/10/100/1000
            │   └── modalMoreScore.css
            ├── modalClassement/
            │   └── ModalClassement.jsx     # Classement trié
            ├── modalConfirm/
            │   └── ModalConfirmReset.jsx   # Confirmation reset en 2 étapes
            └── modalOptions/
                └── ModalOptions.jsx        # Scores négatifs + toggle thème
```

---

## Arbre des composants

```
main.jsx
└── ThemeProvider          ← gère dark/light, applique data-bs-theme sur <html>
    └── PlayerProvider     ← gère joueurs, équipes, scores (localStorage)
        └── App
            └── Home       ← layout : Header / grille de cartes / Footer
                ├── Header
                │   ├── ModalPlayerSetup
                │   │   ├── FormSetupSolo      (mode solo)
                │   │   └── FormSetupEquipe    (mode équipe)
                │   ├── ModalConfirmReset      (reset en 2 étapes)
                │   ├── ModalOptions           (préférences)
                │   └── Confetti               (easter egg)
                ├── PlayerCard  ×N
                │   └── ModalMoreScore         (détail scores)
                └── Footer
                    └── ModalClassement        (classement trié)
```

---

## Flux de données

L'état global est centralisé dans `PlayerContext`. Il n'y a aucun appel réseau — tout passe par `localStorage`.

```
Action utilisateur (clic bouton)
        │
        ▼
  Composant appelle une fonction du contexte
  ex: addPoints(id, 1)
        │
        ▼
  PlayerContext met à jour le state React
  + écrit dans localStorage
        │
        ▼
  React re-render des composants abonnés
  via usePlayers()
```

### Données en localStorage

| Clé | Type | Contenu |
|---|---|---|
| `players` | JSON | Tableau de joueurs `Player[]` |
| `teams` | JSON | Tableau d'équipes `Team[]` |
| `isTeamMode` | JSON boolean | Mode équipe activé |
| `isNegativeScore` | JSON boolean | Scores négatifs autorisés |
| `theme` | string | `"dark"` ou `"light"` |

---

## Modèle de données

```ts
type Player = {
  id: string;       // ex: "p1", "p2", ...
  name: string;     // capitalisé automatiquement
  score: number;    // entier, peut être négatif selon option
  team?: string;    // ex: "t1" — présent uniquement en mode équipe
};

type Team = {
  id: string;       // ex: "t1", "t2", ...
  teamName: string; // ex: "Équipe 1"
};
```

### Génération des IDs

Les IDs sont générés par `getNewId(list, prefix)` dans `PlayerContext` :
- Commence à `p1` / `t1`
- Si l'ID est déjà pris (après suppression), incrémente jusqu'à trouver un ID libre
- Garantit l'unicité même après suppressions/réinsertions

---

## Comportements notables

### Mode équipe
- Activation : les joueurs existants sont répartis alternativement entre t1 et t2
- Désactivation : la propriété `team` est retirée de chaque joueur
- Suppression d'une équipe : les joueurs orphelins sont transférés vers la première équipe restante
- Si toutes les équipes sont supprimées : retour automatique en mode solo

### Delta de score (PlayerCard)
- Un compteur temporaire `totalScorePlus` s'accumule pendant 3 secondes
- Un `useRef` sur le timeout garantit que les clics rapides rallongent la durée d'affichage au lieu de la réinitialiser

### Scores négatifs
- Si l'option est désactivée et que `score + valeur < 0`, le score est ramené à 0 (pas bloqué, ramené)

### Reset en 2 étapes (ModalConfirmReset)
1. Étape 1 : "Voulez-vous réinitialiser ?" → Confirmer
2. Étape 2 : "Garder les mêmes joueurs ?" → Oui (reset scores) / Non (supprimer tout)
