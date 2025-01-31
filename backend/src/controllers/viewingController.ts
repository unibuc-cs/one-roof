/* eslint-disable no-trailing-spaces */
import { ViewingService, ListingService } from '../services';

export const ViewingController = {
	createViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.createViewing(req.body);
			res.status(201).json(viewing);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to create viewing' });
		}
	},

	getViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.getViewingById(req.params.id);
			if (!viewing) {
				return res.status(404).json({ error: 'Viewing not found' });
			}
			res.json(viewing);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to retrieve viewing' });
		}
	},

	getUserViewings: async (req, res) => {
		try {
			const viewings = await ViewingService.getUserViewings(req.params.userId);
			res.json(viewings);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to retrieve viewings' });
		}
	},

	getLandlordViewings: async (req, res) => {
		try {
			const viewings = await ViewingService.getLandlordViewings(req.params.userId);
			res.json(viewings);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to retrieve viewings' });
		}
	},

	getUserConfirmedViewings: async (req, res) => {
		try {
			const viewings = await ViewingService.getUserConfirmedViewings(req.params.userId);
			res.json(viewings);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to retrieve viewings' });
		}
	},

	updateViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.updateViewingById(req.params.id, req.body);
			if (!viewing) {
				return res.status(404).json({ error: 'Viewing not found' });
			}
			res.json(viewing);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to update viewing' });
		}
	},

	confirmViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.confirmViewingById(req.params.id);
			if (!viewing) {
				return res.status(404).json({ error: 'Viewing not found' });
			}
			res.json(viewing);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to confirm viewing' });
		}
	},

	rejectViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.rejectViewingById(req.params.id);
			if (!viewing) {
				return res.status(404).json({ error: 'Viewing not found' });
			}
			res.json(viewing);
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to reject viewing' });
		}
	},

	deleteViewing: async (req, res) => {
		try {
			const viewing = await ViewingService.deleteViewingById(req.params.id);
			if (!viewing) {
				return res.status(404).json({ error: 'Viewing not found' });
			}
			res.status(204).send();
		}
		catch (error) {
			res.status(500).json({ error: 'Failed to delete viewing' });
		}
	}
};