import e from "express";
import {IMessage, Message} from "../models";


export const MessageService = {
    uploadMessage: async(messageBody: IMessage) => {
        const message = new Message(messageBody);
        return message.save();
    },

    getConversationMessages: async(senderId, receiverId) => {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });
        return messages;
    },
    updateMessage: async(id, update) =>{
        return Message.findOneAndUpdate({_id: id}, update);
    }
}