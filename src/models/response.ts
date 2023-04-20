import { model, Schema } from 'mongoose';
import { type Symbols } from './symbol';

export interface MeasureResponse {
  userId: number
  symbols: Symbols[]
};

const SymbolSchema: Schema = new Schema<Symbols>({
  name: { type: String, required: true },
  pitch: { type: Number, required: true }
});

export const MeasureResponseSchema: Schema = new Schema<MeasureResponse>({
  userId: { type: Number, required: true },
  symbols: { type: [SymbolSchema], default: [] }
});

const MeasureResponseModel = model<MeasureResponse>('MeasureResponse', MeasureResponseSchema);

export default MeasureResponseModel;
