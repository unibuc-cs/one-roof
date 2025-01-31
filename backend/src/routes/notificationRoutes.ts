import express from "express";
import {NotificationController} from "../controllers/notificationController";

const notificationRouter = express.Router();

notificationRouter.post('/send/:pushToken', NotificationController.sendNotification);

export {notificationRouter};