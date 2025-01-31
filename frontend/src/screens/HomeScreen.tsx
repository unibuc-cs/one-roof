import React from 'react';
import { View } from 'react-native';
import { useSearchContext } from '../contexts/SearchContext';
import { BottomBar, Map } from '../components';
import { HeatmapComponent } from '../components/map/Heatmap';

export const HomeScreen = () => {
	const { state } = useSearchContext();

	return (
		<View style={{ flex: 1 }}>
			{state.searchType === 'Heatmap' ? (
				<HeatmapComponent/>
			) : (
				<>
					<Map/>
					<BottomBar/>
				</>
			)}
		</View>
	);
};
