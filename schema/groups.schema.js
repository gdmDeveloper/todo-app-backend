import { z } from 'zod';

const joinGroupSchema = z.object({
  groupId: z.string(),
});

const createGroupSchema = z.object({
  name: z.string().min(3).max(25),
  description: z.string().max(100).optional(),
  coverImage: z.string().optional().nullable(),
});

const searchGroupSchema = z.object({
  code: z.string(),
});

const editGroupSchema = z.object({
  name: z.string().min(3).max(25).optional(),
  description: z.string().max(100).optional(),
  coverImage: z.string().optional().nullable(),
});

export { createGroupSchema, joinGroupSchema, searchGroupSchema, editGroupSchema };
