import { model, type ObjectId, Schema } from 'mongoose';
import { MeasureResponseSchema, type MeasureResponse } from './response'; // need further checking with response.ts
import { symbolSchema, type Symbols } from './symbol';

interface Measure {
  sheetId: ObjectId
  measureNum: number
  image: Buffer
  responses: [MeasureResponse]
  goldSymbols: [Symbols]
}

const measureSchema: Schema = new Schema<Measure>({
  sheetId: { type: Schema.Types.ObjectId, required: [true, 'sheetId is required'] },
  measureNum: { type: Number, required: [true, 'measureNum is required'] },
  image: { type: Buffer, required: [true, 'image binary data is required'] },
  responses: { type: [{ type: MeasureResponseSchema }], default: [] },
  goldSymbols: { type: [symbolSchema], default: [] }
});

const MeasureModel = model<Measure>('Measure', measureSchema);

export default MeasureModel;
