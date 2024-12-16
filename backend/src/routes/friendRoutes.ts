import { Router } from 'express';
import {FriendController} from '../controllers/friendController';


const friendRouter = Router();

friendRouter.post('/', FriendController.createFriendRequest);
friendRouter.post('/acceptById/:requestId', FriendController.acceptFriendRequest);
friendRouter.post('/rejectById/:requestId', FriendController.rejectFriendRequest);
friendRouter.get('/allFriends', FriendController.getAllFriends);
friendRouter.get('/allFriendRequests', FriendController.getFriendRequest);

export { friendRouter };
