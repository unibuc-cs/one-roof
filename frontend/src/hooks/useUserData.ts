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

	return { user, error, isLoading};
};
