// import { useEffect, useState } from 'react';
// import { IUser, IUserWithClerk } from '../models';
// import userService from '../services/internal/userService';
//
// export const useUserData = (userId: string) => {
// 	const [user, setUser] = useState<IUser>();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);
//
// 	useEffect(() => {
// 		setIsLoading(true);
// 		userService.getWithClerkDetailsByUserId(userId)
// 			.then(data => {
// 				setUser(data);
// 				setIsLoading(false);
// 			})
// 			.catch(err => {
// 				setError(err);
// 				setIsLoading(false);
// 			});
// 	}, [userId]);
//
// 	return { user, error, isLoading };
// };
//
//
// export const useUserDataByClerkId = (clerkId: string) => {
// 	const [user, setUser] = useState<IUserWithClerk | null>(null);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);
//
// 	useEffect(() => {
// 		setIsLoading(true);
// 		userService.getFullUserByClerkId(clerkId)
// 			.then(data => {
// 				setUser(data);
// 				console.log('new user', data);
// 				setIsLoading(false);
// 			})
// 			.catch(err => {
// 				setError(err);
// 				setIsLoading(false);
// 			});
// 	}, [clerkId]);
//
// 	return { user, isLoading, error };
// };

import { useEffect, useState } from 'react';
import { IUser } from '../models';
import userService from '../services/internal/userService';

export const useUserData = (userId: string) => {
	const [user, setUser] = useState<IUser>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		userService.getWithClerkDetailsByUserId(userId)
			.then(data => {
				setUser(data);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err);
				setIsLoading(false);
			});
	}, [userId]);

	return { user, error, isLoading };
};


export const useUserDataByClerkId = (clerkId: string) => {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		userService.getUserByClerkId(clerkId)
			.then(data => {
				setUser(data);
				console.log('new user', data);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err);
				setIsLoading(false);
			});
	}, [clerkId]);

	return { user, isLoading, error };
};

