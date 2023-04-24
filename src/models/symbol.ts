import { Schema } from 'mongoose';

export interface Symbols {
  name: string
  pitch: number
};

export const symbolSchema: Schema = new Schema<Symbols>({
  name: { type: String, required: true },
  pitch: { type: Number }
});
