import {Router} from 'express';
import {UserController} from '../controllers';

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/full/:clerkId', UserController.getFullUserByClerkId);
userRouter.put('/:clerkId', UserController.updateUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:clerkId', UserController.getUser);
userRouter.get('/fullByUserId/:userId', UserController.getFullUserByUserId);
userRouter.post('/roommateQuiz/:userId', UserController.submitRoommateQuiz);
userRouter.get('/compatibleRoommates/:userId', UserController.getCompatibleRoommates);

export {userRouter};
