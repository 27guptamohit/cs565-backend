import { model, Schema } from 'mongoose';

interface Sheet {
  measures: [string]
};

// TODO: convert from list of strings to list of measure objects
const schema: Schema = new Schema<Sheet>({
  measures: { type: [String], required: [true, 'measures are required'] }
});

const SheetModel = model<Sheet>('Sheet', schema);

export default SheetModel;
