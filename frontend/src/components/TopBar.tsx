import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MenuIcon } from './MenuIcon';

const TopBar = () => {
	const [search, setSearch] = React.useState('');
	return (
		<View style={styles.container}>
			<Searchbar value={search} placeholder="Search"/>
			<MenuIcon iconName="tune"/>
		</View>
	);
};

export default TopBar;

const styles = StyleSheet.create({
	container: {
		width: '70%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: 'white',
		height: '12.5%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	iconButton: {
		padding: 10,
	},
});
