import { prisma } from '../../utils/prisma';
import bcrypt from 'bcryptjs';

export const createAdmin = async (
  email: string,
  password: string,
  role: 'ADMIN' | 'STAFF'
) => {
  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashed,
      role,
    },
  });
};

export const validateUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;

  return user;
};
