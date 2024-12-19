import express from 'express';
import { ViewingController } from '../controllers';

const viewingRouter = express.Router();

viewingRouter.post('/', ViewingController.createViewing);
viewingRouter.get('/:id', ViewingController.getViewing);
viewingRouter.get('/user/:userId', ViewingController.getUserViewings);
viewingRouter.get('/confirmed/:userId', ViewingController.getUserConfirmedViewings);
viewingRouter.put('/:id', ViewingController.updateViewing);
viewingRouter.put('/confirm/:id', ViewingController.confirmViewing);
viewingRouter.put('/reject/:id', ViewingController.rejectViewing);
viewingRouter.delete('/:id', ViewingController.deleteViewing);

export { viewingRouter };