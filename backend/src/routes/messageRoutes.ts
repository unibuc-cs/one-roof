import express from 'express';
import {MessageController} from '../controllers/messageController';

const messageRouter = express.Router();
messageRouter.post('/', MessageController.uploadMessage);
messageRouter.get('/:senderId/:receiverId', MessageController.getConversationMessages);
messageRouter.put('/:id', MessageController.updateMessage);

export {messageRouter};