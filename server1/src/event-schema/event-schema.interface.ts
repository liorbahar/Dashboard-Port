export interface ProperitesJsonSchema {
    [key: string]: {
      description: string;
      type: string;
    };
  }
  

export type EventSchema = {
    id?: string,
    title: string;
    description: string;
    type: string;
    properties: ProperitesJsonSchema
}