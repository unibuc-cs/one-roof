import { theme } from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import React from 'react';

export const MenuIcon = ({ iconName }) => {
	return (
		<View style={{
			width: 40,
			height: 40,
			backgroundColor: theme.colors.primary,
			borderRadius: 20,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 5
		}}>
			<Icon name={ iconName } size={25} color={'white'}/>
		</View>
	);
};