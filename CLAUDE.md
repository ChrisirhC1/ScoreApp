# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

ScoreApp is a React scoreboard web app for tracking player/team scores in games. It is deployed to GitHub Pages at `https://ChrisirhC1.github.io/ScoreApp/`. All app source lives under `score-app/`.

## Commands

All commands must be run from `score-app/`:

```bash
cd score-app
npm run dev       # Start dev server (Vite)
npm run build     # Production build → dist/
npm run lint      # ESLint check
npm run preview   # Preview production build locally
npm run deploy    # Build + publish to GitHub Pages via gh-pages
```

No test suite exists in this project.

## Architecture

State is centralized in a single React Context: `src/context/PlayerContext.jsx`. It is the only place where players and teams are read/written. All components consume it via the `usePlayers()` hook. State is persisted automatically to `localStorage` on every mutation — no backend or API calls.

**Data model**
- `players[]` — `{ id, name, score, team? }` (team field only present in team mode)
- `teams[]` — `{ id, teamName }`
- `isTeamMode` — boolean toggled by `teamMode(bool)` in context
- `isNegativeScore` — boolean controlling whether scores can go below 0

**Component tree**
```
App → Home
  ├── Header           (controls: new game, options, reset + collapses into ➕ button)
  │     ├── ModalPlayerSetup → FormSetupSolo / FormSetupEquipe
  │     ├── ModalConfirmReset
  │     ├── ModalOptions
  │     └── Confetti   (easter egg triggered by clicking "Score App" title)
  ├── PlayerCard[]     (per player: +/- 1 buttons, score display, delta animation)
  │     └── ModalMoreScore  (score increment options: ±1/2/5/10/100/1000, click-to-edit exact score)
  └── Footer
```

**Key behaviors**
- In team mode, `Home` groups `PlayerCard` components under `<h2>` team headings using `getPlayersByTeam(team.id)`.
- `PlayerCard` shows a transient "+N" / "-N" delta overlay that disappears after 3 seconds (via `useRef`-managed timeout).
- `ModalMoreScore` opens when the player name is clicked; score value is also click-to-edit inline.
- Vite `base` is set to `/ScoreApp/` for correct asset paths on GitHub Pages.

## Styling

Bootstrap 5 + React-Bootstrap are used for layout and UI components. Each component has a co-located `.css` file for overrides. No CSS preprocessor.
