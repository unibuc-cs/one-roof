import MapView from 'react-native-maps';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	BUCHAREST_COORDINATES,
	DEFAULT_LATITUDE_DELTA,
	DEFAULT_LONGITUDE_DELTA,
	getCoordinatesFromLocation,
	mapStyles
} from '../utils';
import { IListing, IReview } from '../models';
import { BottomListingCard } from './BottomListingCard';
import { useSearchContext } from '../contexts/SearchContext';
import { SearchTypeEnum } from '../enums';
import { BottomReviewCard } from './BottomReviewCard';
import { CustomMarker } from './CustomMarker';
import { debounce } from 'lodash';

const EPSILON = 0.001;

type IMapItem = IListing | IReview;

export const Map: React.FC = () => {
	const [selectedItem, setSelectedItem] = React.useState<IMapItem>();
	const { state, setIsWaitingForSearch, triggerSearch } = useSearchContext();

	const handleClose = useCallback(() => setSelectedItem(undefined), []);

	const handleMarkerPress = useCallback((item: IMapItem) => {
		setSelectedItem(prevItem => (prevItem === item ? undefined : item));
	}, []);

	const debouncedRegionUpdate = useCallback(debounce((newRegion) => {
		triggerSearch(newRegion);
	}, 600), [triggerSearch]);

	const handleRegionChangeComplete = useCallback((newRegion) => {
		if (needsUpdate(state.region, newRegion)) {
			setIsWaitingForSearch(true);
			debouncedRegionUpdate(newRegion);
		}
	}, [state.region, debouncedRegionUpdate]);

	const needsUpdate = (oldRegion, newRegion) => {
		return Math.abs(newRegion.latitude - oldRegion.latitude) > EPSILON ||
			Math.abs(newRegion.longitude - oldRegion.longitude) > EPSILON ||
			Math.abs(newRegion.latitudeDelta - oldRegion.latitudeDelta) > EPSILON ||
			Math.abs(newRegion.longitudeDelta - oldRegion.longitudeDelta) > EPSILON;
	};

	return (
		<View style={styles.map}>
			<MapView
				style={styles.map}
				initialRegion={state.region}
				onRegionChangeComplete={handleRegionChangeComplete}
				customMapStyle={mapStyles}
				onPress={() => setSelectedItem(undefined)}
			>
				{(state.searchType === 'listings' ? state.filteredListings : state.filteredReviews).map((item, index) => (
					<CustomMarker
						key={index}
						coordinate={getCoordinatesFromLocation(item.location)}
						onPress={() => handleMarkerPress(item)}
						text={state.searchType === SearchTypeEnum.Listings ? `${item.price} €` : 'review'}
					/>
				))}
			</MapView>
			{selectedItem && (
				<View style={styles.bottomCardContainer}>
					{state.searchType === SearchTypeEnum.Listings ?
						<BottomListingCard item={selectedItem as IListing} onClose={handleClose} /> :
						<BottomReviewCard item={selectedItem as IReview} onClose={handleClose} />
						}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	bottomCardContainer: {
		position: 'absolute',
		bottom: 0,
		height: 400,
		width: '100%',
		zIndex: 1000,
	},
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});