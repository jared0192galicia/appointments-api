import { Hono } from 'hono';
import { getNewsController } from './controller';

const router = new Hono();

// Devuelve una lista de noticias/ofertas
router.get('/', getNewsController);

export default router;
