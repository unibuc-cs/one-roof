import { Viewing, IViewing} from '../models/viewing';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const ViewingService = {
    createViewing: async (viewingData: IViewing): Promise<IViewing | undefined> => {
        const viewing = new Viewing(viewingData);
        try {
            const savedViewing = await viewing.save();
            return savedViewing;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    },

    getViewingById: async (id: string): Promise<IViewing | null> => {
        return Viewing.findById(id).exec();
    },

    getUserViewings: async (userId: string): Promise<IViewing[]> => {
        const viewingsUser = await Viewing.find({ userId });
        const viewingsLandlord = await Viewing.find({
            landlordId: userId,
            $or: [
                { status: 'confirmed' },
                { status: 'not confirmed' }
            ]
        });
        const viewings = viewingsUser.concat(viewingsLandlord);
        return viewings;
    },

    getLandlordViewings: async (landlordId:string) : Promise <IViewing[]> => {
        const viewingsLandlord = await Viewing.find({
            landlordId: landlordId,
            $or: [
                { status: 'confirmed' },
                { status: 'not confirmed' }
            ]
        });
        return viewingsLandlord;
    },

    getUserConfirmedViewings: async (userId: string): Promise<IViewing[]> => {
        const viewings = await Viewing.find({
            status: 'confirmed',
            $or: [
                { userId },
                { landlordId: userId }
            ]
        });
        return viewings;
    },

    updateViewingById: async (id: string, updateData: UpdateQuery<IViewing>): Promise<IViewing | null> => {
        return Viewing.findByIdAndUpdate(id, updateData, { new: true }).exec();
    },

    confirmViewingById: async (id: string): Promise<IViewing | null> => {
        return Viewing.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true }).exec();
    },

    rejectViewingById: async (id: string): Promise<IViewing | null> => {
        return Viewing.findByIdAndUpdate(id, { status: 'rejected' }, { new: true }).exec();
    },

    deleteViewingById: async (id: string): Promise<IViewing | null> => {
        return Viewing.findByIdAndDelete(id).exec();
    }
};