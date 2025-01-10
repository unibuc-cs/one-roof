import { useEffect, useState } from 'react';
import { savedListService } from '../services';
import { ISavedList } from '../models';

export const useSavedLists = () => {
	const [savedLists, setSavedLists] = useState<ISavedList[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		savedListService.getAllSavedLists()
			.then(data => {
				setSavedLists(data);
				setIsLoading(false);
			})
			.catch(err => {
				setError(err);
				setIsLoading(false);
			});
	}, []);

	return { savedLists, isLoading, error };
};