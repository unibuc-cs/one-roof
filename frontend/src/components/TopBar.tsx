import React from 'react';
import {
	View,
	StyleSheet, Pressable,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { MenuIcon } from './MenuIcon';
import { theme } from '../theme';
import SwitchSelector from 'react-native-switch-selector';
import { SearchTypeEnum } from '../enums';


type TopBarProps = {
	navigation: any,
};


const TopBar: React.FC<TopBarProps> = (props) => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchType, setSearchType] = React.useState<SearchTypeEnum>();
	return (
		<View style={styles.container}>
			<View style={styles.rowContainer}>
				<View style={[styles.smallerRowContainer, { marginTop: 40 }]}>
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
					<View style={styles.searchBarContainer}>
						<Searchbar style={styles.searchBar} value={searchQuery} placeholder="Search.." onChangeText={setSearchQuery}/>
					</View>
					<MenuIcon iconName="tune"/>
				</View>
			</View>
			<View style={[styles.rowContainer, { width: '80%' }]}>
				<View style={[styles.smallerRowContainer, { marginTop: 20, marginBottom: 10 }]}>
					<SwitchSelector
						options={[
							{ label: 'Properties', value: SearchTypeEnum.Properties },
							{ label: 'Reviews', value: SearchTypeEnum.Reviews },
						]}
						buttonColor={theme.colors.inverseSurface}
						backgroundColor={theme.colors.inversePrimary}
						borderColor={theme.colors.text}
						borderWidth={10}
						initial={0}
						bold={true}
						onPress={(value: SearchTypeEnum) => setSearchType(value)}
					/>
				</View>
			</View>
		</View>
	);
};

export default TopBar;

const styles = StyleSheet.create({
	searchBarContainer: {
		width: '80%',
	},
	container: {
		height: 'auto',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: 10,
		backgroundColor: theme.colors.offWhite,
		elevation: 20,
	},
	button: {
		width: 150,
		backgroundColor: 'white',
		borderColor: 'black'
	},
	buttonsContainer: {
		alignSelf: 'center',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	rowContainer: {
		height: 'auto',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
	},
	smallerRowContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	searchBar: {
		marginLeft: '7%',
		marginRight: '7%'
	},
});
