import MapView from 'react-native-map-clustering';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCoordinatesFromLocation, mapStyles, } from '../../utils';
import { IListing, IReview } from '../../models';
import { BottomItemCard } from '../BottomItemCard';
import { useSearchContext } from '../../contexts/SearchContext';
import { debounce } from 'lodash';
import { theme } from '../../theme';
import { CustomMarker } from './CustomMarker';
import { Heatmap } from 'react-native-maps';

const EPSILON = 0.001;

type IMapItem = IListing | IReview;

export const HeatmapComponent: React.FC = () => {
	const mapRef = useRef(null);
	const [legalToUpdate, setLegalToUpdate] = useState<boolean>(true);
	const [selectedItem, setSelectedItem] = useState<IMapItem>();
	const {
		state,
		setIsWaitingForSearch,
		setWasExternalSearchPerformed,
		triggerSearch,
	} = useSearchContext();

	const handleClose = useCallback(() => setSelectedItem(undefined), []);

	const handleMarkerPress = useCallback((item: IMapItem) => {
		setSelectedItem((prevItem) => (prevItem === item ? undefined : item));
	}, []);

	const debouncedRegionUpdate = useCallback(
		debounce((newRegion) => {
			triggerSearch(newRegion, false);
		}, 600),
		[triggerSearch],
	);

	const handleRegionChangeComplete = useCallback(
		(newRegion) => {
			if (needsUpdate(state.region, newRegion)) {
				if (legalToUpdate) {
					setIsWaitingForSearch(true);
					debouncedRegionUpdate(newRegion);
				} else {
					setLegalToUpdate(true);
				}
			}
		},
		[state.region, legalToUpdate, debouncedRegionUpdate],
	);

	const handleMapLoaded = useCallback(() => {
		setIsWaitingForSearch(true);
		debouncedRegionUpdate(state.region);
	}, []);

	const needsUpdate = (oldRegion, newRegion) => {
		return (
			Math.abs(newRegion.latitude - oldRegion.latitude) > EPSILON ||
			Math.abs(newRegion.longitude - oldRegion.longitude) > EPSILON ||
			Math.abs(newRegion.latitudeDelta - oldRegion.latitudeDelta) > EPSILON ||
			Math.abs(newRegion.longitudeDelta - oldRegion.longitudeDelta) > EPSILON
		);
	};

	useEffect(() => {
		if (mapRef.current && state.wasExternalSearchPerformed) {
			mapRef.current.animateToRegion(state.region, 1000);
			setWasExternalSearchPerformed(false);
			setLegalToUpdate(false);
		}
	}, [state.wasExternalSearchPerformed]);

	// ✅ Convert Listings to Heatmap Points
	const heatmapPoints = state.filteredListings.map((listing) => ({
		latitude: getCoordinatesFromLocation(listing.location).latitude,
		longitude: getCoordinatesFromLocation(listing.location).longitude,
		weight: listing.price, // Higher price = more intense heatmap
	}));

	return (
		<View style={styles.map}>
			<MapView
				clusterColor={theme.colors.primary}
				ref={mapRef}
				style={styles.map}
				initialRegion={state.region}
				onMapLoaded={handleMapLoaded}
				onRegionChangeComplete={handleRegionChangeComplete}
				customMapStyle={mapStyles}
				onPress={() => setSelectedItem(undefined)}
				tracksViewChanges={false}
			>
				<Heatmap points={heatmapPoints} radius={30} opacity={0.6}/>

				{state.filteredListings.map((listing) => (
					<CustomMarker
						key={`listing-${listing._id}`}
						coordinate={getCoordinatesFromLocation(listing.location)}
						onPress={() => handleMarkerPress(listing)}
						text={`${listing.price} €`}
					/>
				))}
			</MapView>

			{selectedItem && (
				<View style={styles.bottomCardContainer}>
					<BottomItemCard
						item={selectedItem as IListing}
						onClose={handleClose}
					/>
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

