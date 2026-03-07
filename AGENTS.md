# Agents Guide — Construisons Montréal website-frontend

- The frontend uses `gatsby-source-strapi`. The backend URL is in `.env`.

Requirements
- Node.js v16 or higher (LTS recommended).

Repository layout (important folders)
- `src/` — frontend source code.
- `static/` — static files and redirects.
- `assets/`, `images/`, `locales/` — media and translations.

Setup
1. Copy environment example and fill values:

```sh
cp .env.example .env
# edit .env and add STRAPI_TOKEN plus any other required values
```

- The frontend requires a Strapi backend to provide content. You can run the backend locally (see backend repo) or use a hosted instance.
- You must provide a Full-access `STRAPI_TOKEN` (from the backend admin) in `.env` so the frontend can fetch content.

Important notes for agents running the site
- In the backend, every content type must have at least one entry and it must be published — otherwise Gatsby will fail during build/develop.
- Images must include alt text.
- If you see errors while developing, try removing `/.cache` and `public/` then re-run the develop command to surface missing content or schema issues.

Common commands
- Install dependencies:

```sh
npm install
```

- Start in development mode:

```sh
npm run develop
```

- Rebuild after content changes (clean then develop):

```sh
npm run clean && npm run develop
```

Local URL
- The site runs at: http://localhost:8000 when `npm run develop` is active.

Backend
- The frontend depends on the website backend for content. See the backend repository for setup instructions and how to create API tokens and content types.

Troubleshooting
- Missing content type entries or unpublished items typically cause GraphQL or build errors.
- Deleting `/.cache` and `public/` and re-running `npm run develop` often helps isolate the remaining issues.
