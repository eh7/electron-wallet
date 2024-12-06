//import mongoose, {model, Schema, Model, Document} from 'mongoose';
import mongoose from 'mongoose';

export interface IProperty extends mongoose.Document {
  bookings?: [
    {
      from: Date;
      to: Date;
      baseRate: number;
      rate: number;
    }
  ];
  currentRate: string;
  description: string;
  location: string;
  name: string;
}

export const PropertySchema = new mongoose.Schema(
  {
    bookings: [
      {
        from: {type: String, required: false},
        to: {type: String, required: false},
        baseRate: {type: String, required: false},
        rate: {type: String, required: false},
      },
    ],
    currentRate: {type: String, require: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    name: {type: String, required: true},
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

const Property = mongoose.model<IProperty>('Property', PropertySchema);

export default Property;
