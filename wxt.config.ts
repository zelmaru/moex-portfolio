import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  autoIcons: {
    baseIconPath: 'assets/moex-portfolio-logo.svg',
    // Disable the grayscale/overlay during dev mode
    developmentIndicator: false,
  },
  // Correct structural mapping for ESLint v9 flat config generation
  imports: {
    eslintrc: {
      enabled: 9,
    },
  },
  manifest: {
    permissions: ['sidePanel'],
    action: {
      default_popup: '', // Prevent popup from overriding side panel - empty string required
    },
  },
  srcDir: 'src',
});
