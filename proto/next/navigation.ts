/**
 * `next/navigation` na galeria. As views deste app só usam `useRouter` (para
 * ir à confirmação e recarregar a lista do painel); na galeria navegar não faz
 * nada e a rota é sempre a raiz.
 */
const router = {
  push: () => {},
  replace: () => {},
  refresh: () => {},
  prefetch: () => {},
  back: () => {},
  forward: () => {},
};

export function useRouter() {
  return router;
}

export function usePathname(): string {
  return "/";
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams();
}

export function redirect(url: string): never {
  throw new Error(`redirect(${url}) não roda em protótipos`);
}

export const permanentRedirect = redirect;

export function notFound(): never {
  throw new Error("notFound() não roda em protótipos");
}
