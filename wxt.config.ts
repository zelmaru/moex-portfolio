import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  // Correct structural mapping for ESLint v9 flat config generation
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  manifest: {
    permissions: ['sidePanel'],
    action: {
      default_popup: '', // prevent popup from overriding side panel - empty string required
    },
  },
});
