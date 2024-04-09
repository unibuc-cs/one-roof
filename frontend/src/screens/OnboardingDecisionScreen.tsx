import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { FurtherDetailsRegistrationScreen } from './FurtherDetailsRegistrationScreen';
import { CreateReviewScreen } from './CreateReviewScreen';
import { HomeScreen } from './HomeScreen';
import userService from '../services/internal/usersService';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { ProfileScreen } from './ProfileScreen';
import { AlertsScreen } from './AlertsScreen';
import { CreateListingScreen } from './CreateListingScreen';
import { ChatsScreen } from './ChatsScreen';
import { FavoritesScreen } from './FavoritesScreen';

export const OnboardingDecisionScreen: React.FC = () => {
	const { onboardingStep, setOnboardingStep, setProfilePictureUrl, setRole } = useUserDetails();
	const { user } = useUser();
	const Drawer = createDrawerNavigator();


	useEffect(() => {
		if (user) {
			const userId = user.id;
			fetchAndStoreUserDetails(userId);
		}
	}, [user]);

	const fetchAndStoreUserDetails = async (userId: string) => {
		const userDetails = await userService.getUserById(userId);
		setRole(userDetails.role);
		setOnboardingStep(userDetails.onboardingStep);
		setProfilePictureUrl(userDetails.profilePicture);
	};

	switch (onboardingStep) {
	case 1:
		return <FurtherDetailsRegistrationScreen />;
	case 2:
		return <CreateReviewScreen />;
	default:
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
								<Icon name="menu" size={25} color={'white'}/>
							</View>
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
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
