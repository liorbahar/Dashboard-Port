export interface ProperitesJsonSchema {
    [key: string]: {
      description: string;
      type: string;
    };
  }
  
export type JsonSchema = {
    title: string;
    description: string;
    type: string;
    properties: ProperitesJsonSchema
}

export type EventSchema = {
  id?: string;
  jsonschema: JsonSchema
}