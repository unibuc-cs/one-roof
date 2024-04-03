import { Schema, type Document, model } from 'mongoose';

interface ILocation extends Document {
    type: string,
    coordinates: number[],
}

const LocationSchema: Schema = new Schema<ILocation>({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
    }
});

const Location = model<ILocation>('Location', LocationSchema);
export { LocationSchema, type ILocation, Location };
