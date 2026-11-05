import "./app/globals.css";
import "./proto/canvas.css";

import type { CanvasProps, FrameProps } from "@compozy/proto";

/**
 * O layout raiz (`app/layout.tsx`) só aplica `globals.css`, as fontes e o
 * corpo creme; aqui o `canvas.css` faz o papel do `next/font`.
 */
export function Canvas({ children }: CanvasProps) {
  return <div className="min-h-svh flex flex-col font-sans text-foreground bg-background antialiased">{children}</div>;
}

/**
 * O app não tem casca compartilhada: cada página desenha o próprio cabeçalho.
 * Em volta dos protótipos de componente fica só o recuo das seções das páginas
 * (`px-6 lg:px-20`), para a view aparecer na largura em que é usada.
 */
export function Frame({ children }: FrameProps) {
  return <main className="flex flex-col flex-1 px-6 py-12 lg:px-20 lg:py-16">{children}</main>;
}
