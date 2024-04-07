import Background from '../components/Background';
import React from 'react';
import Logo from '../components/Logo';
import { HeaderText } from '../components/HeaderText';
import { Text, View } from 'react-native';
import Button from '../components/Button';

export const UnauthenticatedHomeScreen = () => {
	return (
		<Background>
			<Logo/>
			<HeaderText size={22}> Real Reviews, Real Homes</HeaderText>
			<View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
				<View style={{ flex: 1, marginRight: 5 }}>
					<Button mode="contained" onPress={() => console.log('Sign in')}> Login </Button>
				</View>
				<View style={{ flex: 1, marginLeft: 5 }}>
					<Button mode="contained" onPress={() => console.log('Sign up')}> Register </Button>
				</View>
			</View>
		</Background>
	);
};
