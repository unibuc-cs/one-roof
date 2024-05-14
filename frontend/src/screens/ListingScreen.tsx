import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../components';
import { useUser } from '@clerk/clerk-expo';
import { useListing } from '../hooks';
import Background from "../components/Background";
import Carousel from 'react-native-reanimated-carousel';
import PropertyDetails from "../components/PropertyDetails";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Card} from "react-native-paper";
import LandlordDetails from "../components/LandlordDetails";

type ListingScreenRouteProp = RouteProp<RootStackParamList, 'Listing'>;

export const ListingScreen: React.FC = () => {
	const route = useRoute<ListingScreenRouteProp>();
	const { id } = route.params;
	const { user } = useUser();
	const { listing } = useListing(id, user?.id as string);
	const width = Dimensions.get('window').width;

	if (listing == null) {
		return <Text>Error - listing not found</Text>;
	}

	return (
		<Background>
			<Card style={styles.container}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{listing.title}</Text>
					<Text style={styles.price}>Price: {listing.price} RON</Text>
					<Text>
						<Icon name={'map-marker'}/>
							{listing.address.city}, {listing.address.stateOrProvince}, {listing.address.country}
					</Text>
				</View>
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
				<PropertyDetails listing = {listing}/>
				<Text style={styles.description}>{listing.description}</Text>
				<LandlordDetails landlord = {listing.landlordId}/>

			</Card>
		</Background>
	);
};
// TODO: add amenities
// TODO: add landlord information
// TODO: Include map?

const styles = StyleSheet.create({
	container: {
		padding: 20,
		marginVertical: 20,
		paddingVertical: 20,
		margin: 10,
		backgroundColor: 'white'
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	titleContainer:{
		paddingBottom: 20,
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	description: {
		marginTop: 5,
		marginBottom: 10,
	},
	price: {
		paddingVertical: 5,
		fontSize: 20,
		fontWeight: 'bold',
		color: 'green',
	},

});

