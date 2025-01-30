import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { theme } from '../../theme';

interface PriceRangeSelectorProps {
	priceRangeRef: React.MutableRefObject<number[]>,
	minPrice: number,
	maxPrice: number,
	onPriceChange: (newRange: number[]) => void,
	sliderScale: number,
}

export const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
	priceRangeRef,
	minPrice,
	maxPrice,
	onPriceChange,
	sliderScale = 1,
}) => {
	const handlePriceChange = (newValues: number[]) => {
		priceRangeRef.current = newValues;
		onPriceChange(newValues);
	};

	return (
		<View>
			<View style={styles.priceContainer}>
				<Text style={styles.priceStyling}>
					{priceRangeRef.current[0]} €{' '}
				</Text>
				<Text> - </Text>
				<Text style={styles.priceStyling}>
					{priceRangeRef.current[1]} €{' '}
				</Text>
			</View>
			<MultiSlider
				trackStyle={styles.trackStyle}
				values={priceRangeRef.current}
				sliderLength={300 * sliderScale}
				onValuesChangeFinish={handlePriceChange}
				min={minPrice}
				max={maxPrice}
				step={1}
				allowOverlap={false}
				snapped
				minMarkerOverlapDistance={40}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	checkbox: {
		fontFamily: 'Proxima-Nova/Regular',
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	priceContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	priceStyling: {
		fontFamily: 'Proxima-Nova/Regular',
		backgroundColor: 'lightgray',
		fontSize: 18,
		padding: 10,
		margin: 10,
		marginBottom: 0,
		borderRadius: 20,
		elevation: 5,
		borderColor: 'darkgray',
		borderStyle: 'solid',
		borderWidth: 1,
		color: theme.colors.text,
	},
	container: {
		flex: 1,
		margin: 10,
		marginTop: 50,
	},
	filtersContainer: {
		maxHeight: '90%',
		elevation: 3,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
