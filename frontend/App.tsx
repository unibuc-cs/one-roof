import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox, StyleSheet, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { tokenCache } from './src/auth/tokenCache';
import { PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';
import { EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import { SearchProvider, useSearchContext } from './src/contexts/SearchContext';
import { UnauthenticatedHomeScreen } from './src/screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SignUpScreen from './src/screens/SignUpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserDetailsProvider } from './src/contexts/UserDetailsContext';
import { AppNavigation } from './src/navigation';
import SignInScreen from './src/screens/SignInScreen';
import { NotificationDataProvider } from './src/contexts/NotificationContext';
import { Background } from './src/components';

const AppLoader: React.FC<{ Stack: any }> = ({ Stack }) => {
	const { state } = useSearchContext();
	// const { onboardingStep } = useUserDetails();
	const isSearchDone = state.listings.length > 0 || state.reviews.length > 0 || state.filteredListings.length > 0 || state.filteredReviews.length > 0;

	// console.error('onboarding: ', onboardingStep, 'state: ', JSON.stringify(state));s
	useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync();
				await useCustomFonts();
			} catch (e) {
				console.warn(e);
			} finally {
				const interval = setInterval(() => {
					if (isSearchDone) { // ✅ Wait for the first search to complete
						SplashScreen.hideAsync();
						clearInterval(interval);
					}
				}, 200);
			}
		}

		prepare();
	}, [isSearchDone]);

	const loadingScreen = <Background>
		<ActivityIndicator size="large"/>
		<Text>Loading...</Text>
	</Background>;

	return (
		<>
			<SignedOut>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Stack.Navigator initialRouteName={'Home'}
									 screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Home" component={UnauthenticatedHomeScreen}/>
						<Stack.Screen name="SignIn" component={SignInScreen}/>
						<Stack.Screen name="SignUp" component={SignUpScreen}/>
					</Stack.Navigator>
				</GestureHandlerRootView>
			</SignedOut>
			<SignedIn>
				<AppNavigation/>
				{/*not sure if the next line is fullproof:*/}
				{/*{!isSearchDone && onboardingStep === 3 ? loadingScreen : <AppNavigation/>}*/}
			</SignedIn>
		</>);
	// return !isSearchDone ? (
	//
	// ) : (
	// 	<>
	// 		<SignedIn>
	// 			<AppNavigation/>
	// 		</SignedIn>
	//
	// 	</>
	// );
};

export default function App() {
	LogBox.ignoreLogs(['Require cycle:']);
	// const { state } = useSearchContext();
	// const isSearchDone = state.listings.length > 0;
	//
	// useEffect(() => {
	// 	async function prepare() {
	// 		try {
	// 			// Keep the splash screen visible while we fetch resources
	// 			await SplashScreen.preventAutoHideAsync();
	// 			// Load fonts and perform any other setup
	// 			await useCustomFonts();
	// 		} catch (e) {
	// 			console.warn(e);
	// 		} finally {
	// 			// After loading resources, hide the splash screen
	// 			const interval = setInterval(() => {
	// 				if (isSearchDone) { // ✅ Only when search is complete
	// 					setAppIsReady(true);
	// 					SplashScreen.hideAsync();
	// 					clearInterval(interval); // Stop checking
	// 				}
	// 			}, 500);
	// 		}
	// 	}
	//
	// 	prepare();
	// }, [isSearchDone]);
	//
	// if (!appIsReady) {
	// 	return (
	// 		<Background>
	// 			<ActivityIndicator size="large"/>
	// 			<Text>Loading...</Text>
	// 		</Background>
	// 	);
	// }

	const Stack = createNativeStackNavigator();

	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
			<PaperProvider theme={theme}>
				<NavigationContainer>
					<UserDetailsProvider>
						<NotificationDataProvider>
							<SearchProvider>
								<AppLoader Stack={Stack}/>
							</SearchProvider>
						</NotificationDataProvider>
					</UserDetailsProvider>
				</NavigationContainer>
			</PaperProvider>
		</ClerkProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
