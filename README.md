# DavidFLIX

Browse trending movies and TV shows, watch trailers, and search titles and
people. A MERN app (MongoDB, Express 5, React 18, Node) on top of the
[TMDB](https://www.themoviedb.org/) API, styled with the IWD LABS design system.

## Setup

Copy `.env.sample` to `.env` and fill it in:

```bash
PORT=5000
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_read_access_token   # the v4 "API Read Access Token", sent as a Bearer token
```

## Run it locally

Two terminals:

```bash
npm install && npm run dev          # API on http://localhost:5000
npm install --prefix frontend
npm run dev:frontend                # app on http://localhost:5173 (proxies /api to :5000)
```

## Production

```bash
npm run build                       # installs everything and builds frontend/dist
npm start                           # with NODE_ENV=production, Express serves the built app
```

## API

All routes except auth require the `jwt-davidflix` cookie set by sign-up or login.

| Route | Purpose |
|---|---|
| `POST /api/v1/auth/signup` · `login` · `logout` | Account |
| `GET /api/v1/auth/authCheck` | Current user |
| `GET /api/v1/{movie,tv}/trending` | One random trending title |
| `GET /api/v1/{movie,tv}/:category` | `now_playing`, `top_rated`, `popular`, `upcoming` / `airing_today`, `on_the_air`, … |
| `GET /api/v1/{movie,tv}/:id/{details,trailers,similar}` | Title page data |
| `GET /api/v1/search/{movie,tv,person}/:query` | Search; saves the top hit to history |
| `GET /api/v1/search/history` · `DELETE /api/v1/search/history/:id` | Search history |

## Design

- **Tokens** live in `frontend/src/styles/tokens/`, copied from the IWD LABS
  Design System. Tailwind (`frontend/tailwind.config.js`) maps onto them, and
  shared component classes (`.btn-primary`, `.field`, `.card`, `.eyebrow`,
  `.badge`, `.tab`) are in `frontend/src/index.css`.
- **Light and dark.** Light is the default; the header toggle adds `.iwd-dark`
  to `<html>` and remembers the choice. The home-screen hero is always a dark
  band because it sits on movie key art.
- **Type and icons:** Anek Bangla (expanded for headings) and Material Symbols
  Rounded, filled.

### Logo and assets

The wordmark is set in **Anek Bangla Expanded ExtraBold** and converted to
outlines, so the SVGs render without the font. The first D carries a red play
triangle in its counter, which is the logo's one red mark. "DAVID" takes the ink
colour, "FLIX" azure. The mark is the same D inside an azure circle.

| File (`frontend/public/`) | Use |
|---|---|
| `logo-light.svg` / `logo.svg` | Wordmark on light / dark surfaces |
| `logo-mark.svg`, `favicon.svg` | Badge mark, favicon |
| `brand/logo-lockup-{light,dark}-bg.svg` | Mark + wordmark lockups |
| `brand/logo-wordmark-{light,dark}-bg.svg` | Wordmark masters |
| `brand/app-icon.svg` | 512px squircle app icon |
| `avatar1–3.svg`, `avatar-kids.svg` | Profile avatars |
| `illustrations/screen.svg`, `devices.svg` | Landing-page illustrations |
| `textures/dot-field*.svg` | 18px dot-field texture, light and dark |
