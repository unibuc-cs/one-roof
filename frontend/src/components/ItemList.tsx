import { View } from 'react-native';
import React, { useCallback } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { PropertyCard } from './PropertyCard';
import { IListing, IReview } from '../models';
import { ReviewCard } from './ReviewCard';

export const ItemList = () => {
	const { state } = useSearchContext();

	const renderListing = useCallback(
		(listing: IListing) => (
			<View
				key={`${listing._id}-${listing.url}`}
				style={{ marginBottom: 20 }}
			>
				<PropertyCard
					showFavorite={true}
					listing={listing}
					canOpen={true}
					showCarousel={false}
				/>
			</View>
		),
		[],
	);

	const renderReview = useCallback(
		(review: IReview) => (
			<ReviewCard
				key={`${review._id}-${review.address}`}
				review={review}
			/>
		),
		[],
	);

	switch (state.searchType) {
		case 'listings': {
			const reversedListings = state.listings;
			return reversedListings.map(renderListing);
		}
		case 'reviews':
			return state.reviews.map(renderReview);
	}
};
