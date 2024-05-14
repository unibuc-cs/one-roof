import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Button, HeaderText } from '../components';
import { NumberOfBathroomsEnum, NumberOfBedroomsEnum, PropertyTypeEnum } from '../enums';
import { CustomSwitchSelector } from '../components/CustomSwitchSelector';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useCustomFonts } from '../hooks/useCustomFonts';
import { theme } from '../theme';
import RentalAmenitiesEnum from '../enums/RentalAmenitiesEnum';
import { MAX_PRICE, MIN_PRICE } from '../utils';
import { useSearchContext } from '../contexts/SearchContext';

const amenities = ['WiFi', 'Parking', 'Pool', 'Gym'];

export const FiltersScreen = ({ navigation }) => {
	useCustomFonts();
	const [cleared, setCleared] = useState<boolean>(false);
	const { state, setFilters, triggerSearch } = useSearchContext();
	const { filters } = state;
	const amenitiesArray = Object.entries(RentalAmenitiesEnum);

	const clearFilters = () => {
		setFilters({
			roomType: PropertyTypeEnum.Any,
			priceRange: { min: MIN_PRICE, max: MAX_PRICE },
			bedrooms: NumberOfBedroomsEnum.Any,
			bathrooms: NumberOfBathroomsEnum.Any,
			amenities: [],
		});
		setCleared(true);
	};

	const navigateToHome = () => setTimeout(() => navigation.navigate('Home'), 500);


	useEffect(() => {
		if (cleared) {
			triggerSearch();
			setCleared(false);
			navigateToHome();
		}
	}, [cleared]);

	const handleSearch = () => {
		triggerSearch();
		navigateToHome();
	};

	const handleSelectAmenity = (amenity) => {
		const updatedAmenities = filters.amenities.includes(amenity)
			? filters.amenities.filter(item => item !== amenity)
			: [...filters.amenities, amenity];
		setFilters({ ...filters, amenities: updatedAmenities });
	};

	const handlePriceChange = (values) => {
		setFilters({ ...filters, priceRange: { min: values[0], max: values[1] } });
	};

	const handleRoomChange = (value) => {
		setFilters({ ...filters, roomType: value });
	};

	const handleChangeBedrooms = (value) => {
		setFilters({ ...filters, bedrooms: value });
	};

	const handleChangeBathrooms = (value) => {
		setFilters({ ...filters, bathrooms: value });
	};

	return (
		<View style={styles.container}>
			<View
				style={styles.filtersContainer}
			>
				<HeaderText paddingBottom={10} textAlign={'left'} size={17}>Property Type:</HeaderText>
				<CustomSwitchSelector
					options={[
						{ label: 'Any', value: PropertyTypeEnum.Any },
						{ label: 'Studio', value: PropertyTypeEnum.Studio },
						{ label: 'Room', value: PropertyTypeEnum.Room },
						{ label: 'House', value: PropertyTypeEnum.House },
					]}
					onPress={handleRoomChange}
					value={filters.roomType}
					mode={'green'}
				/>

				<HeaderText textAlign={'left'} size={17}>Price Range (monthly fee):</HeaderText>
				<View style={styles.flexContainer}>
					<View style={styles.priceContainer}>
						<Text style={styles.priceStyling}>{filters.priceRange?.min} RON </Text>
						<Text> - </Text>
						<Text style={styles.priceStyling}>{filters.priceRange?.max} RON </Text>
					</View>
					<View>
						<MultiSlider
							values={[
								filters.priceRange?.min,
								filters.priceRange?.max
							]}
							sliderLength={300}
							onValuesChange={handlePriceChange}
							min={MIN_PRICE}
							max={MAX_PRICE}
							step={1}
							allowOverlap={false}
							snapped
							minMarkerOverlapDistance={40}
						/>
					</View>
				</View>

				<HeaderText paddingBottom={5} textAlign={'left'} size={17}>Number of Bedrooms:</HeaderText>
				<CustomSwitchSelector
					options={[
						{ label: 'Any', value: NumberOfBedroomsEnum.Any },
						{ label: '1', value: NumberOfBedroomsEnum.One },
						{ label: '2', value: NumberOfBedroomsEnum.Two },
						{ label: '3', value: NumberOfBedroomsEnum.Three },
						{ label: '4+', value: NumberOfBedroomsEnum.FourOrMore }
					]}
					mode='green'
					value={filters.bedrooms}
					onPress={handleChangeBedrooms}
				/>

				<HeaderText paddingBottom={5} textAlign={'left'} size={17}>Number of Bathrooms:</HeaderText>
				<CustomSwitchSelector
					options={[
						{ label: 'Any', value: NumberOfBathroomsEnum.Any },
						{ label: '1', value: NumberOfBathroomsEnum.One },
						{ label: '2', value: NumberOfBathroomsEnum.Two },
						{ label: '3+', value: NumberOfBathroomsEnum.ThreeOrMore },
					]}
					mode='green'
					value={state.filters.bathrooms}
					onPress={handleChangeBathrooms}
				/>

				<HeaderText textAlign={'left'} size={17}>Amenities:</HeaderText>
				<ScrollView>
					{amenitiesArray.map(((amenity, index) => (
						<Checkbox.Item
							labelStyle={styles.checkbox}
							key={index}
							label={amenity[1]}
							status={filters.amenities.includes(amenity[0]) ? 'checked' : 'unchecked'}
							onPress={() => handleSelectAmenity(amenity[0])}
						/>
					)))}
				</ScrollView>
			</View>
			<View style={[styles.buttonsContainer]}>
				<Button width={'auto'} mode={'contained'} onPress={clearFilters}> Clear All </Button>
				<Button width={'auto'} mode={'contained'} onPress={handleSearch}> Search </Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	checkbox: {
		fontFamily: 'ProximaNova-Regular'
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	priceContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	priceStyling: {
		fontFamily: 'ProximaNova-Regular',
		backgroundColor: 'lightgray',
		fontSize: 18,
		margin: 10,
		padding: 10,
		borderRadius: 20,
		elevation: 5,
		borderColor: 'darkgray',
		borderStyle: 'solid',
		borderWidth: 1,
		color: theme.colors.text
	},
	container: {
		flex: 1,
		margin: 10,
		marginTop: 50,
	},
	filtersContainer: {
		maxHeight:'90%',
		elevation: 3,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginTop: 20,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20
	}
});

export default FiltersScreen;
