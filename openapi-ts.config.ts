import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/refs/heads/master/openapi.yml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: 'src/lib/client'
  },
  plugins: [
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
});