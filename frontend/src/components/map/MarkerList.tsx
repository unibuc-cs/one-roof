import React, { useMemo } from 'react';
import { CustomMarker } from './CustomMarker';
import { getCoordinatesFromLocation, getShortenedString } from '../../utils';
import { SearchTypeEnum } from '../../enums';

const MarkerList = ({ state, handleMarkerPress }) => {
	const items = useMemo(() => state.searchType === 'listings' ? state.filteredListings : state.filteredReviews, [state.searchType, state.filteredListings, state.filteredReviews]);

	return items.map((item) => {
		const coordinate = useMemo(() => getCoordinatesFromLocation(item.location), [item.location]);
		const text = useMemo(() => state.searchType === SearchTypeEnum.Listings ? `${item.price} €` : getShortenedString(item.title, 10), [state.searchType, item.price, item.title]);

		return (
			<CustomMarker
				key={item._id}
				coordinate={coordinate}
				onPress={() => handleMarkerPress(item)}
				text={text}
			/>
		);
	});
};

export const MemoizedMarkerList = React.memo(MarkerList);
