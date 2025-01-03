import { Schema, type Document, model } from 'mongoose';

interface ISavedList extends Document {
    // saved list id??
    ownerId: string,
    name: string, 
    savedListings: string[],
    sharedWith: string[],
    createdAt: Date,
    updatedAt: Date,
}

const SavedListSchema = new Schema<ISavedList>({
    ownerId: {type: String, required: true},
    name: {type: String, required: true},
    savedListings: { type: [String], required: true, default: []},
    sharedWith:{ type: [String], required: true, default: []}
}, {timestamps : true});

const SavedList = model<ISavedList>('SavedList', SavedListSchema);

export {SavedListSchema, type ISavedList, SavedList};