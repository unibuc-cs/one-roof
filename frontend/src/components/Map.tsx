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
	const { state, setRegion, triggerSearch } = useSearchContext();
	const [localRegion, setLocalRegion] = useState(state.region);

	const handleClose = useCallback(() => setSelectedItem(undefined), []);

	const handleMarkerPress = useCallback((item: IMapItem) => {
		setSelectedItem(prevItem => (prevItem === item ? undefined : item));
	}, []);

	const debouncedTriggerSearch = useCallback((regionToSearch) => {
		triggerSearch(regionToSearch);
	}, [triggerSearch]);

	const handleRegionChange = useCallback(debounce((region) => {
		if (needsUpdate(localRegion, region)) {
			debouncedTriggerSearch(region);
		}
	}, 600), [debouncedTriggerSearch]);


	const needsUpdate = (oldRegion, newRegion) => {
		return Math.abs(newRegion.latitude - oldRegion.latitude) > EPSILON ||
			Math.abs(newRegion.longitude - oldRegion.longitude) > EPSILON ||
			Math.abs(newRegion.latitudeDelta - oldRegion.latitudeDelta) > EPSILON ||
			Math.abs(newRegion.longitudeDelta - oldRegion.longitudeDelta) > EPSILON;
	};
	//
	// useEffect(() => {
	// 	setLocalRegion(state.region);
	// }, [state.filteredListings, state.filteredReviews]);

	return (
		<View style={styles.map}>
			<MapView
				style={styles.map}
				initialRegion={localRegion}
				onRegionChangeComplete={handleRegionChange}
				customMapStyle={mapStyles}
				onPress={() => setSelectedItem(undefined)}
			>
				{(state.searchType === 'listings' ? state.filteredListings : state.filteredReviews).map((item, index) => (
					<CustomMarker
						key={index}
						coordinate={getCoordinatesFromLocation(item.location)}
						onPress={() => handleMarkerPress(item)}
						text={state.searchType === SearchTypeEnum.Listings ? `${item.price} €` : 'review'}
					>
					</CustomMarker>
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