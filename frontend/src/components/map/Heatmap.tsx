import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCoordinatesFromLocation, mapStyles } from '../../utils';
import { IListing, IReview } from '../../models';
import { useSearchContext } from '../../contexts/SearchContext';
import { theme } from '../../theme';
import { MultiSelect } from 'react-native-element-dropdown';
import environmentalData from '../../../assets/data/environmental_data.json';
import { useFocusEffect } from '@react-navigation/native';
import { debounce } from 'lodash';
import { Card } from 'react-native-paper';
import MapView, { Heatmap } from 'react-native-maps';

const EPSILON = 0.001;

interface DataPoint {
	latitude: number,
	longitude: number,
	pm2_5: number,
}

interface ScoredPoint {
	latitude: number,
	longitude: number,
	weight: number,
}

const weightOptions = [
	{ label: 'Price', value: 'price' },
	{ label: 'Review Score', value: 'review' },
	{ label: 'Air Pollution', value: 'pollution' }
];

export const HeatmapComponent: React.FC = () => {
	const mapRef = useRef(null);
	const [legalToUpdate, setLegalToUpdate] = useState<boolean>(true);
	const { state, triggerSearch, setIsWaitingForSearch } = useSearchContext();
	const [scoredPoints, setScoredPoints] = useState<ScoredPoint[]>([]);
	const [selectedWeights, setSelectedWeights] = useState(['price', 'review', 'pollution']);

	useFocusEffect(React.useCallback(() => {
		triggerSearch(state.region, false);
	}, [triggerSearch, state.region]));


	useEffect(() => {
		if (state.filteredListings.length > 0 && state.filteredReviews.length > 0) {
			calculateHeatmapData();
		}
	}, [state.filteredListings, state.filteredReviews, selectedWeights, triggerSearch]);

	const debouncedRegionUpdate = useCallback(
		debounce((newRegion) => {
			triggerSearch(newRegion, false);
		}, 600),
		[triggerSearch],
	);


	const handleMapLoaded = useCallback(() => {
		setIsWaitingForSearch(true);
		debouncedRegionUpdate(state.region);
	}, []);

	const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
		return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2);
	};

	const findClosest = (lat: number, lon: number, data: (IListing | IReview)[], key: string) => {
		let minDistance = Number.MAX_VALUE;
		let closestValue = null;

		for (const item of data) {
			const itemCoords = getCoordinatesFromLocation(item.location);
			const distance = getDistance(lat, lon, itemCoords.latitude, itemCoords.longitude);

			if (distance < minDistance) {
				minDistance = distance;
				closestValue = item[key];
			}
		}

		return closestValue ?? 0;
	};

	const calculateHeatmapData = () => {
		const listingPrices = state.filteredListings.map((l) => l.price);
		const minPrice = Math.min(...listingPrices);
		const maxPrice = Math.max(...listingPrices);

		const reviewScores = state.filteredReviews.map((r) => r.recommend);
		const minReview = Math.min(...reviewScores);
		const maxReview = Math.max(...reviewScores);

		const pollutionLevels = environmentalData.map((p) => p.pm2_5);
		const minPollution = Math.min(...pollutionLevels);
		const maxPollution = Math.max(...pollutionLevels);

		const normalize = (value: number, min: number, max: number) =>
			max - min === 0 ? 0.5 : (value - min) / (max - min);

		const selectedWeightCount = selectedWeights.length;


		const scored: ScoredPoint[] = environmentalData.map((point: DataPoint) => {
			const closestPrice = findClosest(point.latitude, point.longitude, state.filteredListings, 'price');
			const closestReview = findClosest(point.latitude, point.longitude, state.filteredReviews, 'score');

			const normalizedPrice = 1 - normalize(closestPrice, minPrice, maxPrice);
			const normalizedReview = normalize(closestReview, minReview, maxReview);
			const normalizedPollution = 1 - normalize(point.pm2_5, minPollution, maxPollution);

			const PRICE_WEIGHT = 0.4, POLLUTION_WEIGHT = 0.3, REVIEW_WEIGHT = 0.3;
			let totalWeight = 0;
			if (selectedWeights.includes('price')) totalWeight += PRICE_WEIGHT;
			if (selectedWeights.includes('review')) totalWeight += REVIEW_WEIGHT;
			if (selectedWeights.includes('pollution')) totalWeight += POLLUTION_WEIGHT;
			if (totalWeight === 0) {
				return {
					latitude: point.latitude as number,
					longitude: point.longitude as number,
					weight: 0
				};
			}

			let score = 0;
			if (selectedWeights.includes('price')) {
				const fraction = PRICE_WEIGHT / totalWeight;
				// "small price is better"? => use (1 - normalizedPrice)
				score += fraction * (1 - normalizedPrice);
			}
			if (selectedWeights.includes('review')) {
				const fraction = REVIEW_WEIGHT / totalWeight;
				score += fraction * normalizedReview;
			}
			if (selectedWeights.includes('pollution')) {
				const fraction = POLLUTION_WEIGHT / totalWeight;
				// "small pollution is better" => (1 - normalizedPollution)
				score += fraction * (1 - normalizedPollution);
			}
			return {
				latitude: point.latitude as number,
				longitude: point.longitude as number,
				weight: score as number,
			};
		});

		setScoredPoints(scored);
	};

	return (
		<View style={styles.container}>
			<View style={styles.map}>
				<MapView
					ref={mapRef}
					style={styles.map}
					onMapLoaded={handleMapLoaded}
					initialRegion={state.region}
					customMapStyle={mapStyles}
				>
					{scoredPoints.length > 0 && <Heatmap points={scoredPoints} radius={50} opacity={0.7}/>}
				</MapView>
				<Card style={styles.bottomCardContainer}>
					<MultiSelect
						fontFamily={'ProximaNova-Bold'}
						activeColor={'white'}
						data={weightOptions}
						labelField="label"
						valueField="value"
						value={selectedWeights}
						containerStyle={{
							padding: 15,
							backgroundColor: theme.colors.inversePrimary
						}}
						itemContainerStyle={{
							backgroundColor: theme.colors.inversePrimary,
							marginBottom: 5,
						}}
						visibleSelectedItem={false}
						selectedTextStyle={{
							fontFamily: 'ProximaNova-Bold',
							color: theme.colors.primary,
						}}
						onChange={setSelectedWeights}
						placeholder="Select weight factors"
						placeholderStyle={{
							fontFamily: 'ProximaNova-Bold',
							color: theme.colors.primary,
							padding: 10,
							paddingLeft: 20
						}}
						style={{
							fontFamily: 'ProximaNova-Bold',
						}}
					/>
				</Card>

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
	},
	dropdownContainer: {
		position: 'absolute',
		top: 20,
		left: 10,
		right: 10,
		zIndex: 1000,
	},

	bottomCardContainer: {
		position: 'absolute',
		bottom: 0,
		height: '10%',
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
