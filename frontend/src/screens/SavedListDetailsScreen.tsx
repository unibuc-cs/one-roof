import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropertyCard from '../components/PropertyCard'; // Assuming PropertyCard is your listing component
import { HeaderText } from '../components';
import { listingService, savedListService } from '../services';
import { useUser } from '@clerk/clerk-expo';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { IListing } from '../models';

type SavedListDetailsScreenProps = {
	route: RouteProp<{ params: { savedListId: string } }, 'params'>,
};

export const SavedListDetailsScreen: React.FC<SavedListDetailsScreenProps> = (props) => {
	const savedListId = props.route.params.savedListId;
	const { user } = useUser();

	const [listings, setListings] = useState<IListing[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useFocusEffect(
		useCallback(() => {
			const fetchListings = async () => {
				try {
					setLoading(true);

					const savedListDetails = await savedListService.getSavedList(savedListId, user?.id ?? '');
					const savedListingsIds = savedListDetails.savedListings;
					// Fetch listings based on the saved list details
					const fetchedListings = await Promise.all(
						savedListingsIds.map(id => listingService.getListing(id, user?.id ?? ''))
					);

					// Remove null values (failed fetches)
					setListings(fetchedListings.filter(listing => listing !== null));
				} catch (error) {
					console.error('Error fetching saved listings:', error);
				} finally {
					setLoading(false);
				}
			};

			fetchListings();
		}, [savedListId, user?.id]) // Ensure it re-runs if the saved list ID or user ID changes
	);


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
