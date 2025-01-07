import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import { BottomBar, Map } from '../components';
import {useNotifications} from "../contexts/NotificationContext";

export const HomeScreen = () => {
	// const {token: expoPushToken, notification} = useNotifications();
	// const data = JSON.stringify(notification, undefined, 2);
	// useEffect(() => {
	// 	console.error('Push Token:', expoPushToken?.data);
	//
	// }, [expoPushToken]);
	return (
		<View style={{ flex: 1 }}>
			<Map />
			<BottomBar/>
		</View>
	);
};


