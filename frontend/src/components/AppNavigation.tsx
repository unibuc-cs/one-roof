import { DrawerContent } from '../screens';
import React from 'react';
import { Pressable } from 'react-native';
import { CreateReviewScreen } from '../screens';
import { HomeScreen } from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens';
import { AlertsScreen } from '../screens';
import { CreateListingScreen } from '../screens';
import { ChatsScreen }  from '../screens';
import { FavoritesScreen } from '../screens';
import { MenuIcon } from './MenuIcon';
import TopBar from './TopBar';

export const AppNavigation = () => {
	const Drawer = createDrawerNavigator();

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <DrawerContent {...props} />}
			screenOptions={({ navigation }) => ({
				header: () => <TopBar navigation={navigation} />,
				headerShown: true,
				headerTitle: '',
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