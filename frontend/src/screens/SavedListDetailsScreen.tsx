import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PropertyCard from '../components/PropertyCard';  // Assuming PropertyCard is your listing component
import { HeaderText } from '../components';
import { listingService } from '../services';
import { useUser } from '@clerk/clerk-expo';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { IListing } from '../models';

type SavedListDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'SavedListDetails'
>;

export const SavedListDetailsScreen: React.FC = () => {
	const { user } = useUser();
	const route = useRoute<SavedListDetailsScreenRouteProp>(); // Use RouteProp to type the route
	const { sharedWith, savedListings } = route.params; // Extract route params

	const [listings, setListings] = useState<IListing[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchListings = async () => {
			const fetchedListings = await Promise.all(savedListings.map(id => listingService.getListing(id, user?.id ?? '')));
			setListings(fetchedListings.filter(listing => listing !== null));
			setLoading(false);
		};

		fetchListings();
	}, []);

	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<HeaderText size={40}>Listings in Saved List</HeaderText>
				{loading ? (
					<HeaderText size={20}>Loading listings...</HeaderText>
				) : listings.length === 0 ? (
					<HeaderText size={20}>No listings in this saved list!</HeaderText>
				) : (
					listings.map((listing) => (
						<PropertyCard
							key={listing._id}
							listing={listing}
							canOpen={true}
							mode="contained"
							showCarousel={false}
							showFavorite={false}
							backgroundColor="white"
						/>
					))
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%'
	},
	wrapper: {
		marginTop: 50,
		width: '100%',
	},
});
