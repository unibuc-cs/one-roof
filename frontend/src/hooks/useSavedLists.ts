// import { useEffect, useState } from 'react';
// import { savedListService } from '../services';
// import { ISavedList } from '../models';

// export const useSavedLists = (userId: string) => {
// 	const [savedLists, setSavedLists] = useState<ISavedList[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		setIsLoading(true);
// 		savedListService.getUserSavedLists(userId)
// 			.then(data => {
// 				setSavedLists(data);
// 				setIsLoading(false);
// 				console.log("INSIDE USE SAVED LISTS!!!!!");
// 			})
// 			.catch(err => {
// 				setError(err);
// 				setIsLoading(false);
// 			});
// 	}, []);

// 	return { savedLists, isLoading, error };
// };