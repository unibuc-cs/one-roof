import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IListing, IReview } from '../models';
import { SearchTypeEnum } from '../enums';
import { BUCHAREST_COORDINATES, callApi, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../utils';
import { useListings } from '../hooks';

export interface SearchContextState {
	region: {
		latitude: number,
		longitude: number,
		latitudeDelta: number,
		longitudeDelta: number,
	},
	searchType: SearchTypeEnum,
	listings: IListing[],
	reviews: IReview[],
	filteredListings: IListing[],
	filteredReviews: IReview[],
	filters: any, /* TODO: define filters*/
}

const defaultState: SearchContextState = {
	region: {
		latitude: BUCHAREST_COORDINATES.latitude,
		longitude: BUCHAREST_COORDINATES.longitude,
		latitudeDelta: DEFAULT_LATITUDE_DELTA,
		longitudeDelta: DEFAULT_LONGITUDE_DELTA,
	},
	searchType: SearchTypeEnum.Listings,
	listings: [],
	reviews: [],
	filteredListings: [],
	filteredReviews: [],
	filters: {}
};

const SearchContext = createContext<{
	state: SearchContextState,
	setState: React.Dispatch<React.SetStateAction<SearchContextState>>,
}>({
	state: defaultState,
	setState: () => null
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, setState] = useState<SearchContextState>(defaultState);
	const { listings, error, isLoading } = useListings();

	useEffect(() => {
		if (!isLoading && !error) {
			setState(prev => ({
				...prev,
				listings,
				filteredListings: listings,
			}));
		}
	}, [listings, isLoading, error]);

	const fetchFilteredData = async () => {
		try {
			const response = await callApi('search', {
				method: 'POST',
				body: JSON.stringify({
					region: state.region,
					filters: state.filters
				})
			});
			setState(prev => ({
				...prev,
				listings: response.listings,
				reviews: response.reviews,
				filteredListings: response.filteredListings,
				filteredReviews: response.filteredReviews,
			}));
		} catch (error) {
			console.error('Failed to fetch filtered data:', error);
		}
	};

	useEffect(() => {
		fetchFilteredData();
	}, [state.region, state.filters]);

	return (
		<SearchContext.Provider value={{ state, setState }}>
			{children}
		</SearchContext.Provider>
	);
};