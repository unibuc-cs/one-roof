import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getCoordinatesFromLocation, mapStyles } from '../../utils';
import { IListing, IReview } from '../../models';
import { useSearchContext } from '../../contexts/SearchContext';
import { theme } from '../../theme';
import environmentalData from '../../../assets/data/environmental_data.json';
import { MultiSelect } from 'react-native-element-dropdown';
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
	const { state } = useSearchContext();
	const [scoredPoints, setScoredPoints] = useState<ScoredPoint[]>([]);
	const [selectedWeights, setSelectedWeights] = useState(['price', 'review', 'pollution']);


	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		const intervalId = setInterval(() => {
	// 			calculateHeatmapData();
	// 		}, 1000); // Runs every 1 second
	//
	// 		return () => clearInterval(intervalId); // Cleanup on unmount
	// 	}, [state.listings, state.reviews])
	// );
	//
	// useFocusEffect(
	// 	() => {
	// 		calculateHeatmapData();
	// 	});
	// useEffect(() => {
	// 	calculateHeatmapData();
	// }, [state.filteredListings, state.filteredReviews, selectedWeights]);

	// useEffect(() => {
	// 	calculateHeatmapData();
	// }, []);

	useEffect(() => {
		console.error(state);
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
		console.error('inainte ajung aici? ', state.listings.length, state.reviews.length);
		console.error('ajung aici? ', state.listings.length, state.reviews.length);

		const listingPrices = state.listings.map((l) => l.price);
		const minPrice = Math.min(...listingPrices);
		const maxPrice = Math.max(...listingPrices);

		const reviewScores = state.reviews.map((r) => r.recommend);
		const minReview = Math.min(...reviewScores);
		const maxReview = Math.max(...reviewScores);

		const pollutionLevels = environmentalData.map((p) => p.pm2_5);
		const minPollution = Math.min(...pollutionLevels);
		const maxPollution = Math.max(...pollutionLevels);

		const normalize = (value: number, min: number, max: number) =>
			max - min === 0 ? 0.5 : (value - min) / (max - min);

		const selectedWeightCount = selectedWeights.length;
		const weightValue = selectedWeightCount ? 1 / selectedWeightCount : 0;

		console.error('env data here', environmentalData);
		const scored = environmentalData.map((point) => {
			const closestPrice = findClosest(point.latitude, point.longitude, state.listings, 'price');
			const closestReview = findClosest(point.latitude, point.longitude, state.reviews, 'score');

			console.error('closestPrice', closestPrice);
			console.error('closestReview', closestReview);

			const normalizedPrice = 1 - normalize(closestPrice, minPrice, maxPrice);
			const normalizedReview = normalize(closestReview, minReview, maxReview);
			const normalizedPollution = 1 - normalize(point.pm2_5, minPollution, maxPollution);

			let score = 0;
			if (selectedWeights.includes('price')) score += weightValue * normalizedPrice;
			if (selectedWeights.includes('review')) score += weightValue * normalizedReview;
			if (selectedWeights.includes('pollution')) score += weightValue * normalizedPollution;

			return {
				latitude: point.latitude,
				longitude: point.longitude,
				weight: score,
			};
		});

		console.error('scored', scored);
		setScoredPoints(scored);
	};

	// console.error('scoredPoints', scoredPoints);
	// console.error('selectedWeights', selectedWeights);
	// console.error('env data', environmentalData);
	return (
		<View style={styles.container}>
			<MultiSelect
				data={weightOptions}
				labelField="label"
				valueField="value"
				value={selectedWeights}
				onChange={setSelectedWeights}
				placeholder="Select weight factors"
				selectedStyle={styles.selectedItems}
				containerStyle={styles.dropdownContainer}
			/>

			<View style={styles.map}>
				<MapView
					ref={mapRef}
					style={styles.map}
					initialRegion={state.region}
					customMapStyle={mapStyles}
				>
					{scoredPoints.length > 0 && <Heatmap points={scoredPoints} radius={50} opacity={0.6}/>}
				</MapView>

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
	selectedItems: {
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		padding: 5,
	},
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
