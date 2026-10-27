# NOIR: Modern Dining (fictional portfolio demo)

A single-page website for **NOIR**, a made-up upscale restaurant. It is a design and front-end portfolio project. NOIR is not a real business, and all addresses, reviews, prices and menu items are sample content.

## Features
- Cinematic hero with staggered headline reveal and a mouse-responsive 3D plate (CSS 3D layers, no WebGL, so it stays light)
- Editorial story section, alternating signature dishes, scroll reveals
- Interactive tabbed menu (Starters, Main Courses, Desserts, Drinks)
- Gallery with keyboard-friendly lightbox (Esc, Previous, Next)
- Reservation form with validation, loading and success states
- Responsive layout (desktop, tablet, mobile) with a slide-down mobile menu
- Accessible: semantic HTML, skip link, focus states, ARIA on tabs and dialog
- Respects `prefers-reduced-motion`; tilt is disabled on touch

## Tech stack
React 18, Vite 5, plain CSS (custom properties). No other runtime dependencies.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Build
```bash
npm run build      # outputs /dist
npm run preview    # serve the production build
```
The project is configured for GitHub Pages at `/noir-restaurant/`. The deployment workflow publishes the `main` branch automatically.

## Structure
```
index.html          fonts + metadata
main.jsx            entry point
App.jsx             content data + all section components
styles.css          design tokens, layout, responsive rules
```

## Demo vs. production
| Feature | Status |
|---|---|
| Reservation form | **Simulated.** Needs a backend (API, database, email, availability logic) |
| Menu, reviews, hours, address | Hard-coded sample data |
| Map | Placeholder. Embed a real map for a real business |
| Food visuals | SVG illustrations. Replace with real photography (use `.webp`, add `loading="lazy"`) |

## Screenshots
_Placeholders: add your own captures to `/screenshots`._
- [ ] Hero (desktop)
- [ ] Menu (desktop)
- [ ] Mobile layout

## Customising
Change colours and fonts in `:root` in `src/styles.css`. Edit `MENU`, `SIGNATURES`, `GALLERY` and `REVIEWS` at the top of `src/App.jsx`.
