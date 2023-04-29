import { type Request, type Response, type Router } from 'express';

import queryParams from './common/query-params';
import UserModel from '../models/user';

const usersRoute = (router: Router): Router => {
  // Get all users
  router.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await queryParams(UserModel.find(), req.query);
      return res.status(200).json({ message: 'User GET successful', data: users });
    } catch (error) {
      return res.status(500).json({ message: 'User GET failed - something went wrong on the server', data: error });
    }
  });
  // Create a user
  router.post('/users', async (req: Request, res: Response) => {
    try {
      if (!('experience' in req.body)) {
        res.status(400).json({ message: 'User POST failed - validation error', data: 'experience is required' });
        return;
      }

      const result = await UserModel.create(req.body);
      return res.status(201).json({ message: 'User successfully created', result });
    } catch (error) {
      return res.status(500).json({ message: 'User signup 500 error' });
    }
  });
  return router;
};
export default usersRoute;
