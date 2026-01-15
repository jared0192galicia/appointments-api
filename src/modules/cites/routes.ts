import { Hono } from 'hono';
import { postCiteController } from './controller';

const router = new Hono();

router.post('/register', postCiteController);

export default router;
