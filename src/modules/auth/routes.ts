import { auth, createController, loginController } from './controller';
import createRouter from '@lib/openapi/createRouter';
import { createRoute, z } from '@hono/zod-openapi';
import jsonContent from '@lib/openapi/json-content';
import { ErrorResponse } from '@lib/openapi/reponses';

const router = createRouter();

// Ruta para el inicio de sesión
router.post('/login', loginController);
router.openapi(
  createRoute({
    method: 'post',
    path: '/account',
    request: {
      body: jsonContent(
        z.object({
          username: z.string(),
          password: z.string(),
          email: z.string(),
          phone: z.string(),
          name: z.string(),
          surName: z.string(),
          roleId: z.number(),
        }),
        ''
      ),
    },
    responses: {
      [200]: jsonContent(
        z.object({
          accessToken: z.string(),
        }),
        'Token de acceso generado'
      ),
      [500]: ErrorResponse,
    },
  }),
  createController
);
// router.post('/account', createController);
router.post('/validar', auth);

export default router;
