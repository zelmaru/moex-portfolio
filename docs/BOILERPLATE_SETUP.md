# WXT Boilerplate Workarounds

- **Ecosystem Incompatibility**: `shadcn@latest` and `tailwind@latest` expect a standard modern Vite 6 SPA environment. WXT uses a custom extension bundler with isolated entry points, causing the Shadcn CLI tool matching to fail natively.
- **Shadcn CLI Framework Bypass**: Generated a temporary, empty `vite.config.js` at root to spoof a standard Vite setup. This forced the Shadcn CLI initializer to run successfully inside WXT before the file was deleted.
- **Legacy Preset Fix**: Manually converted modern theme preset properties back to legacy-compatible HSL variables inside `src/assets/styles/globals.css` to prevent rendering crashes.
