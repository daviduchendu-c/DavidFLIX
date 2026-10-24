# Design tokens

These files are copied verbatim from the IWD LABS Design System
(`IWD Website/IWD LABS Design System/tokens/`). Treat them as read-only here and
re-copy them when the system changes, so DavidFLIX stays in step with the rest of
the brand.

`fonts.css` is not copied: its remote `@import` must be the first rule in a
stylesheet, so the same Google Fonts URL is loaded with a `<link>` in
`index.html` instead.

DavidFLIX is light-first like the system. Dark mode adds `.iwd-dark` to `<html>` (see `src/store/theme.js`), and the home-screen hero band is always a scoped `.iwd-dark` block because it sits on movie key art.

`texture.css` is a DavidFLIX addition: the background grid with a vignette
(`.grid-field` in `src/index.css`). It replaces the system's 18px dot field, and its
vignette is a gradient used as a mask, a deliberate divergence from the system's
no-gradient rule.
