import { useEffect, useState } from 'react';
import { listingService } from '../services';
import { IListing } from '../models';

export const useListing = (listingId: string, userId: string) => {
	const [listing, setListing] = useState<IListing>();
	const [error, setError] = useState(null);

	//console.log('Inside useListing', listingId, userId);

	useEffect(() => {
		listingService.getListing(listingId, userId)
			.then(
				data => { //data = data as IListing; console.log('got data:', typeof(data));
				setListing(data);
				//console.log('we set data:', listing);
			})
			.catch(err => {
				setError(err);
			});
	}, [listingId, userId]);

	return { listing, error };
};
