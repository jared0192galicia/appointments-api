import type { MiddlewareHandler } from 'hono';
import packageJSON from '../../package.json';
const about = {
  author: 'Elietzer Jared Galicia Cordova',
  version: packageJSON.version,
  organization: 'Elietzer Jared Galicia Cordova.',
};

function serveAbout(): MiddlewareHandler {
  return async (context, next) => {
    if (context.req.path === '/') {
      try {
        return context.json(about);
      } catch (error) {
        console.log(error);
        return context.text('about not found', 404);
      }
    }
    return next();
  };
}

export default serveAbout;
