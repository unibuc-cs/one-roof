import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import { BottomBar, Map } from '../components';

export const HomeScreen = () => {

	return (
		<View style={{ flex: 1 }}>
			<Map />
			<BottomBar/>
		</View>
	);
};


