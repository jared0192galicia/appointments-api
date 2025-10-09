import { Hono } from 'hono';
import auth from '@modules/auth/routes';
import welcomeMessage from '@lib/welcome';
// import { logger } from 'hono/logger';
import dashboardRoutes from '@modules/dashboard/routes';
import optionsRoutes from '@modules/options/routes';

import { cors } from 'hono/cors';
import serveAbout from '@lib/about';
import logger from './middleware/logger';

// Aplicación Hono para manejar rutas
const app = new Hono();

// Middlewares
app.use('*', logger);
app.use('*', cors());
app.use(serveAbout());

// Rutas de autenticación
app.route('/sesion', auth);
app.route('/dashboard', dashboardRoutes);
app.route('/options', optionsRoutes);

//  Inicializa el servidor
Bun.serve({
  port: 3004,
  fetch: app.fetch,
});

welcomeMessage();
