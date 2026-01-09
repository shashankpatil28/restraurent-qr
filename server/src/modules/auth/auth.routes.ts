import { Router } from 'express';
import * as authController from './auth.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/role.middleware';

export const authRoutes = Router();

// This endpoint is for creating new admin/staff users.
// It's protected and only accessible by existing admins.
authRoutes.post(
  '/register',
  requireAuth,
  requireRole(['ADMIN']),
  authController.registerAdmin
);
authRoutes.post('/login', authController.login);
