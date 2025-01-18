/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-trailing-spaces */
import { Request, Response } from 'express';
import { SavedListService } from '../services';

export const SavedListController = {
	async createSavedList(req: Request, res: Response){
		try {
			const savedList = await SavedListService.createSavedList(req.body);
			console.log('saved list controller', savedList);
			res.status(201).json(savedList);
		} catch (error) {
			res.status(500).json({error: 'Failed to create new list'});
		}
	},

	async getAllSavedLists(req: Request, res:Response) {
		const savedLists = await SavedListService.getAllSavedLists();
		res.status(200).json(savedLists);
	},

	async getSavedList(req: Request, res:Response) {
		try{
			const savedList = await SavedListService.getSavedList(req.params.id);
			if (!savedList){
				return res.status(404).json({ error: 'List not found' });
			}
			res.json(savedList);
		} catch (error) {
			res.status(500).json({error: 'Failed to find list'});
		}
	},

	async getUserSavedLists(req: Request, res:Response) {
		try{
	        const savedLists = await SavedListService.getUserSavedLists(req.params.userId);
			res.status(200).json(savedLists);
		}catch (error) {
			res.status(500).json({error: 'Failed to find lists of user'});
		}
		
	},

	async updateSavedList(req: Request, res:Response) {
		try {
			const savedList = await SavedListService.updateSavedList(req.params.id, req.body);
			if (!savedList){
				return res.status(404).json({ error: 'List not found' });
			}
			res.json(savedList);
		} catch (error) {
			res.status(500).json({error: 'Failed to find list'});
		}
	}
};