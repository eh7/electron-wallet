//import mongoose, {model, Schema, Model, Document} from 'mongoose';
import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  somethingElse?: number;
}

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  somethingElse: Number,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
