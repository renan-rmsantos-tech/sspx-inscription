import { defineProtoConfig } from "@compozy/proto/config";

/** Galeria de protótipos: `pnpm proto dev` (veja docs/design/prototyping.md). */
export default defineProtoConfig({
  title: "Festa Patronal — Inscrições",
  locale: "pt-BR",
  prototypes: ["app/**/*.proto.tsx", "components/**/*.proto.tsx", "drafts/**/*.proto.tsx"],
  drafts: "drafts",
  dev: { port: 4490 },
  guards: {
    // Protótipos e drafts renderizam views com fixtures: nunca alcançam banco,
    // sessão do painel (cookie assinado, bcrypt), server actions, a rota de CSV
    // nem as APIs de servidor do Next. As views só importam tipos de
    // `lib/db/schema` (apagados na compilação). O app não envia e-mail.
    forbidRuntimeImports: [
      "lib/db",
      "lib/cookie.ts",
      "app/actions",
      "app/api",
      "proxy.ts",
      "next/headers",
      "next/server",
      "next/cache",
      "server-only",
      "postgres",
      "drizzle-orm",
      "bcryptjs",
    ],
  },
});
