import React from 'react';
import { View } from 'react-native';
import { BottomBar, Map } from '../components';
import { SearchProvider } from '../contexts/SearchContext';

export const HomeScreen = () => {
	return (
		<SearchProvider>
			<View style={{ flex: 1 }}>
				<Map />
				<BottomBar/>
			</View>
		</SearchProvider>
	);
};


