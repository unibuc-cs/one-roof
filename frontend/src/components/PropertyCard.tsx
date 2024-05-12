import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { IListing } from '../models';
import { DetailBox, HeaderText } from '.';
import { useNavigation } from '@react-navigation/native';

type PropertyCardProps = {
	listing: IListing,
	canOpen: boolean,
};

const PropertyCard: React.FC<PropertyCardProps> = ({ listing, canOpen }) => {
	const { navigate }  = useNavigation();
	return (
		<Card style={styles.cardContainer}>
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					{canOpen && (
						<Button mode="elevated" style={styles.openButton} onPress={() => navigate('Listing', { id: listing._id })}>
							Open
						</Button>
					)}
					{/* TODO: de pus o galerie mai frumoasa */}
					<Image
						source={{
							uri: listing.photos[0]
						}}
						style={styles.image}
					/>
				</View>
				<HeaderText paddingTop={0} paddingBottom={10} size={20}> {listing.price} RON </HeaderText>
				<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
					<DetailBox content={`${listing.size} m2`}/>
					<DetailBox content={`${listing.numberOfRooms} bedrooms`}/>
					<DetailBox content={`${listing.numberOfBathrooms} bathrooms`}/>
				</View>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: 'white',
		zIndex: 1000,
		padding: 30,
	},
	imageContainer: {
		position: 'relative',
		width: '100%',
		height: 150,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		borderRadius: 10,
	},
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	openButton: {
		zIndex: 100,
		position: 'absolute',
		top: 5,
		left: '75%'
	}
});

export default PropertyCard;
