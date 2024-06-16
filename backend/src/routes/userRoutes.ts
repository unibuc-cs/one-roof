import { Router } from 'express';
import { UserController } from '../controllers';

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/full/:clerkId', UserController.getFullUser);
userRouter.put('/:clerkId', UserController.updateUser);
userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:clerkId', UserController.getUser);
userRouter.get('/fullByUserId/:userId', UserController.getFullUserByUserId);

export { userRouter };
