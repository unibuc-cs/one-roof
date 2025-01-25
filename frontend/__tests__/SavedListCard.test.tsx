import { render, screen, fireEvent , waitFor, userEvent} from '@testing-library/react-native';  // Import the component to test
import { describe, expect, test, jest, it} from '@jest/globals';
import React from 'react';
import { View } from 'react-native';
import SavedListCard from '../src/components/SavedListCard';
import { IListing, ISavedList } from '../src/models';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';

// jest.mock('@react-navigation/stack', () => ({
//     createStackNavigator: jest.fn(() => ({
//       Navigator: ({ children }) => children,
//       Screen: ({ component }) => component,
//     })),
//   }));

const mockSavedList : ISavedList = {
    _id:'savedListMockId',
    name: 'mocked list',
    ownerId: 'fake user',
    sharedWith: ['user 1', 'user 2'],
    savedListings: ['listing1', 'listing2'],
}

const mockListing:IListing={
    _id: 'fake listing id',
    landlordId: ' user 3',
    title: ' fake listing',
    description: '',
    photos: ['photo 1'],
    address: 'fake address',
    location: {
        type: 'fake address type',
	    coordinates: [34,45],
    },
    type: 'apartment',
    price: 200,
    numberOfRooms: 3,
    numberOfBathrooms: 1,
    size: 100,
    external: false,
    url: '',
    amenities: ['sink'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: [],
}

jest.mock('@clerk/clerk-expo', () => ({
    useUser: jest.fn().mockReturnValue({
      user: { id: 'mock-user-id', firstName: 'John', lastName: 'Doe' },
    }),
  }));

  jest.mock('react-native', () => {
    return {
        Modal: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
            <div {...props}>{children}</div> // Simple mock for Modal
          ),
          TouchableOpacity: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
            <div {...props}>{children}</div> // Simple mock for TouchableOpacity
          ),
          Alert: {
            alert: jest.fn(), // Mock Alert.alert method
          },
    };
  });

// const Stack = createStackNavigator();
// const MockNavigator = () => {
//     return ();

// };

describe('Saved List Card', () => {
    it('should display add button if listing provided by prop is not null', () => {
        render(<View>
            <SavedListCard savedList={mockSavedList} listingToBeAdded={mockListing} />
          </View>);

        const card = screen.getAllByTestId('buton3');
        console.log('EXISTA CARD???', card);
        expect(card).toBeTruthy();
    })

});