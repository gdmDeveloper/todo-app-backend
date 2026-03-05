import mongoose from 'mongoose';

export const validateObjectIDMongoose = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
