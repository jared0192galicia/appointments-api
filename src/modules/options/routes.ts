import { Hono } from 'hono';
import { protect } from 'src/middleware/validate';
import { getAppointmentOptions } from './controller';

const router = new Hono();

router.get('/register-appointment', getAppointmentOptions);

export default router;
