import { definePrototype, type PrototypeProps } from "@compozy/proto";
import { RsvpForm } from "./rsvp-form";
import { ERROS, INVALIDA, PREENCHIDA, submitFixture } from "./rsvp-form.fixtures";

export const meta = definePrototype({
  title: "Ficha de inscrição",
  route: "/",
  states: [
    { id: "vazia", label: "Vazia, como abre na página" },
    { id: "preenchida", label: "Preenchida, família de 5" },
    { id: "erro-validacao", label: "Com erros de validação" },
  ],
});

export default function Prototype({ state }: PrototypeProps) {
  switch (state) {
    case "preenchida":
      return <RsvpForm key={state} submit={submitFixture} defaultValues={PREENCHIDA} />;
    case "erro-validacao":
      return <RsvpForm key={state} submit={submitFixture} defaultValues={INVALIDA} errors={ERROS} />;
    default:
      return <RsvpForm key={state} submit={submitFixture} />;
  }
}
