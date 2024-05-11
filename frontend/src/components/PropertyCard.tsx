import React from 'react';
import { Image, Text, StyleSheet, Dimensions, View } from 'react-native';
import { Card } from 'react-native-paper';
import { IListing } from '../models';
import { DetailBox, HeaderText } from '.';
import { ProfilePicture } from './ProfilePicture';


const { width } = Dimensions.get('window');

type PropertyCardProps = {
	listing: IListing,
};

const PropertyCard: React.FC<PropertyCardProps> = ({ listing }) => {
	return (
		<Card style={styles.cardContainer}>
			<View style={styles.contentContainer}>
				{/* TODO: de pus o galerie mai frumoasa */}
				<Image
					source={{
						uri: listing.photos[0]
					}}
					style={{
						width: '100%',
						height: 150,
					}}
				/>
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
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
});

export default PropertyCard;
