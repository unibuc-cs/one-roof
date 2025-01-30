import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from '../base/Button';
import MapView, { MapPressEvent } from 'react-native-maps';
import {
	getRandomPolygonColors,
	MapPolygonExtendedProps,
	PolygonEditor,
	PolygonEditorRef,
} from '@siposdani87/expo-maps-polygon-editor';
import { v4 as uuidv4 } from 'uuid';
import { BUCHAREST_COORDINATES, DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../../utils';

interface MapWithAreaPolygonsProps {
    onChangePolygons?: (polygons: Array<Array<{ latitude: number, longitude: number }>>) => void,
}

export const MapWithAreaPolygons: React.FC<MapWithAreaPolygonsProps> = ({ onChangePolygons }) => {
	const mapRef = useRef<MapView>(null);
	const polygonEditorRef = useRef<PolygonEditorRef>(null);

	const [polygons, setPolygons] = useState<MapPolygonExtendedProps[]>([]);
	const [isDrawing, setIsDrawing] = useState(false);
	const [newPolygonKey, setNewPolygonKey] = useState<string | null>(null);

	const [strokeColor, fillColor] = getRandomPolygonColors();

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
		polygonEditorRef.current?.selectPolygonByKey(-1);
	}, [isDrawing]);

	const handleResetArea = useCallback(() => {
		polygonEditorRef.current?.resetAll();
		setPolygons([]);
		setIsDrawing(false);
		setNewPolygonKey(null);
		onChangePolygons?.([]);
	}, [onChangePolygons]);

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
		onChangePolygons?.(polygonsClone.map((p) => p.coordinates));
	};

	const onPolygonCreate = (polygon: MapPolygonExtendedProps) => {
		const polygonClone = { ...polygon, key: newPolygonKey };
		setPolygons((prev) => {
			const updatedPolygons = [...prev, polygonClone];
			onChangePolygons?.(updatedPolygons.map((p) => p.coordinates));
			return updatedPolygons;
		});
		polygonEditorRef.current?.selectPolygonByKey(newPolygonKey);
	};

	const onPolygonChange = useCallback(
		(index: number, polygon: MapPolygonExtendedProps) => {
			setPolygons((prev) => {
				const polygonsClone = [...prev];
				polygonsClone[index] = polygon;
				onChangePolygons?.(polygonsClone.map((p) => p.coordinates));
				return polygonsClone;
			});
		},
		[onChangePolygons]
	);

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.mapContainer}
				initialRegion={{
					...BUCHAREST_COORDINATES,
					latitudeDelta: DEFAULT_LATITUDE_DELTA,
					longitudeDelta: DEFAULT_LONGITUDE_DELTA,
				}}
				onPress={clickOnMap}
			>
				<PolygonEditor
					ref={polygonEditorRef}
					newPolygon={newPolygon}
					polygons={polygons}
					onPolygonCreate={onPolygonCreate}
					onPolygonChange={onPolygonChange}
					onPolygonSelect={() => {
					}}
					onPolygonRemove={onPolygonRemove}
				/>
			</MapView>

			<View style={styles.actionsContainer}>
				<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					{!isDrawing ? (
						<Button mode='contained' onPress={handleDrawArea} marginVertical={0} fontSize={12}
							lineHeight={18}>
                            Draw Area
						</Button>
					) : (
						<Button mode='contained' onPress={handleFinishDrawing} marginVertical={0} fontSize={12}
							lineHeight={18}>
                            Finish Current Area
						</Button>
					)}
					<Button mode='contained' fontSize={12} lineHeight={18} onPress={handleResetArea}>
                        Reset All Areas
					</Button>
				</View>
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
		bottom: 20,
		left: 10,
	},
});
