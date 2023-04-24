import { model, Schema } from 'mongoose';
import { MeasureResponseSchema, type MeasureResponse } from './response'; // need further checking with response.ts

interface Measure {
  sheetId: number
  measureNum: number
  image: Buffer
  responses: [MeasureResponse]
}

const measureSchema: Schema = new Schema<Measure>({
  sheetId: { type: Number, required: [true, 'sheetId is required'] },
  measureNum: { type: Number, required: [true, 'measureNum is required'] },
  image: { type: Buffer, required: [true, 'image binary data is required'] },
  responses: { type: [{ type: MeasureResponseSchema }], default: [] }
});

const MeasureModel = model<Measure>('Measure', measureSchema);

export default MeasureModel;
