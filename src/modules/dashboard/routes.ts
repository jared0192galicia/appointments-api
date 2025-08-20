import { Hono } from 'hono';
import { protect } from 'src/middleware/validate';
import { uploadController } from './controller';

const dashboardRoutes = new Hono();

dashboardRoutes.get('/file', uploadController);

export default dashboardRoutes;
