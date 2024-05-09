import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Map } from '../components';
import TopBar from '../components/TopBar';

export const HomeScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<TopBar />
			<Map />
		</View>
	);
};


