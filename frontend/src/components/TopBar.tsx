import React from 'react';
import {
	View,
	StyleSheet, Pressable,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MenuIcon } from './MenuIcon';
import { theme } from '../theme';


type TopBarProps = {
	navigation: any,
};

const TopBar: React.FC<TopBarProps> = (props) => {
	const [search, setSearch] = React.useState('');
	return (
		<View style={styles.container}>
			<View style={styles.smallerContainer}>
				<Pressable
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					onPress={() => props.navigation.openDrawer()}
				>
					<MenuIcon iconName="menu"/>
				</Pressable>
				<Searchbar style={styles.searchBar} value={search} placeholder="Search.." onChangeText={setSearch}/>
				<MenuIcon iconName="tune"/>
			</View>
		</View>
	);
};

export default TopBar;

const styles = StyleSheet.create({
	container: {
		height: 'auto',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
		backgroundColor: theme.colors.offWhite,
		elevation: 20,
	},
	smallerContainer: {
		marginTop: 20,
		width: '80%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		elevation: 1,
	},
	searchBar: {
		marginLeft: '5%',
		marginRight: '5%'
	}
});
