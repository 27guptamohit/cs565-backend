import { type Application, type Router } from 'express';

import sheetsRoute from './sheets';
import sheetsIdRoute from './sheets-id';
import usersRoute from './users';
import usersIdRoutes from './users-id';
import measuresRoute from './measures';
import measuresIdRoute from './measures-id';

const registerRoutes = (server: Application, router: Router): void => {
  server.use('/api', sheetsRoute(router));
  server.use('/api', sheetsIdRoute(router));
  server.use('/api', usersRoute(router));
  server.use('/api', usersIdRoutes(router));
  server.use('/api', measuresRoute(router));
  server.use('/api', measuresIdRoute(router));
};

export default registerRoutes;
