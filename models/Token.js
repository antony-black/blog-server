import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const TokenShema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const UserModel = model('Token', TokenShema);
