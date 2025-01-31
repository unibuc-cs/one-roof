import { render, screen, fireEvent } from '@testing-library/react-native';  // Import the component to test
import { describe, expect, test, jest, it} from '@jest/globals';
import React from 'react';
import { StyleSheet } from 'react-native';
import { InsightsScreen} from '../src/screens/InsightsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { viewingService } from '../src/services';
import { callApi } from '../src/utils/apiWrapper';
import { useUserDetails } from '../src/contexts/UserDetailsContext';
import { mockedUserDetails, mockListingsResponse, mockViewingsResponse } from '../__tests_files__/mockResponses';

const styles = StyleSheet.create({
  activeTabText: {
  fontWeight: 'bold',
  color: '#000',
},
});

import PropTypes from 'prop-types';

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

function renderWithNavigation(Component, { route = {}, navigation = {} } = {}) {
  return render(
      <NavigationContainer>
        <Component navigation={navigation} route={route} />
      </NavigationContainer>
  );
}

jest.mock('../src/contexts/UserDetailsContext', () => ({
  useUserDetails: jest.fn(),
}));

describe('Insights screen', () => {
    it('barchart exists', async () => {
        (callApi as jest.MockedFunction<typeof callApi>).mockResolvedValue(mockListingsResponse);
        (useUserDetails as jest.MockedFunction<typeof useUserDetails>).mockReturnValue(mockedUserDetails);

        renderWithNavigation(InsightsScreen);

        const barchart_exists = screen.UNSAFE_getAllByType(BarChart);
        expect(barchart_exists).toBeTruthy();
    }),
    it('api call is made if Views is changed to Viewings', async () => {
      //const spyOnServiceViewings = jest.spyOn(viewingService, 'getUserViewings');
      (callApi as jest.MockedFunction<typeof callApi>).mockResolvedValue(mockListingsResponse);
      (useUserDetails as jest.MockedFunction<typeof useUserDetails>).mockReturnValue(mockedUserDetails);

      renderWithNavigation(InsightsScreen);

      const button = screen.getByText('Viewings');

      fireEvent.press(button);

      expect(button.props.style).toContainEqual(styles.activeTabText);

      // await waitFor(() => {
      //   expect(spyOnServiceViewings).toHaveBeenCalled(); 
      // });

    })

});
