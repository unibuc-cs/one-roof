import React, { useRef, useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import MapView, { MapPressEvent } from 'react-native-maps';
import {
	PolygonEditor,
	PolygonEditorRef,
	MapPolygonExtendedProps,
	getRandomPolygonColors,
} from '@siposdani87/expo-maps-polygon-editor';
import { v4 as uuidv4 } from 'uuid';
import { BUCHAREST_COORDINATES, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../utils'; // Import UUID for unique keys

export const MapWithAreaPolygons: React.FC = () => {
	const mapRef = useRef<MapView>(null);
	const polygonEditorRef = useRef<PolygonEditorRef>(null);

	const [polygons, setPolygons] = useState<MapPolygonExtendedProps[]>([]);
	const [isDrawing, setIsDrawing] = useState(false);
	const [newPolygonKey, setNewPolygonKey] = useState<string | null>(null);

	// Template for new polygons
	const [strokeColor, fillColor] = getRandomPolygonColors();
	const newPolygon: MapPolygonExtendedProps = {
		key: newPolygonKey,
		coordinates: [],
		strokeWidth: 2,
		strokeColor,
		fillColor,
	};

	const handleDrawArea = () => {
		if (isDrawing) {
			Alert.alert('Already Drawing', 'Finish the current polygon first.');
			return;
		}
		// Start drawing a new polygon
		polygonEditorRef.current?.startPolygon();
		setNewPolygonKey(uuidv4());
		setIsDrawing(true);
	};

	const handleFinishDrawing = () => {
		if (!isDrawing) {
			Alert.alert('Not Drawing', 'Start drawing a polygon first.');
			return;
		}
		// Finalize the polygon
		setIsDrawing(false);
		setNewPolygonKey(null);
		polygonEditorRef.current?.selectPolygonByKey(-1);
	};

	const clickOnMap = ({ nativeEvent: { coordinate } }: MapPressEvent) => {
		if (isDrawing) {
			// Add a coordinate to the polygon being drawn
			polygonEditorRef.current?.setCoordinate(coordinate);
		}
	};

	const onPolygonCreate = (polygon: MapPolygonExtendedProps) => {
		// Generate a unique key for the polygon
		const uniqueKey = uuidv4();
		const polygonClone = { ...polygon, key: uniqueKey };
		setPolygons((prev) => [...prev, polygonClone]);
		polygonEditorRef.current?.selectPolygonByKey(uniqueKey);
	};

	const onPolygonChange = (
		index: number,
		polygon: MapPolygonExtendedProps,
	): void => {
		if (newPolygonKey !== polygon.key) {
			return;
		}
		const polygonsClone = [...polygons];
		polygonsClone[index] = polygon;
		setPolygons(polygonsClone);
	};

	const handleResetArea = () => {
		polygonEditorRef.current?.resetAll();
		setPolygons([]);
		setIsDrawing(false);
		setNewPolygonKey(null);
	};

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.mapContainer}
				initialRegion={{
					...BUCHAREST_COORDINATES,
					latitudeDelta: DEFAULT_LATITUDE_DELTA,
					longitudeDelta: DEFAULT_LONGITUDE_DELTA
				}}
				onPress={clickOnMap}
			>
				<PolygonEditor
					ref={polygonEditorRef}
					newPolygon={newPolygon}
					polygons={polygons}
					onPolygonCreate={onPolygonCreate}
					onPolygonChange={onPolygonChange}
					onPolygonSelect={() => setIsDrawing(false)}
				/>
			</MapView>

			<View style={styles.actionsContainer}>
				{!isDrawing ? (
					<Button title="Draw Area" onPress={handleDrawArea} />
				) : (
					<Button title="Finish Current Area" onPress={handleFinishDrawing} />
				)}
				<Button title="Reset Everything" onPress={handleResetArea} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	mapContainer: {
		...StyleSheet.absoluteFillObject,
	},
	actionsContainer: {
		position: 'absolute',
		bottom: 50,
		left: 10,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 5,
	},
});
