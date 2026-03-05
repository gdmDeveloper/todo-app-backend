import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token is required' }); // <- return agregado
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // id, name, email
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid or expired' }); // <- return agregado
  }
};

export default validateToken;
