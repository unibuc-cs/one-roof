import React from 'react';
import { View } from 'react-native';
import { BottomBar } from '../components';
import { HeatmapComponent } from '../components/map/Heatmap';

export const HomeScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<HeatmapComponent/>
			<BottomBar/>
		</View>
	);
};
