import { type Application, type Router } from 'express';

import sheetsRoute from './sheets';
import usersRoute from './users';

const registerRoutes = (server: Application, router: Router): void => {
  server.use('/api', sheetsRoute(router));
  server.use('/api', usersRoute(router));
};

export default registerRoutes;
