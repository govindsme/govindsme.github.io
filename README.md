# govindsme.github.io

Professional website for Govindarajan Vishnuchithan — Global VP of Platform Engineering & CISO.
Static site hosted on GitHub Pages with a zero-build vanilla architecture.

## Site structure
- `index.html` — homepage (hero, metrics, expertise, featured book, timeline, latest posts)
- `about.html` — profile, career history, certifications, education, awards
- `services.html` — advisory service offerings
- `resume.html` — full web resume (print-friendly)
- `contact.html` — contact form (Formspree) and channels
- `blog/index.html` + 9 dated posts — engineering leadership insights
- `404.html` — custom not-found page

## Assets
- `assets/css/site.css` — the entire design system (tokens, components, responsive, print)
- `assets/js/site.js` — all interactions (no dependencies)
- `assets/icons.svg` — SVG icon sprite (`#i-*` symbols)
- `assets/fonts/` — self-hosted Inter + Fraunces variable fonts
- `assets/documents/` — master resume (source of truth) and working memory
- `images/` — headshot, branded blog covers, social card

## Publishing
- The site is static and requires no build step.
- GitHub Pages publishes from the repository root on `main`.
- Local preview: `python3 -m http.server` from the repo root, then open `http://localhost:8000`.

## Agent-friendly guidance
- Use `assets/documents/govindarajan-vishnuchithan-master-resume.md` as the source of truth for resume content.
- Update `assets/documents/memory.txt` with progress and next steps.
- Keep navigation consistent across pages. Public resume PDFs are never linked; use the contact workflow.
