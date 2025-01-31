import { IUserWithClerk } from './userModel';

export interface IFriendRequest {
	_id: string,
	userRequested: string,
	userPending: string,
	time: Date,
	status: string,
}

export interface IFullFriendRequest {
	_id: string,
	userRequested: IUserWithClerk,
	userPending: IUserWithClerk,
	time: Date,
	status: string,
}
