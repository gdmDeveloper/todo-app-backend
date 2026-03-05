import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlenght: 25,
    },
    description: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: null,
    },
    invitationCode: {
      type: String,
      unique: true,
      required: true,
      select: false,
    },
    members: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        rol: {
          type: String,
          enum: ['admin', 'member'],
          default: 'member',
        },
      },
    ],
  },
  { timestamps: true },
);

export default model('Group', groupSchema);
