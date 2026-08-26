# Anukriti Tripathi — Portfolio

A personal portfolio and design studio site, built from scratch as a
frontend-learning project. Design across digital and physical products.

## Stack

- Next.js (App Router) + React + TypeScript
- Hand-rolled design-token system with four switchable themes
- MDX content architecture — case studies, playground experiments, field
  notes, and studio items all live in `content/`

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Adding content

| Content | Where | Notes |
|---|---|---|
| Case study | `content/projects/your-slug.mdx` | Copy `_template.mdx`; slug becomes the URL |
| Experiment | `content/playground/your-slug.mdx` | Category drives the filter bar |
| Field note | `content/blog/your-slug.mdx` | Reading time is automatic |
| Studio plate | `content/studio/your-slug.mdx` | Images in `public/images/studio/` |

No component edits required — ever.

## Themes

Design tokens live in `styles/tokens.css`; the theme registry is
`lib/themes.ts`. A new theme = one CSS block + one registry entry.

## Personal links

Edit `lib/site.ts` — email, socials, resume path. Set
`NEXT_PUBLIC_SITE_URL` in your hosting dashboard to the production domain so
canonical URLs and the sitemap are correct.
