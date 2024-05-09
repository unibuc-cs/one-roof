import { Router } from 'express';
import { locationService } from '../services';

export const locationsRouter = Router();

locationsRouter.get('/', async (req, res) => {
	const locations = await locationService.getAllLocations();
	res.status(200).json(locations);
});

