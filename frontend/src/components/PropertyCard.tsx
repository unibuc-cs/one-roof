import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { IListing } from '../models';
import { DetailBox, HeaderText } from '.';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import Carousel from 'react-native-reanimated-carousel';

type PropertyCardProps = {
	listing: IListing,
	canOpen: boolean,
	mode?: string,
	backgroundColor?: string,
};

const PropertyCard: React.FC<PropertyCardProps> = ({ listing, canOpen, mode, backgroundColor  }) => {
	const { navigate }  = useNavigation();
	const width = Dimensions.get('window').width;

	return (
		<Card mode={mode ?? 'elevated'} key={listing._id} style={[styles.cardContainer, {
			backgroundColor: backgroundColor ?? theme.colors.background
		}]}>
			<View style={styles.contentContainer}>
				<View style={styles.imageContainer}>
					{canOpen && (
						<Button
							mode="elevated"
							style={styles.openButton}
							onPress={() => navigate('Listing', { id: listing._id })}
						>
							Open
						</Button>
					)}
					{/* TODO: de pus o galerie mai frumoasa */}
					<Carousel
						loop
						width={width - 100}
						height={width / 2}
						autoPlay={true}
						data= {listing.photos}
						autoPlayInterval={5000}
						scrollAnimationDuration={1000}
						renderItem={({ index }) => (
							<View>
								<Image
									style={styles.image}
									source={{
										uri: listing.photos[index]
									}}
								/>
							</View>
						)}
					/>
				</View>
				<HeaderText paddingTop={0} paddingBottom={10} size={20}> {listing.price} RON </HeaderText>
				<Text style={styles.address}>
					{listing.address}
				</Text>
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
	address: {
		marginBottom: 15,
		fontSize: 16,
		fontFamily: 'ProximaNova-Regular'
	},
	cardContainer: {
		zIndex: 1000,
		padding: 30,
		height: 350,
		marginHorizontal: 15,
		marginBottom: 30
	},
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%'
	},
	imageContainer: {
		marginTop: 100,
		width: '100%',
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 10,
	},
	openButton: {
		zIndex: 100,
		position: 'absolute',
		top: 5,
		left: '74%'
	}
});

export default PropertyCard;
