import { type Request, type Response, type Router } from 'express';

import UserModel from '../models/user';
import { userSignup } from '../controllers/usersController';

const usersRoute = (router: Router): Router => {
  router.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      return res.status(201).json({ message: 'User GET successful', data: users });
    } catch (error) {
      return res.status(500).json({ message: 'User GET failed - something went wrong on the server', data: error });
    }
  });

  router.post('/users', userSignup);
  return router;
};

export default usersRoute;
