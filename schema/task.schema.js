import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(100).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  completed: z.boolean().optional(),
  coverImage: z.string().optional().nullable(),
});

const editTaskSchema = z.object({
  title: z.string().min(2).max(50).optional(),
  description: z.string().max(100).optional(),
  priority: z.enum(['high', 'medium', 'low']).optional(),
  completed: z.boolean().optional(),
  coverImage: z.string().nullable().optional(),
});

export { taskSchema, editTaskSchema };
