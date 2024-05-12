import React from 'react';
import { View, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../components';

type ListingScreenRouteProp = RouteProp<RootStackParamList, 'Listing'>;

export const ListingScreen: React.FC = () => {
	const route = useRoute<ListingScreenRouteProp>();
	const { title } = route.params;

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Listing ID: {title}</Text>
		</View>
	);
};

