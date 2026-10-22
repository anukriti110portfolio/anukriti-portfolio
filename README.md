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

### Long-form playground pages

Add `layout: wide` to a playground entry's frontmatter to get the editorial
layout (label on the left, content on the right). Build the page from these
blocks — see `content/playground/anda-cracker.mdx` for a full example:

| Block | Use |
|---|---|
| `<Section title="…">` | A labelled row; put normal markdown inside, with blank lines around it |
| `<Lead>…</Lead>` | One larger intro line |
| `<Spread images={[…]} cols={3} ratio="4 / 3" fit="contain" />` | Image grid; `fit` is `contain` (never crops), `cover` or `natural` |
| `<Facts items={[…]} cols={3} />` | Titled notes, each with optional text, bullets and images |
| `<Steps items={[…]} />` | Numbered `{ title, text }` steps |
| `<Flow items={["A", "B"]} />` | A short sequence: A → B |

Images live in `public/images/playground/<slug>/`. Add `date: "YYYY-MM-DD"` to
control the order on the Playground page (newest first).

## Themes

Design tokens live in `styles/tokens.css`; the theme registry is
`lib/themes.ts`. A new theme = one CSS block + one registry entry.

## Personal links

Edit `lib/site.ts` — email, socials, resume path. Set
`NEXT_PUBLIC_SITE_URL` in your hosting dashboard to the production domain so
canonical URLs and the sitemap are correct.
