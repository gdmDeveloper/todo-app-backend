import { Router } from 'express';
import {
  createGroupTask,
  deleteGroupTask,
  editGroupTask,
  getGroupTaskById,
  getGroupTasks,
} from '../controllers/groupTask.controller.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';
import { editTaskSchema, taskSchema } from '../schema/task.schema.js';
import { isGroupMember } from '../middleware/isGroupMember.js';

const router = Router();

router.get('/:groupId/tasks', isGroupMember, getGroupTasks);
router.get('/:groupId/tasks/:id', isGroupMember, getGroupTaskById); // Get all tasks

router.post(
  '/:groupId/tasks',
  isGroupMember,
  schemaValidatorMiddleware(taskSchema),
  createGroupTask,
);

router.patch(
  '/:groupId/tasks/:id',
  isGroupMember,
  schemaValidatorMiddleware(editTaskSchema),
  editGroupTask,
);

router.delete('/:groupId/tasks/:id', isGroupMember, deleteGroupTask);

export default router;
