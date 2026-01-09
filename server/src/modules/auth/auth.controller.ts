import { Request, Response } from 'express';
import * as authService from './auth.service';
import { signToken } from '../../utils/jwt';
import { asyncHandler } from '../../utils/asyncHandler';

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: 'Email, password and role are required' });
    }

    if (role !== 'ADMIN' && role !== 'STAFF') {
      return res.status(400).json({ message: 'Invalid role provided' });
    }

    // A check for existing user could be added here for a friendlier error message,
    // but the unique constraint on email in the DB already prevents duplicates.

    const user = await authService.createAdmin(email, password, role);

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  }
);

export const login = asyncHandler(async (req: Request, res: Response) => {
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
});
