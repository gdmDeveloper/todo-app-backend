import { Router } from 'express';
import {
  createTask,
  deleteTask,
  editTask,
  getTaskById,
  getTasks,
} from '../controllers/task.controller.js';
import { editTaskSchema, taskSchema } from '../schema/task.schema.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';
import { validateIdMiddleware } from '../middleware/validateID.js';

const router = Router();

router.get('/', getTasks);

router.get('/:id', validateIdMiddleware, getTaskById);

router.post('/', schemaValidatorMiddleware(taskSchema), createTask);

router.patch('/:id', validateIdMiddleware, schemaValidatorMiddleware(editTaskSchema), editTask);

router.delete('/:id', validateIdMiddleware, deleteTask);

export default router;
