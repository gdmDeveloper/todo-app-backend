import { Router } from 'express';
import { deleteUser, showProfile, updateProfile } from '../controllers/profile.controller.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';
import { updateProfileSchema } from '../schema/auth.schema.js';

const router = Router();

router.get('/', showProfile);
router.patch('/', schemaValidatorMiddleware(updateProfileSchema), updateProfile);
router.delete('/', deleteUser);

export default router;
