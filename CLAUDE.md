# CLAUDE.md

## Project

HP for **asawo** (Arthur Lechte). Built with Astro, deployed to GitHub Pages at `https://asawo.github.io`.

## Stack

- **Framework:** Astro (static output)
- **Package manager:** pnpm
- **Language:** TypeScript
- **3D:** Three.js (wireframe hero scene)

## Commands

- `pnpm dev` — local dev server
- `pnpm build` — production build (output: `dist/`)
- `pnpm preview` — preview production build

## Project structure

```
src/
  layouts/Base.astro    — shell: nav, theme toggle, footer
  pages/index.astro     — landing page (hero canvas + intro)
  scripts/scene.ts      — Three.js wireframe scene
  scripts/constants.ts  — shared constants (DARK/LIGHT)
  styles/global.css     — design tokens, reset, base styles
public/
  assets/               — static files (resume.pdf, etc.)
```

## Design

- **Aesthetic:** terminal / Bauhaus — monospace font, clean geometry, minimal color
- **Tokens:** defined in `global.css` using `oklch` with `light-dark()` for automatic theme support
- **Accent color:** warm red/orange (`--color-accent`)
- **Prompt pattern:** `>` in accent color used as a recurring motif (nav, headings, links, footer)
- Keep styling simple — no heavy borders or decorative flourishes
- Links use the `> link` terminal prompt pattern
- Static assets go in `public/` (not `src/assets/`)
- Verify changes with `pnpm build`

## Commit conventions

Use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>: <short summary>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `test`

- Subject line: imperative mood, lowercase, no period, max 72 chars
- Body (optional): separate with blank line, explain *why* not *what*
