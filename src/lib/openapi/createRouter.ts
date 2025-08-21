import { OpenAPIHono } from '@hono/zod-openapi';

interface AppBindigs {
  Variables: {};
}

export default function createRouter() {
  return new OpenAPIHono<AppBindigs>({
    strict: false,
  });
}


