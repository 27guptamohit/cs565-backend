import UserModel from '../models/user';
import { type Request, type Response } from 'express';

export const userSignup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser != null) {
      return res.status(400).json({ message: 'User already exists!' });
    }
    const result = await UserModel.create({ email });
    return res.status(200).json({ message: 'User successfully created', result });
  } catch (error) {
    return res.status(500).json({ message: 'userController 500 error' });
  }
};
