import express from 'express';
import { SavedListController } from '../controllers';

const savedListRouter = express.Router();

savedListRouter.post('/', SavedListController.createSavedList);
savedListRouter.get('/', SavedListController.getAllSavedLists);
savedListRouter.get('/ownerId/:id', SavedListController.getUserSavedLists);
savedListRouter.get('/:id', SavedListController.getSavedList);
savedListRouter.put('/:id', SavedListController.updateSavedList);

export {savedListRouter};