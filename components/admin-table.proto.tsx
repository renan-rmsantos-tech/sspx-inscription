import { definePrototype, type PrototypeProps } from "@compozy/proto";
import { AdminTable } from "./admin-table";
import { DUPLICADAS, DUPLICADAS_LONGOS, NOMES_LONGOS, REGISTROS } from "./admin-table.fixtures";

export const meta = definePrototype({
  title: "Livro de inscrições (painel)",
  route: "/admin",
  states: [
    { id: "registros", label: "Inscrições com nome duplicado" },
    { id: "vazia", label: "Nenhuma inscrição" },
    { id: "nomes-longos", label: "Nome e contato longos" },
  ],
});

const excluir = async () => ({ ok: true });

export default function Prototype({ state }: PrototypeProps) {
  switch (state) {
    case "vazia":
      return <AdminTable rows={[]} duplicates={new Set()} onDelete={excluir} />;
    case "nomes-longos":
      return <AdminTable rows={NOMES_LONGOS} duplicates={DUPLICADAS_LONGOS} onDelete={excluir} />;
    default:
      return <AdminTable rows={REGISTROS} duplicates={DUPLICADAS} onDelete={excluir} />;
  }
}
