import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { IListing, IReview } from '../models';
import { NumberOfBathroomsEnum, NumberOfBedroomsEnum, PropertyTypeEnum, SearchTypeEnum } from '../enums';
import { BUCHAREST_COORDINATES, callApi, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../utils';
import { useListings } from '../hooks';
import RentalAmenitiesEnum from '../enums/RentalAmenitiesEnum';

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
	filters: {
		roomType?: PropertyTypeEnum,
		priceRange?: { min: number, max: number },
		bedrooms?: number,
		bathrooms?: number,
		amenities: RentalAmenitiesEnum[],
	},
}

const SearchContext = createContext<{
	state: SearchContextState,
	setRegion: React.Dispatch<React.SetStateAction<SearchContextState['region']>>,
	setSearchType: React.Dispatch<React.SetStateAction<SearchTypeEnum>>,
	setListings: React.Dispatch<React.SetStateAction<IListing[]>>,
	setReviews: React.Dispatch<React.SetStateAction<IReview[]>>,
	setFilters: React.Dispatch<React.SetStateAction<SearchContextState['filters']>>,
}>(null!);

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [region, setRegion] = useState<SearchContextState['region']>({
		latitude: BUCHAREST_COORDINATES.latitude,
		longitude: BUCHAREST_COORDINATES.longitude,
		latitudeDelta: DEFAULT_LATITUDE_DELTA,
		longitudeDelta: DEFAULT_LONGITUDE_DELTA,
	});
	const [searchType, setSearchType] = useState<SearchTypeEnum>(SearchTypeEnum.Listings);
	const [listings, setListings] = useState<IListing[]>([]);
	const [reviews, setReviews] = useState<IReview[]>([]);
	const [filters, setFilters] = useState<SearchContextState['filters']>({
		roomType: PropertyTypeEnum.Studio,
		priceRange: { min: 500, max: 3000 },
		bedrooms: NumberOfBedroomsEnum.Any,
		bathrooms: NumberOfBathroomsEnum.Any,
		amenities: []
	});

	const { listings: loadedListings, error, isLoading } = useListings();

	useEffect(() => {
		if (!isLoading && !error) {
			setListings(loadedListings);
		}
	}, [loadedListings, isLoading, error]);

	const fetchFilteredData = async () => {
		try {
			const response = await callApi('search', {
				method: 'POST',
				body: JSON.stringify({
					region,
					filters
				})
			});
			setListings(response.listings);
			setReviews(response.reviews);
		} catch (error) {
			console.error('Failed to fetch filtered data:', error);
		}
	};

	useEffect(() => {
		fetchFilteredData();
	}, [region, filters]);

	return (
		<SearchContext.Provider value={{
			state: { region, searchType, listings, reviews, filteredListings: listings, filteredReviews: reviews, filters },
			setRegion,
			setSearchType,
			setListings,
			setReviews,
			setFilters
		}}>
			{children}
		</SearchContext.Provider>
	);
};
