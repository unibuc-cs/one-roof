import { model, Schema, type Document } from 'mongoose';

interface IAddress extends Document {
    streetNumber: string,
    streetName: string,
    city: string,
    stateOrProvince: string,
    postalCode: string,
    country: string,
}

const AddressSchema: Schema = new Schema({
	streetNumber: { type: String, required: true },
	streetName: { type: String, required: true },
	city: { type: String, required: true },
	stateOrProvince: { type: String, required: true },
	postalCode: { type: String, required: true },
	country: { type: String, required: true }
});

const Address = model<IAddress>('Address', AddressSchema);

export { AddressSchema, type IAddress, Address };
