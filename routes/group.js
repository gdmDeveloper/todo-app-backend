import { Router } from 'express';
import {
  createGroup,
  deleteGroup,
  editGroup,
  getGroupById,
  getUserGroups,
  joinGroup,
  searchGroup,
} from '../controllers/group.controller.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';
import {
  createGroupSchema,
  editGroupSchema,
  joinGroupSchema,
  searchGroupSchema,
} from '../schema/groups.schema.js';

const router = Router();

router.get('/', getUserGroups);
router.get('/:id', getGroupById);
router.post('/', schemaValidatorMiddleware(createGroupSchema), createGroup); // Create group
router.get('/search', schemaValidatorMiddleware(searchGroupSchema, 'query'), searchGroup); // Search group. Doesn't join on query, needs user confirmation.
router.post('/join', schemaValidatorMiddleware(joinGroupSchema), joinGroup); // Join group. Sends groupId.
router.patch('/edit/:id', schemaValidatorMiddleware(editGroupSchema), editGroup); // Edits group information. Group admin can give admin permissions to members.
router.delete('/:id', deleteGroup); // Edits group information. Group admin can give admin permissions to members.

export default router;
