import { model, type ObjectId, Schema } from 'mongoose';
import { MeasureResponseSchema, type MeasureResponse } from './response'; // need further checking with response.ts

interface Measure {
  sheetId: ObjectId
  measureNum: number
  image: Buffer
  responses: [MeasureResponse]
  responseCount: number
}

const measureSchema: Schema = new Schema<Measure>({
  sheetId: { type: Schema.Types.ObjectId, required: [true, 'sheetId is required'] },
  measureNum: { type: Number, required: [true, 'measureNum is required'] },
  image: { type: Buffer, required: [true, 'image binary data is required'] },
  responses: { type: [{ type: MeasureResponseSchema }], default: [] },
  responseCount: { type: Number, default: 0 }
});

const MeasureModel = model<Measure>('Measure', measureSchema);

export default MeasureModel;
