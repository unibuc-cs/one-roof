import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropertyCard from '../components/PropertyCard'; // Assuming PropertyCard is your listing component
import { HeaderText } from '../components';
import { listingService } from '../services';
import { useUser } from '@clerk/clerk-expo';
import { IListing } from '../models';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { useEffect } from 'react';

export const HistoryScreen: React.FC = () => {
	const { user } = useUser();
	const { viewedListings } = useUserDetails();
	const [listings, setListings] = useState<IListing[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchListings = async () => {
			const fetchedListings = await Promise.all(viewedListings.map(id => listingService.getListing(id, user?.id ?? '')));
			setListings(fetchedListings.filter(listing => listing !== null));
			setLoading(false);
		};

		fetchListings();
	}, [viewedListings]);

	return (
		<View style={styles.wrapper}>
			<ScrollView style={styles.container}>
				<HeaderText size={40}>Your Viewing History</HeaderText>
				{loading ? (
					<HeaderText size={20}>Loading listings...</HeaderText>
				) : listings.length === 0 ? (
					<HeaderText size={20}>No listings viewed!</HeaderText>
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
