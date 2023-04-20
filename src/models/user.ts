import { model, Schema } from 'mongoose';

interface User {
  email: string
};

const schema: Schema = new Schema<User>({
  email: { type: String, required: false }
});

const UserModel = model<User>('User', schema);

export default UserModel;
