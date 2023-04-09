import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: '**/*.{graphql,tsx,ts}',
  ignoreNoDocuments: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
  config: {
    avoidOptionals: true,
    immutableTypes: true,
    useTypeImports: true,
    skipTypename: true,
  },
};

export default config;
