import { SavedList, type ISavedList } from '../models';

export const SavedListService = {
	createSavedList: async (savedListData: ISavedList): Promise<ISavedList| undefined> => {
		const savedList = new SavedList(savedListData);
		try {
			return await savedList.save();
		} catch (error) {
			console.error(error);
			return undefined;
		}
	},

	getSavedList: async (id: string): Promise<ISavedList | null> => {
		return SavedList.findById(id).exec();
	},

	getAllSavedLists: async (): Promise<ISavedList[]> => {
		return SavedList.find().exec(); // see here whether we need exec
	},

	getUserSavedLists: async (ownerId: string): Promise<ISavedList[]> => {
		return SavedList.find({ ownerId });
	},

	updateSavedList: async (id: string, updateData: Partial<ISavedList>): Promise<ISavedList | null> => {
		return SavedList.findByIdAndUpdate(id, updateData, {new: true}).exec();
	}
};