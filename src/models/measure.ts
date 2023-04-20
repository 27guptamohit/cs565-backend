import { model, Schema } from 'mongoose';
import { MeasureResponse, measureResponseSchema } from './response'; // need further checking with response.ts

interface Measure {
  sheetId: number;
  measureId: number;
  base64Image: string;
  responses: MeasureResponse[];
}

const measureSchema: Schema = new Schema<Measure>({
  sheetId: { type: Number, required: [true, 'sheetId is required'] },
  measureId: { type: Number, required: [true, 'measureId is required'] },
  base64Image: { type: String, required: [true, 'base64Image is required'] },
  responses: { type: [measureResponseSchema], default: [] },
});

const MeasureModel = model<Measure>('Measure', measureSchema);

export default MeasureModel;