import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  prettierConfig,
  {
    rules: {
      'prettier/prettier': ['error'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false }],
    },
  },
];

export default eslintConfig;
