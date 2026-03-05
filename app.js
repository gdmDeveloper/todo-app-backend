import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

import authRouter from './routes/auth.js';
import taskRouter from './routes/task.js';
import groupRouter from './routes/group.js';
import profileRouter from './routes/profile.js';
import groupTasksRouter from './routes/groupTask.js';

import validateToken from './middleware/authToken.js';
import cors from 'cors';

const app = express();
const host = process.env.HOST;

app.use(express.json());
app.use(
  cors({
    origin: '*', // en desarrollo permite todo
  }),
);

app.use('/auth/', authRouter);

app.use(validateToken);

app.use('/tasks', taskRouter);
app.use('/profile', profileRouter);
app.use('/groups', groupRouter);
app.use('/groups', groupTasksRouter);

// ! START MONGOOSE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));
// ! START UP SERVER

app.listen(host, () => {
  console.log(`Server started at ${host}`);
});
