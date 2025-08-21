import { z } from '@hono/zod-openapi';
import jsonContent from './json-content';

export const ErrorResponse = jsonContent(
  z.object({ error: z.string() }),
  'Error interno del servidor'
);

export const OkResponse = jsonContent(
  z.object({ error: z.string() }),
  'Error interno del servidor'
);
