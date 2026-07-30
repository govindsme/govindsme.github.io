# Agent Guide

## Goal
Build and publish a professional personal website for Govindarajan Vishnuchithan.

## Primary source files
- `assets/documents/govindarajan-vishnuchithan-master-resume.md`
- `assets/documents/memory.txt`
- `index.html`
- `about.html`
- `services.html`
- `resume.html`
- `contact.html`
- `blog/index.html`

## Page mapping
- `/` → `index.html`
- `/about.html` → `about.html`
- `/services.html` → `services.html`
- `/resume.html` → `resume.html`
- `/contact.html` → `contact.html`
- `/blog/index.html` → `blog/index.html`
- `/404.html` → `404.html` (GitHub Pages serves this automatically)
> Public resume PDFs are no longer linked from the website. Use the contact form to request a secure copy.

## Architecture (zero-build)
- Plain HTML + one stylesheet + one script. No frameworks, no npm, no build step.
- `assets/css/site.css` — complete design system (tokens, layout, components, print, reduced-motion).
- `assets/js/site.js` — vanilla interactions (mobile nav, reveals, counters, contact form).
- `assets/icons.svg` — SVG icon sprite. Use `<svg class="icon" aria-hidden="true"><use href="/assets/icons.svg#i-NAME"></use></svg>`.
- `assets/fonts/` — self-hosted variable fonts (Inter, Fraunces). Do not add webfont CDNs.
- `images/covers/` — branded blog covers; `images/og-card.png` — default social image.
- All internal URLs are root-relative (e.g. `/assets/css/site.css`, `/blog/index.html`).
- No inline styles; use existing utility classes (`mt-1/2/3`, `mb-3`, `text-muted`, `items-start`).

## Design tokens
- Colors and spacing are defined as CSS custom properties at the top of `site.css` (`:root`).
- Display font: Fraunces. Body font: Inter. Scale via `--step-*` tokens.
- Accessibility is required: `lang="en"`, skip link, focus-visible styles, `prefers-reduced-motion`, alt text, form labels.

## Publishing
- Use GitHub Pages from the repository root.
- No additional build is required.
- After content changes, refresh `lastmod` in `sitemap.xml`.

## Editing process
1. Update `assets/documents/govindarajan-vishnuchithan-master-resume.md` first.
2. Refresh page content to match the master resume.
3. Keep navigation and contact details consistent (same header/footer block on every page).
4. Record progress and next steps in `assets/documents/memory.txt`.
5. Maintain plain markdown and simple HTML for compatibility with any agent.

## Blog
- Blog posts live in `blog/YYYY-MM-slug.html` with a matching cover at `images/covers/YYYY-MM-slug.jpg`.
- Each post needs: breadcrumbs, tag chip, reading time, Article + BreadcrumbList JSON-LD, prev/next pager.
- Update `blog/index.html`, the homepage "Latest insights" section (if newer), and `sitemap.xml` when adding a post.
