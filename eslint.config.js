import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import js from '@eslint/js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.config({
    extends: ['eslint:recommended'],
    env: {
      browser: true,
      es2021: true,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  }),
  {
    ignores: ['tailwind.js', 'lucide.min.js', 'prompts.js', 'node_modules/**'],
  },
];
