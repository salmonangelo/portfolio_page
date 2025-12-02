<<<<<<< HEAD
# Salmon Angelo S. — Portfolio

A minimal, front-end personal portfolio built with HTML5, Tailwind CSS (CDN) and vanilla JavaScript.

Project purpose: showcase projects, skills and contact info with accessible UI patterns — section-based navigation, modal project details, image carousel and responsive mobile navigation.

## Project structure
```
/project-root
├── index.html
├── css
│   └── custom.css
├── js
│   ├── main.js
│   ├── carousel.js
│   ├── modal.js
│   └── navHighlight.js
└── assets
    └── images
        ├── photo-placeholder.png
        ├── project-1-placeholder.png
        ├── project-2-placeholder.png
        ├── project-3-placeholder.png
        ├── carousel-1.png
        ├── carousel-2.png
        └── carousel-3.png
```

## Features
- Dark theme with red → violet accent gradient.
- Section-based navigation: Home, About, Skills, Projects, Contact.
- Navbar highlights active section on scroll (uses IntersectionObserver with fallback).
- Smooth scrolling for nav links.
- Responsive mobile menu with hamburger, aria-expanded and outside-click close.
- Project cards open a dynamically-created modal (focus trap, ESC to close, overlay click, animated).
- Reusable carousel with prev/next, autoplay (4s), pause on hover and indicator dots.
- All interactivity implemented with vanilla JS DOM manipulation.
- Tailwind CSS used via CDN (no build step).

## Setup & run (Windows)
1. Clone or copy the project to your machine.
2. Open the project folder in File Explorer.
3. Double-click `index.html` or run in terminal:
   - PowerShell: `start index.html`
   - CMD: `start index.html`
4. The site uses Tailwind via CDN; no npm install or build required.

## Development notes
- JS modules initialize on `DOMContentLoaded`. Keep script order:
  1. `js/navHighlight.js`
  2. `js/modal.js`
  3. `js/carousel.js`
  4. `js/main.js`
- Replace placeholder images in `assets/images/` with your real photos. Suggested filenames:
  - `photo-placeholder.png` → your portrait (used in Hero).
  - `project-1-placeholder.png`, etc. → project images.
  - `carousel-*.png` → carousel slides.
- To change accent colors, edit Tailwind utility classes in `index.html` (buttons, gradients) or tweak `css/custom.css`.

## Accessibility
- Mobile hamburger uses `aria-expanded` and the mobile menu closes on outside click.
- Modal includes `role="dialog"`, `aria-modal="true"`, ESC-to-close and a keyboard focus trap.
- Navigation links and controls include labels for screen readers.

## Customization tips
- Update displayed name to `SALMON ANGELO S.` in `index.html`.
- Update project details in `modal.js` or extend the modal generation to load real project data.
- Add more project cards to `#projects-grid` using `data-project="id"` and `.open-project` buttons.

## License
MIT — feel free to reuse and modify.
=======
# portfolio_page
A minimal, front-end personal portfolio built with HTML5, Tailwind CSS (CDN) and vanilla JavaScript.
>>>>>>> e0fd8c64224c03719433109bb5b6c3390d4fb58e
