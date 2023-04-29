import { type Request, type Response, type Router } from 'express';
import { isValidObjectId } from 'mongoose';

import queryParams from './common/query-params';
import UserModel from '../models/user';

const usersIdRoutes = (router: Router): Router => {
  // Get one user
  router.get('/users/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
          req.params.id === undefined || req.params.id === null) {
        return res.status(400).json({ message: 'User GET failed - no object id provided', data: { _id: req.params.id } });
      }

      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'User GET failed - invalid object id', data: { _id: req.params.id } });
      }

      const user = await queryParams(UserModel.findById(req.params.id), req.query);
      if (user != null) {
        return res.status(200).json({ message: 'User GET successful', data: user });
      } else {
        return res.status(404).json({ message: 'User GET failed - no user found', data: { _id: req.params.id } });
      }
    } catch (error) {
      return res.status(500).json({ message: 'User GET failed - something went wrong on the server', data: error });
    }
  });

  // Delete a user
  router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
          req.params.id === undefined || req.params.id === null) {
        return res.status(400).json({ message: 'User DELETE failed - no object id provided', data: { _id: req.params.id } });
      }

      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'User DELETE failed - invalid object id', data: { _id: req.params.id } });
      }

      const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
      if (deletedUser != null) {
        return res.status(200).json({ message: 'User delete successful', data: deletedUser });
      } else {
        return res.status(404).json({ message: 'User DELETE failed - no user found', data: { _id: req.params.id } });
      }
    } catch (error) {
      return res.status(500).json({ message: 'User DELETE failed - something went wrong on the server', data: error });
    }
  });

  // Update a user's email by id
  router.put('/users/:id', async (req: Request, res: Response) => {
    try {
      if (req.params === undefined || req.params === null ||
          req.params.id === undefined || req.params.id === null) {
        return res.status(400).json({ message: 'User PUT failed - no object id provided', data: { _id: req.params.id } });
      }

      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'User PUT failed - invalid object id', data: { _id: req.params.id } });
      }

      if (!('experience' in req.body)) {
        res.status(400).json({ message: 'User PUT failed - validation error', data: 'experience is required' });
        return;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (updatedUser != null) {
        return res.status(200).json({ message: 'User PUT successful!', data: updatedUser });
      } else {
        return res.status(404).json({ message: 'User PUT failed - no user found', data: { _id: req.params.id } });
      }
    } catch (error) {
      return res.status(500).json({ message: 'User PUT failed - something went wrong on the server', data: error });
    }
  });
  return router;
};

export default usersIdRoutes;
