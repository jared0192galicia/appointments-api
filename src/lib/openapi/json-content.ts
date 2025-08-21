import type { ZodSchema } from "./types";

const jsonContent = <T extends ZodSchema>(schema: T, description: string) => {
  return {
    content: {
      'application/json': {
        schema
      }
    },
    description
  };
};

export const blobContent = <T extends ZodSchema>(schema: T, description: string) => {
  return {
    content: {
      'application/octet-stream': {
        
      }
    },
    description
  };
};

export default jsonContent;
