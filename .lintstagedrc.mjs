const args = (files) => files.map(JSON.stringify).join(" ");

export default {
  "apps/web/**/*.{js,jsx,ts,tsx}": (files) => [
    `biome check --write ${args(files)}`,
    "pnpm --filter web typecheck",
    `pnpm --filter web test -- --findRelatedTests ${args(files)}`,
  ],
  "apps/api/**/*.{js,ts}": (files) => [
    `biome check --write ${args(files)}`,
    "pnpm --filter api typecheck",
    `pnpm --filter api test -- --findRelatedTests ${args(files)}`,
  ],
  "{apps/web,apps/api}/**/*.{json,jsonc,css}": "biome check --write",
  "*.{js,cjs,mjs,json,jsonc}": "biome check --write",
  ".lintstagedrc.mjs": "biome check --write",
  ".vscode/*.json": "biome check --write",
};
