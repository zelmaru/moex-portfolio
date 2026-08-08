# WXT Boilerplate Workarounds

* **Versions**: WXT is not compatible with the latest versions of Tailwind and Shadcn, therefore the setup uses Tailwind v3 (`^3.4.17`) and Shadcn v2 (`2.3.0`).
* **Vite Config Hack**: The Shadcn CLI does not recognize WXT. A temporary, empty `vite.config.js` was created at the root level to force the CLI to install, and was then deleted.
* **CLI & CSS Preset Fix**: The preset and components were pulled using `shadcn@latest`. Because the latest CLI outputs Tailwind v4 code by default, it generated color tokens using `oklch()` wrappers and modern utilities (like `@apply outline-ring/50`). This required a manual rewrite of `src/assets/styles/globals.css` to convert those values back into legacy HSL raw data triplets (`222.2 84% 4.9%`) so Tailwind v3 can compile them successfully.
* **Configuration Downgrade**: The `components.json` file was downgraded to a legacy format compatible with Shadcn v2. This forces the CLI to download component code built for Tailwind v3 utility classes instead of v4.
