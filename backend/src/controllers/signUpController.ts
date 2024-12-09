import { Request, Response } from 'express';
import * as userService from '../services/signUpService';

export const signUpController = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  try {

    const newUser = await userService.createUser(email, name, password);

    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {

    console.log("This is the error here", error)
    res.status(500).json({ error: 'Failed to create user' });
  }
};