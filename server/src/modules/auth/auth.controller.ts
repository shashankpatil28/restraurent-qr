import { Request, Response } from 'express';
import * as authService from './auth.service';
import { signToken } from '../../utils/jwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.validateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
};
