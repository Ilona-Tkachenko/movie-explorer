import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
schema: "http://localhost:4000/",
documents: ["src/**/*.tsx"],
generates: {
    "./src/generated/graphql.ts": {
    plugins: ["typescript", "typescript-operations", "typed-document-node"],
    config: {
        useTypeImports: true,
    },
    },
},
};

export default config;
