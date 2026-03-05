import { validateObjectIDMongoose } from '../utils/validateObjectIdMongoose.js';

export const validateIdMiddleware = (req, res, next) => {
  const isValidId = validateObjectIDMongoose(req.params.id);
  if (!isValidId) return res.status(404).json({ error: 'ID not found' });
  next();
};
