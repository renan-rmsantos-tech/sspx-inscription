<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Protótipos

Protótipos de tela usam `@compozy/proto` (skills `proto` e `proto-apply-comments`; instale com `pnpm proto init --skills`, porque `.agents/skills/` não é versionado): `<view>.proto.tsx` ao lado da view real, fixtures em `<view>.fixtures.ts` e explorações em `drafts/<slug>/index.proto.tsx`. `pnpm proto dev` abre a galeria em `127.0.0.1:4490` (outra porta com `PROTO_PORT`); `pnpm proto check --json` precisa passar antes da revisão. A galeria compila com `vite.config.ts` (o `next build` não o usa) e troca `next/link` e `next/navigation` pelas versões de `proto/next/`. Views recebem dados e callbacks, inclusive server actions, por props; não importe `@/app/actions/*` nem `@/lib/db` (só `import type`) em view que tenha protótipo. Nunca afrouxe `guards.forbidRuntimeImports` em `proto.config.ts` para algo renderizar. Detalhes em `docs/design/prototyping.md`.
