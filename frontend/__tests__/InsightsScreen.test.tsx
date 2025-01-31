import { render, screen, fireEvent , waitFor, userEvent, act} from '@testing-library/react-native';  // Import the component to test
import { describe, expect, test, jest, it} from '@jest/globals';
import React, {ReactNode, useState, createContext} from 'react';
import { View } from 'react-native';
import { InsightsScreen} from '../src/screens/InsightsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { viewingService } from '../src/services';
import { callApi } from '../src/utils/apiWrapper';
import { UserDetailsProvider, useUserDetails } from '../src/contexts/UserDetailsContext';
import { mockListingsResponse, mockViewingsResponse } from '../__tests_files__/mockResponses';

import PropTypes from 'prop-types';
import { useUser } from '@clerk/clerk-expo';

const TouchableOpacity = ({ children, onPress }) => (
  <button onClick={onPress}>{children}</button>
);

const ScrollView = ({children}) => (
    <div>{children}</div>
);

TouchableOpacity.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func
};

ScrollView.propTypes = {
    children: PropTypes.node
}

jest.mock('react-native-gesture-handler', () => ({
  //...jest.requireActual('react-native-gesture-handler'),
  TouchableOpacity: TouchableOpacity
}));

jest.mock('../src/utils/apiWrapper', () => ({
  callApi: jest.fn(), 
}))

interface mockUserDetails {
  userId: string,
};

const mockDefaultUserDetails : mockUserDetails= {
  userId: 'user_2pwGRzshslTfPL09YP5S4jzVV7N',
}

const MockUserDetailsContext = createContext<mockUserDetails>(mockDefaultUserDetails);

const MockUserDetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const userId = 'user_2pwGRzshslTfPL09YP5S4jzVV7N';
  return (
    <MockUserDetailsContext.Provider value={{userId}}>
      {children}
    </MockUserDetailsContext.Provider>
  );
};

function renderWithNavigation(Component, { route = {}, navigation = {} } = {}) {
  return render(
    <MockUserDetailsProvider>
      <NavigationContainer>
        <Component navigation={navigation} route={route} />
      </NavigationContainer>
    </MockUserDetailsProvider>
  );
}

jest.mock('../src/contexts/UserDetailsContext', () => ({
  useUserDetails: jest.fn(),
}));

describe('Insights screen', () => {
    it('barchart exists', async () => {
        // const mockedUserDetails : UserDetails
        (callApi as jest.MockedFunction<typeof callApi>).mockResolvedValue(mockListingsResponse);
        //(useUserDetails as jest.MockedFunction<typeof useUserDetails>).mockReturnValue();

        await renderWithNavigation(InsightsScreen);

        const barchart_exists = screen.UNSAFE_getAllByType(BarChart);
        expect(barchart_exists).toBeTruthy();
    }),
    it('api call is made if Views is changed to Viewings', async () => {
      const spyOnServiceViewings = jest.spyOn(viewingService, 'getUserViewings');

      renderWithNavigation(InsightsScreen);

      const button = screen.getByText('Viewings');

      fireEvent.press(button);

      expect(spyOnServiceViewings).toHaveBeenCalled(); 

      // await waitFor(() => {
      //   expect(spyOnServiceViewings).toHaveBeenCalled(); 
      // });

    })

});


// // useUserDetails.mockReturnValue({
      //     userId: 'mockedUserId',
      //     // You can mock other properties here as well
      //     onboardingStep: 1,
      //     role: 'RegularUser', // or whatever value fits your test case
      //     // Add any other necessary fields
      //   });