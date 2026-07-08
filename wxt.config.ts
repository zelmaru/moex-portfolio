import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    permissions: ['sidePanel'],
    action: {
      default_popup: '', // prevent popup from overriding side panel - empty string required
    },
  },
});
