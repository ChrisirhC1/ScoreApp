# Système de thème

L'app supporte deux thèmes — **dark** (par défaut) et **light** — qui basculent sans rechargement de page.

---

## Fonctionnement

Le thème repose sur l'attribut HTML `data-bs-theme` positionné sur `<html>` :

```html
<html data-bs-theme="dark">   <!-- ou "light" -->
```

Bootstrap 5.3 lit cet attribut nativement et ajuste ses propres composants (modals, tables, formulaires, etc.). En parallèle, nos variables CSS `--c-*` sont redéfinies dans des sélecteurs `[data-bs-theme="dark"]` / `[data-bs-theme="light"]` dans `index.css`.

**Flux de changement de thème :**
```
Utilisateur clique le switch dans Options
        │
        ▼
ThemeContext.toggleTheme()
        │
        ▼
document.documentElement.setAttribute("data-bs-theme", newTheme)
localStorage.setItem("theme", newTheme)
        │
        ▼
CSS : [data-bs-theme="..."] { --c-bg: ...; --c-surface: ...; ... }
Bootstrap relit ses propres variables → tous les composants s'adaptent
Nos composants utilisent var(--c-*) → s'adaptent aussi
        │
        ▼
Transition CSS 0.3s ease sur body et les cartes → animation fluide
```

**Anti-flash au chargement :** un script inline dans `index.html` lit `localStorage` et applique `data-bs-theme` *avant* que React se monte, évitant tout flash de thème incorrect.

```html
<script>
  (function () {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', t);
  })();
</script>
```

---

## Variables CSS personnalisées

Toutes les variables sont définies dans `src/index.css` sous les sélecteurs de thème.

| Variable | Dark | Light | Usage |
|---|---|---|---|
| `--c-bg` | `#0d0d1a` | `#f0f2ff` | Fond de la page |
| `--c-surface` | `#141428` | `#ffffff` | Fond modals |
| `--c-surface-2` | `#1a1a35` | `#f8f9ff` | Fond cartes joueurs |
| `--c-border` | `rgba(139,92,246,.2)` | `rgba(124,58,237,.18)` | Bordures |
| `--c-text` | `#e2e8f0` | `#1e293b` | Texte principal |
| `--c-text-muted` | `#94a3b8` | `#64748b` | Texte secondaire |
| `--c-accent` | `#7c3aed` | `#7c3aed` | Violet principal |
| `--c-accent-2` | `#06b6d4` | `#0891b2` | Cyan secondaire |
| `--c-glow` | `rgba(124,58,237,.35)` | `rgba(124,58,237,.18)` | Halos/ombres colorés |
| `--c-shadow` | `rgba(0,0,0,.55)` | `rgba(0,0,0,.10)` | Ombres neutres |
| `--c-success` | `#10b981` | `#059669` | Vert (boutons +) |
| `--c-danger` | `#ef4444` | `#dc2626` | Rouge (boutons -) |

---

## Ajouter un troisième thème

Exemple pour un thème "Nuit bleue" :

**1. Dans `index.css` :**
```css
[data-bs-theme="blue"] {
  --c-bg:        #0a0f1e;
  --c-surface:   #0d1526;
  --c-surface-2: #111e33;
  --c-border:    rgba(59, 130, 246, 0.25);
  --c-text:      #dbeafe;
  --c-text-muted: #93c5fd;
  --c-accent:    #3b82f6;
  --c-accent-2:  #06b6d4;
  --c-glow:      rgba(59, 130, 246, 0.35);
  --c-shadow:    rgba(0, 0, 0, 0.6);
  --c-success:   #10b981;
  --c-danger:    #ef4444;

  --bs-body-bg:    var(--c-bg);
  --bs-body-color: var(--c-text);
  --bs-primary:    var(--c-accent);
  /* ... autres overrides Bootstrap */
}
```

**2. Dans `ThemeContext.jsx` — étendre le cycle :**
```js
const toggleTheme = () =>
  setTheme((prev) => {
    if (prev === "dark") return "light";
    if (prev === "light") return "blue";
    return "dark";
  });
```

**3. Dans `ModalOptions.jsx` — adapter le label :**
```jsx
const labels = { dark: "🌙 Sombre", light: "☀️ Clair", blue: "🌊 Nuit bleue" };
// ...
<span>{labels[theme]}</span>
```

---

## Règles CSS — structure de `index.css`

```
index.css
├── :root                          → Fonts, line-height, rendu texte
├── [data-bs-theme="dark"] { }    → Variables dark + overrides Bootstrap dark
│   ├── body                       → Gradient de fond dark
│   ├── .form-control / select     → Inputs dark (Bootstrap ne les gère pas seul)
│   └── .btn-light / dark / secondary  → Boutons spécifiques dark
├── [data-bs-theme="light"] { }   → Variables light + overrides Bootstrap light
│   ├── body                       → Gradient de fond light
│   └── .form-control:focus        → Focus ring light
└── Styles partagés (utilisent var(--c-*))
    ├── body                       → background-color + transition
    ├── ::-webkit-scrollbar        → Scrollbar violette
    ├── .form-check-input:checked  → Switch accent
    ├── .btn / .btn-success / .btn-danger / .btn-info / .btn-primary
    ├── .modal-content
    ├── .table
    └── .list-group-item
```
