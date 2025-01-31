import {Request, Response} from 'express';
import {ListingService} from '../services';
import {NotificationService} from '../services';

export const NotificationController = {
	async sendNotification(req: Request, res: Response) {
		try {
			const {title, body} = req.body;
			const notification = await NotificationService.sendNotification(req.params.pushToken, title, body);
			res.status(201).json(notification);
		} catch (error) {
			res.status(500).json({ error: 'Failed to send notification' });
		}
	},
};