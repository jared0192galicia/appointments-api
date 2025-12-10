import { Hono } from 'hono';
import { protect } from 'src/middleware/validate';
import { uploadController, getAppointmentsByDateRangeController } from './controller';

const dashboardRoutes = new Hono();

dashboardRoutes.get('/file', uploadController);
dashboardRoutes.get('/appointments', getAppointmentsByDateRangeController);

export default dashboardRoutes;

// 