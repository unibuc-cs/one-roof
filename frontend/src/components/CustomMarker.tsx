import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { theme } from '../theme';


export const CustomMarker: React.FC<any> = React.memo(({ coordinate, onPress, text, tracks = false }) => {
	return (
		<Marker coordinate={coordinate} onPress={onPress} tracksViewChanges={tracks}>
			<View style={styles.container}>
				<Text style={styles.text}>{text}</Text>
			</View>
		</Marker>
	);
}, (prevProps, nextProps) =>
	prevProps.location === nextProps.location &&
        prevProps.text === nextProps.text &&
        prevProps.tracks === nextProps.tracks
);

const styles = StyleSheet.create({
	text: {
		color: theme.colors.inverseSurface,
		fontFamily: 'ProximaNova-Bold',
		fontSize: 13
	},
	container: {
		backgroundColor: theme.colors.inversePrimary,
		padding: 7,
		borderRadius: 20,
		borderColor: theme.colors.inverseSurface,
		borderWidth: 1.5
	},
});