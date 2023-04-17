import { type Application, type Router } from 'express';

import sheetsRoute from './sheets';

const registerRoutes = (server: Application, router: Router): void => {
  server.use('/api', sheetsRoute(router));
};

export default registerRoutes;
