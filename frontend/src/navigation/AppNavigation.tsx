import React from 'react';
import {
    AreaFeedbackScreen,
    BuildingFeedbackScreen,
    ChatsScreen,
    CreateListingScreen,
    CreateReviewScreen,
    DrawerContent,
    FiltersScreen,
    ListingConfirmLocationScreen,
    ListingDescriptionScreen,
    ListingFacilitiesScreen,
    ListingScreen,
    OnboardingDecisionScreen,
    ProfileScreen,
    ReviewGeneralDetailsScreen,
    ViewReviewScreen,
    ViewingsCalendar
} from '../screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AlertsScreen } from '../screens';
import TopBar from '../components/TopBar';
import { useUserDetails } from '../contexts/UserDetailsContext';
import ConversationScreen from '../screens/ConversationScreen';
import { IReview } from '../models';
import { FavoriteScreen } from '../screens/FavoriteScreens';
import { RoommateQuizScreen } from '../screens/roommates/RoommateQuizScreen';
import { BrowseRoommatesScreen } from '../screens/roommates/BrowseRoommatesScreen';
import { RoommateScreen } from '../screens/roommates/RoommateScreen';
import { FriendsScreen } from '../screens/FriendsScreen';

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
    ViewReview: { review: IReview },
    Messages: any,
    RoommateQuiz: undefined,
    BrowseRoommates: undefined,
    Roommates: undefined,
    ConfirmLocation: undefined,
    ListingFacilities: undefined,
    ListingDescription: undefined,
};

export const AppNavigation = () => {
    const Drawer = createDrawerNavigator<RootStackParamList>();
    const { onboardingStep, role, userId, profilePictureUrl } = useUserDetails();

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
                    backBehavior={'history'}
                >
					<Drawer.Screen name="Home" component={OnboardingDecisionScreen} />
					<Drawer.Screen name="Chats" component={ChatsScreen} />
					<Drawer.Screen name="Favorites" component={FavoriteScreen} />
					<Drawer.Screen name="CreateReview" component={CreateReviewScreen} />
					<Drawer.Screen name="CreateListing" component={CreateListingScreen} />
					<Drawer.Screen name="Profile" component={ProfileScreen} />
					<Drawer.Screen name="Listing" component={ListingScreen}/>
					<Drawer.Screen name="Filters" component={FiltersScreen}/>
                    <Drawer.Screen name="RoommateQuiz" component={RoommateQuizScreen}/>
                    <Drawer.Screen name='BrowseRoommates' component={BrowseRoommatesScreen}/>
                    <Drawer.Screen name='Roommates' component={RoommateScreen}/>
					<Drawer.Screen name="ListingFacilities" component={ListingFacilitiesScreen}/>
					<Drawer.Screen name="ConfirmLocation" component={ListingConfirmLocationScreen}/>
					<Drawer.Screen name="ListingDescription" component={ListingDescriptionScreen}/>
					<Drawer.Screen name="Messages" component={ConversationScreen}/>
                    <Drawer.Screen name="Friends" component={FriendsScreen}/>
                    <Drawer.Screen name="ReviewGeneralDetails" component={ReviewGeneralDetailsScreen}/>
					<Drawer.Screen name="AreaFeedback" component={AreaFeedbackScreen}/>
					<Drawer.Screen name="BuildingFeedback" component={BuildingFeedbackScreen}/>
					<Drawer.Screen name="ViewReview" component={ViewReviewScreen}/>
                </Drawer.Navigator>
			</NavigationContainer>
		</SearchProvider>
	);
};