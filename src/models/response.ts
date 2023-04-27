import { type ObjectId, Schema } from 'mongoose';
import { type Symbols, symbolSchema } from './symbol';

export interface MeasureResponse {
  userId: ObjectId
  symbols: Symbols[]
};

export const MeasureResponseSchema: Schema = new Schema<MeasureResponse>({
  userId: { type: Schema.Types.ObjectId, required: true },
  symbols: { type: [symbolSchema], default: [] }
});
