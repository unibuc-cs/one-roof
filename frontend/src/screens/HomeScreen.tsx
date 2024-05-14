import React from 'react';
import { View } from 'react-native';
import { BottomBar, Map } from '../components';
import {NewListingButton} from "../components/NewListingButton";

export const HomeScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<Map />
			{/*<NewListingButton />*/}
			<BottomBar/>
		</View>
	);
};


