import { type Request, type Response, type Router } from 'express';
import { isValidObjectId } from 'mongoose';

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

      const user = await UserModel.findById(req.params.id);
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
        return res.status(400).json({ message: 'User email update failed - no object id provided', data: { _id: req.params.id } });
      }

      if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'User email update failed - invalid object id', data: { _id: req.params.id } });
      }

      const { email } = req.body;
      if (email === undefined) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser != null) {
        return res.status(400).json({ message: 'Email is already in use' });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { email }, { new: true });
      if (updatedUser != null) {
        return res.status(200).json({ message: 'User email update successful', data: updatedUser });
      } else {
        return res.status(404).json({ message: 'User email update failed - no user found', data: { _id: req.params.id } });
      }
    } catch (error) {
      return res.status(500).json({ message: 'User email update failed - something went wrong on the server', data: error });
    }
  });
  return router;
};

export default usersIdRoutes;
