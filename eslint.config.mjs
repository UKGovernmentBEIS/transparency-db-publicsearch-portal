import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: js.configs.recommended,
});

export default [
    {
        ignores: ['coverage/**'],
    },
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ),
    {
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
    {
        files: ['*.js', 'routes/**/*.js', 'tests/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'commonjs',
            globals: globals.node,
        },
    },
    {
        files: ['public/assets/javascripts/**/*.js'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'script',
            globals: globals.browser,
        },
    },
    {
        files: ['tests/**/*test.js'],
        languageOptions: {
            globals: globals.jest,
        },
    },
];
