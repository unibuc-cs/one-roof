import { DrawerContent } from '../screens';
import React from 'react';
import { Pressable, View } from 'react-native';
import { CreateReviewScreen } from '../screens';
import { HomeScreen } from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { ProfileScreen } from '../screens';
import { AlertsScreen } from '../screens';
import { CreateListingScreen } from '../screens';
import { ChatsScreen }  from '../screens';
import { FavoritesScreen } from '../screens';
import { MenuIcon } from './MenuIcon';

export const AppNavigation = () => {
	const Drawer = createDrawerNavigator();

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={({ navigation }) => ({
				headerLeft: () => (
					<Pressable
						onPress={() => navigation.openDrawer()}
						style={({ pressed }) => [
							{
								opacity: pressed ? 0.5 : 1,
							}
						]}
					>
						<MenuIcon iconName="menu"/>
					</Pressable>
				),
				headerLeftContainerStyle: {
					paddingLeft: 10,
				},
				headerShown: true,
				headerTitle: '',
				headerTransparent: true,
			})}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Alerts" component={AlertsScreen} />
			<Drawer.Screen name="Chats" component={ChatsScreen} />
			<Drawer.Screen name="CreateReview" component={CreateReviewScreen} />
			<Drawer.Screen name="CreateListing" component={CreateListingScreen} />
			<Drawer.Screen name="Favorites" component={FavoritesScreen} />
			<Drawer.Screen name="Profile" component={ProfileScreen} />
		</Drawer.Navigator>
	);
};