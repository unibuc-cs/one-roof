
// import { NavigationContainer } from "@react-navigation/native";
// import React from "react";
// import { render, screen, fireEvent } from '@testing-library/react-native';  // Import the component to test
// import { describe, expect, jest, it} from '@jest/globals';
// import { SavedListsScreen } from "../src/screens/SavedListsScreen";
// import { oneListing } from "../__tests_files__/mockResponses";
// import { createStackNavigator } from '@react-navigation/stack';
// import { callApi } from "../src/utils";
// import { StyleSheet } from 'react-native';
// import { ListingScreen } from "../src/screens";
// import { List } from "react-native-paper";
// import { useListing } from "../src/hooks/useListing";
// import { listingService } from "../src/services/internal/listingService";

// const Stack = createStackNavigator();

// function renderWithNavigation(Component, { route = { params : {}}, navigation = {} } = {}) {
//     return render(
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen name="Listing" component = {Component} initialParams={route.params} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
//   }

// jest.mock("../src/hooks/useListing");

// describe('Listing Screen', () => {
//     it('should render screen correctly', () => {
//         const route = {
//             params: {
//                 id: 'ListingId',
//             },
//         };
//         useListing.mockReturnValue({})
//         renderWithNavigation(ListingScreen, {route:route});

//         // const textInput = screen.getByTestId('cardLandlord');

//         // expect(textInput).toBeTruthy();
//     })
// })