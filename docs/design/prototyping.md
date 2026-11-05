---
target: library
host: vite-app # galeria @compozy/proto ao lado do app Next, com vite.config.ts próprio
prototypes: ["app/**/*.proto.tsx", "components/**/*.proto.tsx", "drafts/**/*.proto.tsx"]
entry: "drafts/{slug}/index.proto.tsx"
providers: proto.canvas.tsx
dev: pnpm proto dev
preview: "http://127.0.0.1:4491/__proto/render/{slug}?chrome=0"
evidence: "pnpm proto evidence {slug} --state <id>"
output: "docs/design/{slug}/"
---

# Protótipos

A galeria `@compozy/proto` renderiza as views reais do app com fixtures, um estado
por vez, e guarda os comentários de revisão em `proto/review/`. As skills `proto` e
`proto-apply-comments` descrevem autoria, revisão e a CLI; as regras deste projeto
ficam aqui e no `AGENTS.md`.

```bash
pnpm proto dev               # galeria em http://127.0.0.1:4490 (render em :4491)
PROTO_PORT=4500 pnpm proto dev   # outra porta, se 4490/4491 estiverem ocupadas
pnpm proto check --json      # valida meta, guards e compilação; rode antes da revisão
pnpm proto screenshot admin-table --state nomes-longos
```

`proto screenshot` grava em `docs/design/<slug>/<estado>--<tema>--<largura>.png`.
Confira a imagem e apague o PNG se ele não for evidência a versionar. O aviso do
Vite "ESM syntax in a file loaded as CommonJS" some com
`VITE_CONFIG_NATIVE_IGNORE_WARNING=true`. Capturas precisam do Chromium do
Playwright (`pnpm exec playwright install chromium`).

## Skills

`.agents/skills/` e `.claude/skills/` são ignorados pelo Git neste repositório. Para
instalar as skills do proto num checkout novo, rode `pnpm proto init --skills` (não
mexe na configuração já existente) e, para o Claude Code, crie os links:

```bash
mkdir -p .claude/skills
ln -sfn ../../.agents/skills/proto .claude/skills/proto
ln -sfn ../../.agents/skills/proto-apply-comments .claude/skills/proto-apply-comments
```

Rode `pnpm proto init --skills` de novo depois de atualizar `@compozy/proto`.

## Onde ficam

- **Protótipo de componente**: `<view>.proto.tsx` ao lado da view, com fixtures em
  `<view>.fixtures.ts`. Só compõe a view, sem markup próprio. Hoje existem:
  - `components/rsvp-form.proto.tsx`: ficha de inscrição vazia, preenchida (família
    de 5) e com erros de validação (as mensagens do `rsvpSchema`);
  - `components/admin-table.proto.tsx`: livro de inscrições do painel com nomes
    duplicados, vazio e com nome e contato longos.
- **Draft**: `drafts/<slug>/index.proto.tsx`, exploração com markup livre antes de a
  view existir. Quando a ideia assentar, extraia a view, crie o protótipo de
  componente e apague o draft.
- **Canvas e Frame** (`proto.canvas.tsx`): o `Canvas` carrega `app/globals.css`,
  `proto/canvas.css` e o corpo creme do layout raiz. O app não tem casca
  compartilhada (cada página desenha o próprio cabeçalho), então o `Frame` só dá o
  recuo das seções das páginas. Use `standalone: true` no `meta` para renderizar sem
  ele.

## Next.js dentro do Vite

O app é Next; a galeria compila com `vite.config.ts`, que o `next build` não lê. O
Tailwind entra pelo `postcss.config.mjs` de sempre. `next/link` e `next/navigation`
são trocados pelas versões de `proto/next/`: links não navegam e `useRouter()`
devolve funções vazias. O `next/font` não roda no Vite; `proto/canvas.css` carrega
Lora, Playfair Display e Cormorant Garamond do Google Fonts com as mesmas variáveis
CSS, e sem rede cai na serifa do sistema. Componentes de servidor (`async`,
`next/headers`) e server actions não rodam na galeria: a página busca os dados e
passa por props para a view.

## Server actions nas views

Views de cliente não importam `app/actions/`. A página (componente de servidor)
entrega a action real por prop: `app/page.tsx` passa `submitRsvp` para
`RsvpForm submit`, e `app/admin/page.tsx` passa `deleteRsvp` para
`AdminTable onDelete`. Na galeria os protótipos passam funções de fixture que
resolvem sem servidor.

## Guards

`guards.forbidRuntimeImports` em `proto.config.ts` faz `proto check` falhar com
`network_import` quando um protótipo alcança o banco (`lib/db`, `postgres`,
`drizzle-orm`), a sessão do painel (`lib/cookie.ts`, `bcryptjs`, `proxy.ts`), as
server actions (`app/actions`), a rota de CSV (`app/api`) ou as APIs de servidor do
Next (`next/headers`, `next/server`, `next/cache`, `server-only`). `import type` é
apagado na compilação e passa. A correção é tirar o acesso da view, nunca afrouxar
o guard.
