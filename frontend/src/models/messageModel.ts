

export interface IMessage {
    senderId: string,
    receiverId: string,
    content: string,
    isRead: boolean,
    referenceId: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
}