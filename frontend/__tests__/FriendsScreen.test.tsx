
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { render, screen, fireEvent, act } from '@testing-library/react-native';  // Import the component to test
import { describe, expect, jest, it} from '@jest/globals';
import { SavedListsScreen } from "../src/screens/SavedListsScreen";
import { firstUser, mockedFriendRequests, mockedFriends, secondUser } from "../__tests_files__/mockResponses";
import { createStackNavigator } from '@react-navigation/stack';
import { callApi } from "../src/utils";
import { StyleSheet } from 'react-native';
import { FriendsScreen } from "../src/screens/FriendsScreen";
import { friendService } from "../src/services/internal/friendService";
import userService from "../src/services/internal/userService";

jest.mock('../src/services/internal/userService')
jest.mock('../src/services/internal/friendService')

function renderWithNavigation(Component, { route = {}, navigation = {} } = {}) {
return render(
    <NavigationContainer>
        <Component navigation={navigation} route={route} />
    </NavigationContainer>
);
}
jest.mock("@clerk/clerk-expo", () => ({
    useUser: jest.fn()
}))

// !! noticed that it was displaying 'no friends' even if there were friends

describe('Friends screen', () => {
    it('should display correctly', () => {
        (friendService.getAllFriends as jest.MockedFunction<typeof friendService.getAllFriends>).mockResolvedValue(mockedFriends);
        (friendService.getAllFriendRequests as jest.MockedFunction<typeof friendService.getAllFriendRequests>).mockResolvedValue(mockedFriendRequests);
        (userService.getUserByClerkId as jest.MockedFunction<typeof userService.getUserByClerkId>).mockResolvedValue(firstUser);
        (userService.getWithClerkDetailsByUserId as jest.MockedFunction<typeof userService.getWithClerkDetailsByUserId>).mockResolvedValue(secondUser);

        renderWithNavigation(FriendsScreen);

        const flatlist = screen.getByTestId('flatlist');

        console.log('flatlist memoized props', flatlist.props.data);

        expect(flatlist.props.data).toBeTruthy();

        const requests = screen.getByTestId('requests');

        fireEvent.press(requests);

        const req_flatlist = screen.getByTestId('req_flatlist');

        expect(req_flatlist.props.data).toBeTruthy();

    })
});


