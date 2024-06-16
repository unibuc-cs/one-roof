import React from 'react';
import {
	AreaFeedbackScreen,
	BuildingFeedbackScreen,
	DrawerContent,
	OnboardingDecisionScreen,
	ReviewGeneralDetailsScreen
} from '../screens';
import { CreateReviewScreen } from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ProfileScreen } from '../screens';
import { AlertsScreen } from '../screens';
import { CreateListingScreen } from '../screens';
import { ChatsScreen }  from '../screens';
import { FavoritesScreen } from '../screens';
import { ListingScreen } from '../screens';
import TopBar from '../components/TopBar';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useUserDetails } from '../contexts/UserDetailsContext';
import { SearchProvider } from '../contexts/SearchContext';
import { FiltersScreen } from '../screens';
import {ListingConfirmLocationScreen} from '../screens';
import {ListingFacilitiesScreen} from "../screens/listing-creation";
import {ListingDescriptionScreen} from "../screens/listing-creation";
import ChatMessagesScreen from "../screens/ChatMessagesScreen";

export type RootStackParamList = {
	Home: undefined,
	Alerts: undefined,
	Chats: undefined,
	CreateReview: undefined,
	CreateListing: undefined,
	Favorites: undefined,
	Profile: undefined,
	Listing: { id: string },
	Filters: undefined,
	ReviewGeneralDetails: undefined,
	BuildingFeedback: undefined,
	AreaFeedback: undefined,
};

export const AppNavigation = () => {
	const Drawer = createDrawerNavigator();
	const { onboardingStep } = useUserDetails();

	return (
		<SearchProvider>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="Home"
					drawerContent={(props) => <DrawerContent {...props} />}
					screenOptions={({ navigation }) => ({
						header: () => <TopBar navigation={navigation} />,
						headerShown: onboardingStep == 3,
						headerTitle: '',
					})}
				>
					<Drawer.Screen name="Home" component={OnboardingDecisionScreen} />
					<Drawer.Screen name="SignIn" component={SignInScreen}/>
					<Drawer.Screen name="SignUp" component={SignUpScreen}/>
					<Drawer.Screen name="Alerts" component={AlertsScreen} />
					<Drawer.Screen name="Chats" component={ChatsScreen} />
					<Drawer.Screen name="CreateReview" component={CreateReviewScreen} />
					<Drawer.Screen name="CreateListing" component={CreateListingScreen} />
					<Drawer.Screen name="Favorites" component={FavoritesScreen} />
					<Drawer.Screen name="Profile" component={ProfileScreen} />
					<Drawer.Screen name="Listing" component={ListingScreen}/>
					<Drawer.Screen name="Filters" component={FiltersScreen}/>
					<Drawer.Screen name="ListingFacilities" component={ListingFacilitiesScreen}/>
					<Drawer.Screen name="ConfirmLocation" component={ListingConfirmLocationScreen}/>
					<Drawer.Screen name="ListingDescription" component={ListingDescriptionScreen}/>
					<Drawer.Screen name="Messages" component={ChatMessagesScreen}/>
					<Drawer.Screen name="ReviewGeneralDetails" component={ReviewGeneralDetailsScreen}/>
					<Drawer.Screen name="AreaFeedback" component={AreaFeedbackScreen}/>
					<Drawer.Screen name="BuildingFeedback" component={BuildingFeedbackScreen}/>
				</Drawer.Navigator>
			</NavigationContainer>
		</SearchProvider>
	);
};