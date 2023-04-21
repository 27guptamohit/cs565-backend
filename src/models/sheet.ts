import { model, Schema } from 'mongoose';

interface Sheet {
  name: string
  image: Buffer // base64 encoded
};

const schema: Schema = new Schema<Sheet>({
  name: { type: String, required: [true, 'name is required'] },
  image: { type: Buffer, required: [true, 'image binary data is required'] }
});

const SheetModel = model<Sheet>('Sheet', schema);

export default SheetModel;
