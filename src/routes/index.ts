import { type Application, type Router } from 'express';

import sheetsRoute from './sheets';
import sheetsIdRoute from './sheets-id';

const registerRoutes = (server: Application, router: Router): void => {
  server.use('/api', sheetsRoute(router));
  server.use('/api', sheetsIdRoute(router));
};

export default registerRoutes;
