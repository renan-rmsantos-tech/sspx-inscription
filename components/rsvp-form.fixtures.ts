import type { FieldErrors } from "react-hook-form";
import type { RsvpInput, RsvpResult } from "@/lib/validators/rsvp";

/** Envio sem servidor: a ficha recebe um código e a galeria não navega. */
export async function submitFixture(): Promise<RsvpResult> {
  return { ok: true, code: "FESTA-7K2Q" };
}

export const PREENCHIDA: Partial<RsvpInput> = {
  name: "Maria das Graças Oliveira",
  email: "maria.oliveira@exemplo.com.br",
  phone: "(11) 98765-4321",
  adults: 2,
  children: 3,
};

/** Valores que o `rsvpSchema` recusa, com as mensagens que ele devolve. */
export const INVALIDA: Partial<RsvpInput> = {
  name: "M",
  email: "maria@",
  phone: "",
  adults: 0,
  children: 0,
};

export const ERROS: FieldErrors<RsvpInput> = {
  name: { type: "too_small", message: "Informe o nome completo" },
  email: { type: "invalid_format", message: "Email inválido" },
  adults: { type: "custom", message: "Adicione ao menos 1 pessoa" },
};
