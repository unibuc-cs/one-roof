import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PropertyCard from '../components/PropertyCard';  // Assuming PropertyCard is your listing component
import { HeaderText } from '../components';
import { listingService } from '../services';
import { useUser } from '@clerk/clerk-expo';

export const SavedListDetailsScreen: React.FC = ({ route }) => {
	const { user } = useUser();
	const { savedList} = route.params;
	const  savedListings = savedList.savedListings;
	const [listings, setListings] = useState<any[]>([]); // what are these?
	const [loading, setLoading] = useState<boolean>(true);

	if (savedListings)
	{
		useEffect(() => {
			const fetchListings = async () => {
				const fetchedListings = await Promise.all(savedListings.map(id => listingService.getListing(id, user?.id)));
				setListings(fetchedListings.filter(listing => listing !== null));
				setLoading(false);
			};

			fetchListings();
		}, [savedListings]);
	}

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
