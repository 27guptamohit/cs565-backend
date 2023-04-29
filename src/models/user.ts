import { model, Schema } from 'mongoose';

interface User {
  email: string
  experience: string
};

const schema: Schema = new Schema<User>({
  email: { type: String, required: false },
  experience: { type: String, required: [true, 'experience is required'] }
});

const UserModel = model<User>('User', schema);

export default UserModel;
