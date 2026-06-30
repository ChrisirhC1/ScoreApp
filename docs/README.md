# Documentation — ScoreApp

ScoreApp est une application web de suivi de scores pour jeux entre amis, développée en React + Vite et déployée sur GitHub Pages.

**URL de production :** https://ChrisirhC1.github.io/ScoreApp/

---

## Table des matières

| Fichier | Contenu |
|---|---|
| [architecture.md](./architecture.md) | Structure du projet, arbre des composants, flux de données |
| [state.md](./state.md) | API complète de `PlayerContext` et `ThemeContext` |
| [theming.md](./theming.md) | Système de thème dark/light, variables CSS |
| [development.md](./development.md) | Commandes, workflow, déploiement |

---

## Stack technique

| Outil | Version | Rôle |
|---|---|---|
| React | 18.3 | UI |
| Vite | 6 | Bundler / dev server |
| Bootstrap | 5.3 | Styles de base |
| React-Bootstrap | 2.10 | Composants Bootstrap pour React |
| react-confetti | 6.2 | Easter egg confettis |
| gh-pages | 6.3 | Déploiement GitHub Pages |

## Fonctionnalités

- **Mode Solo** — suivi des scores par joueur individuel
- **Mode Équipe** — regroupement des joueurs par équipe avec score collectif
- **Ajout de points** — +/- 1 depuis la carte, ou ±1/2/5/10/100/1000 dans la modal détail
- **Score exact** — clic sur le score dans la modal pour le modifier directement
- **Classement** — tri automatique par score (individuel ou par équipe)
- **Reset** — remise à zéro des scores ou suppression totale des joueurs
- **Options** — scores négatifs autorisés ou non, thème dark/light
- **Persistance** — toutes les données et préférences survivent au rechargement (localStorage)
