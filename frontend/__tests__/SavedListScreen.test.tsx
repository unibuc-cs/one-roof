
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { render, screen, fireEvent } from '@testing-library/react-native';  // Import the component to test
import { describe, expect, jest, it} from '@jest/globals';
import { SavedListsScreen } from "../src/screens/SavedListsScreen";
import { mockListing, mockSavedLists } from "../__tests_files__/mockResponses";
import { createStackNavigator } from '@react-navigation/stack';
import { callApi } from "../src/utils";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    activeTabText: {
		fontWeight: 'bold',
		color: '#000',
	},
});

jest.mock('../src/utils/apiWrapper', () => ({
    callApi: jest.fn(), 
  }))


const Stack = createStackNavigator();

function renderWithNavigation(Component, { route = { params : {}}, navigation = {} } = {}) {
    return render(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SavedLists" component = {Component} initialParams={route.params} />
            </Stack.Navigator>
        </NavigationContainer>
    );
  }

jest.mock("@clerk/clerk-expo", () => ({
    useUser: jest.fn()
}))

describe('Saved Lists screen', () => {
    it('should handle shared lists correctly', () => {
        const route = {
            params: {
                listing: { mockListing},
            },
        };
        (callApi as jest.MockedFunction<typeof callApi>).mockResolvedValue(mockSavedLists);

        renderWithNavigation(SavedListsScreen, {route : route});

        const sharedButton = screen.getByText('Shared');

        fireEvent.press(sharedButton);

        expect(sharedButton.props.style).toContainEqual(styles.activeTabText);

    })
});


