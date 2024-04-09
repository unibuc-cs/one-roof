import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SignOutButton } from '../components';
import Button from '../components/Button';
import userService from '../services/internal/usersService';
import { useUser } from '@clerk/clerk-expo';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Background from '../components/Background';
import MapView, { Marker, MapViewProps } from 'react-native-maps';
import { theme } from '../theme';

const BUCHAREST_COORDINATES = {
	latitude: 44.4268,
	longitude: 26.1025,
};

const PINPOINTS = [
	{ latitude: 44.4268, longitude: 26.1025 },
	{ latitude: 44.425, longitude: 26.1045 },
	{ latitude: 44.427, longitude: 26.105 },
	{ latitude: 44.45, longitude: 26.2 },
];

export const HomeScreen = () => {
	const { user } = useUser();

	return (
		<View>
			<MapView
				style={styles.map as MapViewProps}
				initialRegion={{
					latitude: BUCHAREST_COORDINATES.latitude,
					longitude: BUCHAREST_COORDINATES.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				{PINPOINTS.map((pinpoint, index) => (
					<Marker
						key={index}
						coordinate={pinpoint}
						title="Cozy Apartment"
						description="Nice place to stay!"
					/>
				))}
			</MapView>
		</View>
	);
};

const styles = {
	map: {
		height: '100%',
		width: '100%',
	},
};
