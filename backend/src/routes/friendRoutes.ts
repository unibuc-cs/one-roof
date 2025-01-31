import {Router} from 'express';
import {FriendController} from '../controllers/friendController';


const friendRouter = Router();

friendRouter.post('/', FriendController.createFriendRequest);
friendRouter.post('/acceptById', FriendController.acceptFriendRequest);
friendRouter.post('/rejectById', FriendController.rejectFriendRequest);
friendRouter.get('/allFriends/:userId', FriendController.getAllFriends);
friendRouter.get('/allFriendRequests/:userId', FriendController.getAllFriendRequests);

export {friendRouter};
