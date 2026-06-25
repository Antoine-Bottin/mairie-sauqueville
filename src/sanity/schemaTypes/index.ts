import { type SchemaTypeDefinition } from "sanity";
import { evenement } from "./evenement";
import { alert } from "./alert";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [evenement, alert],
};
