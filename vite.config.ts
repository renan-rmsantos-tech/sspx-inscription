import { proto } from "@compozy/proto/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const root = import.meta.dirname;
const shim = (file: string) => path.resolve(root, "proto/next", file);

/**
 * Usado só pela galeria de protótipos (`pnpm proto dev`). O app continua sendo
 * construído pelo Next (`next build`), e nenhum outro script carrega este
 * arquivo. O Tailwind entra pelo `postcss.config.mjs`, que o Vite já lê.
 *
 * Os módulos `next/*` que as views importam são trocados por versões de
 * apresentação em `proto/next/`, para que as views reais renderizem no Vite.
 */
export default defineConfig({
  plugins: [react(), proto()],
  resolve: {
    alias: [
      { find: /^next\/link$/, replacement: shim("link.tsx") },
      { find: /^next\/navigation$/, replacement: shim("navigation.ts") },
      { find: /^@\//, replacement: `${root}/` },
    ],
  },
});
