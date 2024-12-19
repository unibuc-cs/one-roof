import { ISearchParams, Listing, Review } from '../models';
import {
	applyCombinedStrategies, applyStrategyToEntity,
	GeospatialSearchStrategy,
	ListingFiltersStrategy,
	ReviewFiltersStrategy
} from '../strategy';

export const SearchService = {
	search: async (searchParams: ISearchParams) => {
		const geospatialStrategy = new GeospatialSearchStrategy();
		const listingFiltersStrategy = new ListingFiltersStrategy();
		const reviewFiltersStrategy = new ReviewFiltersStrategy();
		console.log('THE OG SEARHC PARAMS', searchParams);
		try {
			const restrictedListings = await applyCombinedStrategies(Listing, geospatialStrategy, listingFiltersStrategy, searchParams);
			const restrictedReviews = await applyCombinedStrategies(Review, geospatialStrategy, reviewFiltersStrategy, searchParams);

			const justFilteredListings = await applyStrategyToEntity(Listing, listingFiltersStrategy, searchParams.filters);
			const justFilteredReviews = await applyStrategyToEntity(Review, reviewFiltersStrategy, searchParams.filters);

			return {
				listings: restrictedListings,
				reviews: restrictedReviews,
				filteredListings:  justFilteredListings,
				filteredReviews: justFilteredReviews
			};
		} catch (error) {
			console.error('Error in search service:', error);
			throw error;
		}
	}
};
