import { type Application, type Router } from 'express';

import sheetsRoute from './sheets';
import sheetsIdRoute from './sheets-id';
import usersRoute from './users';
import usersIdRoutes from './users-id';
import measuresRoute from './measures';
import measuresIdRoute from './measures-id';
import lilypondRoute from './lilypond';
import measureResponseRoute from './measureresponse';
import measureTaskRoute from './measuretask';

const registerRoutes = (server: Application, router: Router): void => {
  server.use('/api', sheetsRoute(router));
  server.use('/api', sheetsIdRoute(router));
  server.use('/api', usersRoute(router));
  server.use('/api', usersIdRoutes(router));
  server.use('/api', measuresRoute(router));
  server.use('/api', measuresIdRoute(router));
  server.use('/api', lilypondRoute(router));
  server.use('/api', measureResponseRoute(router));
  server.use('/api', measureTaskRoute(router));
};

export default registerRoutes;
