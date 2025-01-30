import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../../theme';

interface CustomMarkerProps {
	coordinate: {
		latitude: number,
		longitude: number,
	},
	onPress?: () => void,
	text: string,
	tracks?: boolean,
}

export const VanillaCustomMarker: React.FC<CustomMarkerProps> = ({
	coordinate,
	onPress,
	text,
	tracks = false,
}) => {
	return (
		<Marker
			coordinate={coordinate}
			onPress={onPress}
			tracksViewChanges={tracks}
		>
			<View style={styles.container}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</Marker>
	);
};

export const CustomMarker = React.memo(
	VanillaCustomMarker,
	(prevProps, nextProps) =>
		prevProps.coordinate === nextProps.coordinate &&
		prevProps.text === nextProps.text &&
		prevProps.tracks === nextProps.tracks,
);

const styles = StyleSheet.create({
	text: {
		color: theme.colors.inverseSurface,
		fontFamily: 'ProximaNova-Bold',
		fontSize: 13,
	},
	container: {
		backgroundColor: theme.colors.inversePrimary,
		padding: 7,
		borderRadius: 20,
		borderColor: theme.colors.inverseSurface,
		borderWidth: 1.5,
	},
});
