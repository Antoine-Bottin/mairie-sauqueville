import { type SchemaTypeDefinition } from "sanity";
import { evenement } from "./evenement";
import { alert } from "./alert";
import { annonce } from "./annonce";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [evenement, alert, annonce],
};
