import { Schema } from 'mongoose';
import { type Symbols, symbolSchema } from './symbol';

export interface MeasureResponse {
  userId: number
  symbols: Symbols[]
};

export const MeasureResponseSchema: Schema = new Schema<MeasureResponse>({
  userId: { type: Number, required: true },
  symbols: { type: [symbolSchema], default: [] }
});
