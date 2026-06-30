# State Management — API des Contextes

L'app utilise deux contextes React indépendants, tous deux accessibles via un hook dédié.

---

## PlayerContext

**Fichier :** `src/context/PlayerContext.jsx`  
**Hook :** `usePlayers()`  
**Provider :** `<PlayerProvider>` (wrappé dans `main.jsx`)

Gère l'intégralité de l'état de jeu : joueurs, équipes, scores et options de jeu. Persiste automatiquement dans `localStorage` à chaque mutation.

### État exposé

| Valeur | Type | Description |
|---|---|---|
| `players` | `Player[]` | Liste de tous les joueurs |
| `teams` | `Team[]` | Liste de toutes les équipes |
| `isTeamMode` | `boolean` | Mode équipe activé ou non |
| `isNegativeScore` | `boolean` | Scores négatifs autorisés ou non |

### Fonctions — Joueurs

#### `addPlayer(playerName, teamId?)`
Ajoute un nouveau joueur. Le nom est automatiquement capitalisé. En mode équipe, `teamId` est requis.

```jsx
const { addPlayer } = usePlayers();
addPlayer("alice", "t1"); // → { id: "p1", name: "Alice", score: 0, team: "t1" }
```

#### `editPlayer(id, newName, newTeam?)`
Modifie le nom et/ou l'équipe d'un joueur en une seule opération atomique. `newTeam` est optionnel — si omis, l'équipe n'est pas modifiée.

```jsx
editPlayer("p1", "Alice", "t2"); // change nom ET équipe en un seul setState
```

#### `removePlayer(id)`
Supprime un joueur par son ID.

#### `addPoints(id, points)`
Ajoute `points` au score du joueur (valeur positive).

#### `removePoints(id, points)`
Soustrait `points` au score du joueur (valeur positive).

#### `movePlayer(id, teamId)`
Déplace un joueur vers une autre équipe.

#### `resetScores()`
Remet tous les scores à 0, conserve les joueurs et équipes.

#### `clearPlayers()`
Supprime tous les joueurs et équipes. Remet `isTeamMode` à `false`.

### Fonctions — Équipes

#### `addTeam()`
Crée une nouvelle équipe avec un ID auto-généré (`t1`, `t2`, ...) et un nom par défaut (`"Équipe 1"`, `"Équipe 2"`, ...).

#### `removeTeam(id)`
Supprime une équipe. Les joueurs de cette équipe sont réassignés à la première équipe restante. Si c'était la dernière équipe, `isTeamMode` repasse à `false`.

#### `teamMode(bool)`
Active ou désactive le mode équipe.
- **Activation** (`true`) : si aucune équipe n'existe, crée `t1` et `t2`. Distribue les joueurs existants alternativement entre les équipes.
- **Désactivation** (`false`) : supprime toutes les équipes, retire la propriété `team` de chaque joueur.

#### `shuffleEquipes()`
Redistribue aléatoirement tous les joueurs entre les équipes existantes.

#### `getPlayersByTeam(teamId)`
Retourne les joueurs appartenant à une équipe donnée.

```jsx
const { getPlayersByTeam } = usePlayers();
const playersInTeam1 = getPlayersByTeam("t1");
```

### Fonctions — Options

#### `allowNegativeScores(bool)`
Active ou désactive les scores négatifs. Persiste en localStorage.

---

## ThemeContext

**Fichier :** `src/context/ThemeContext.jsx`  
**Hook :** `useTheme()`  
**Provider :** `<ThemeProvider>` (wrappé dans `main.jsx`, au-dessus de `PlayerProvider`)

Gère le thème visuel de l'application (dark / light).

### État exposé

| Valeur | Type | Description |
|---|---|---|
| `theme` | `"dark" \| "light"` | Thème actif |

### Fonctions

#### `toggleTheme()`
Bascule entre `"dark"` et `"light"`. Met à jour `data-bs-theme` sur `<html>` et persiste dans `localStorage`.

### Exemple d'utilisation

```jsx
import { useTheme } from "../context/ThemeContext";

const MonComposant = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "Passer en clair" : "Passer en sombre"}
    </button>
  );
};
```

---

## Ajouter un nouveau paramètre global

Exemple : ajouter une limite de score maximale.

**1. Dans `PlayerContext.jsx` — ajouter le state :**
```js
const [maxScore, setMaxScore] = useState(null);

// Dans useEffect (chargement localStorage) :
const storedMaxScore = localStorage.getItem("maxScore");
if (storedMaxScore !== null) setMaxScore(JSON.parse(storedMaxScore));

// Fonction setter :
const updateMaxScore = (value) => {
  setMaxScore(value);
  if (value === null) localStorage.removeItem("maxScore");
  else localStorage.setItem("maxScore", JSON.stringify(value));
};
```

**2. Exposer dans le `value` du Provider :**
```js
value={{ ..., maxScore, updateMaxScore }}
```

**3. Utiliser dans `ModalOptions.jsx` :**
```jsx
const { maxScore, updateMaxScore } = usePlayers();
```
