import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schema/auth.schema.js';
import schemaValidatorMiddleware from '../middleware/validateSchema.js';

const router = Router();

router.post('/register', schemaValidatorMiddleware(registerSchema), register);
router.post('/login', schemaValidatorMiddleware(loginSchema), login);

export default router;
