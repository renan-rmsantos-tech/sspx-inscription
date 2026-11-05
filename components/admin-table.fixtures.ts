import type { Rsvp } from "@/lib/db/schema";
import { findDuplicateNames } from "@/lib/duplicates";

const MINUTO = 60_000;

/** Datas relativas ao momento da renderização, para "há 12 minutos" e o destaque de novas ficarem estáveis. */
function minutosAtras(minutos: number): Date {
  return new Date(Date.now() - minutos * MINUTO);
}

function inscricao(
  code: string,
  name: string,
  adults: number,
  children: number,
  minutos: number,
  email: string | null,
  phone: string | null,
): Rsvp {
  return { code, name, email, phone, adults, children, createdAt: minutosAtras(minutos) };
}

export const REGISTROS: Rsvp[] = [
  inscricao("FESTA-7K2Q", "Maria das Graças Oliveira", 2, 3, 12, "maria.oliveira@exemplo.com.br", "(11) 98765-4321"),
  inscricao("FESTA-P9XD", "José Carvalho", 1, 0, 47, null, "(11) 99812-0045"),
  inscricao("FESTA-M3TA", "Teresa Nogueira", 2, 4, 3 * 60, "teresa.nogueira@exemplo.com.br", null),
  inscricao("FESTA-Q8LW", "Jose Carvalho", 2, 1, 26 * 60, "jcarvalho@exemplo.com.br", "(11) 97711-3322"),
  inscricao("FESTA-H5RB", "Ana Paula Ribeiro", 2, 2, 3 * 24 * 60, "anapaula@exemplo.com.br", "(19) 99876-5432"),
  inscricao("FESTA-C2VN", "Helena Duarte", 1, 1, 5 * 24 * 60, null, null),
];

export const DUPLICADAS = findDuplicateNames(REGISTROS.map((r) => r.name));

export const NOMES_LONGOS: Rsvp[] = [
  inscricao(
    "FESTA-L0NG",
    "Maria Aparecida de Nossa Senhora das Graças Albuquerque Cavalcanti de Oliveira",
    3,
    6,
    8,
    "maria.aparecida.albuquerque.cavalcanti.oliveira@paroquia-exemplo.com.br",
    "+55 (11) 98765-4321 ramal 2034",
  ),
  ...REGISTROS.slice(1, 3),
];

export const DUPLICADAS_LONGOS = findDuplicateNames(NOMES_LONGOS.map((r) => r.name));
