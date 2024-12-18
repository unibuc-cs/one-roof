import React, { useRef, useState, useMemo, useCallback } from 'react';
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

	const [strokeColor, fillColor] = getRandomPolygonColors();

	// Memoize the new polygon template to prevent unnecessary recalculations
	const newPolygon = useMemo(
		() => ({
			key: newPolygonKey,
			coordinates: [],
			strokeWidth: 2,
			strokeColor,
			fillColor,
		}),
		[newPolygonKey, strokeColor, fillColor]
	);

	const handleDrawArea = useCallback(() => {
		if (isDrawing) {
			Alert.alert('Already Drawing', 'Finish the current polygon first.');
			return;
		}
		polygonEditorRef.current?.startPolygon();
		setNewPolygonKey(uuidv4());
		setIsDrawing(true);
	}, [isDrawing]);

	const handleFinishDrawing = useCallback(() => {
		if (!isDrawing) {
			Alert.alert('Not Drawing', 'Start drawing a polygon first.');
			return;
		}
		setIsDrawing(false);
		setNewPolygonKey(null);
		polygonEditorRef.current?.selectPolygonByKey(-1); // Finalize the current polygon
	}, [isDrawing]);

	const handleResetArea = useCallback(() => {
		polygonEditorRef.current?.resetAll();
		setPolygons([]);
		setIsDrawing(false);
		setNewPolygonKey(null);
	}, []);

	const clickOnMap = useCallback(
		({ nativeEvent: { coordinate } }: MapPressEvent) => {
			if (isDrawing) {
				polygonEditorRef.current?.setCoordinate(coordinate);
			}
		},
		[isDrawing]
	);

	const onPolygonRemove = (index: number): void => {
		const polygonsClone = [...polygons];
		polygonsClone.splice(index, 1);
		setPolygons(polygonsClone);
	};

	const onPolygonCreate =
		(polygon: MapPolygonExtendedProps) => {
			const polygonClone = { ...polygon, key: newPolygonKey };
			setPolygons((prev) => [...prev, polygonClone]);
			polygonEditorRef.current?.selectPolygonByKey(newPolygonKey);
		};

	const onPolygonChange = useCallback(
		(index: number, polygon: MapPolygonExtendedProps) => {
			setPolygons((prev) => {
				const polygonsClone = [...prev];
				polygonsClone[index] = polygon;
				return polygonsClone;
			});
		},
		[]
	);

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
					onPolygonSelect={() => {}}
					onPolygonRemove={onPolygonRemove}
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
