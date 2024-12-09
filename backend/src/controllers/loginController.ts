import { Request, Response } from 'express';
import * as loginService from '../services/loginService';


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "strict"  as const ,
  maxAge: 60 * 60 * 1000,
}

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginService.authenticateUser(email, password);

    res.cookie('auth_token', token, COOKIE_OPTIONS);

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Invalid login credentials' });
  }
};