import { Schema, model } from 'mongoose';
import { required } from 'zod/mini';

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
    },
    icon: {
      type: String,
      default: 'document-text-outline',
    },
    coverImage: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    completed: {
      type: Boolean,
      default: 'false',
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    group: {
      // Users in same group can create and see group tasks.
      type: Schema.Types.ObjectId,
      ref: 'Group',
    },
  },
  { timestamps: true },
);

export default model('Task', taskSchema);
