import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export default tseslint.config(
  // 1. Ignore build files, node_modules, and cache folders
  {
    ignores: ['.output/**/*', 'dist/**/*', 'node_modules/**/*', '.wxt/**/*'],
  },

  // 2. Load standard and strict rules for code quality
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // 3. Configuration for TypeScript and React files
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './.wxt/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // Tell ESLint that browser extension variables are valid global objects
      globals: {
        chrome: 'readonly',
        browser: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // Not needed for React 18+
      '@typescript-eslint/no-explicit-any': 'error', // Do not allow 'any' types

      // Force arrow functions for all React components
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },

  // 4. Do not run strict TypeScript checks on regular JavaScript config files
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ...tseslint.configs.disableTypeChecked,
  },
);
