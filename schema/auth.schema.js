import { optional, z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.email(),
  password: z.string().min(2).max(100),
  inviteCode: z.string().min(1),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(2).max(100),
});

const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.email().optional(),
  password: z.string().min(2).max(100).optional(),
});

export { registerSchema, loginSchema, updateProfileSchema };
