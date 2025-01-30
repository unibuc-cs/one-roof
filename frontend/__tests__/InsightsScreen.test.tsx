import { render, screen, fireEvent , waitFor, userEvent, act} from '@testing-library/react-native';  // Import the component to test
import { describe, expect, test, jest, it} from '@jest/globals';
import React from 'react';
import { View } from 'react-native';
import { InsightsScreen} from '../src/screens/InsightsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';

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

function renderWithNavigation(Component, { route = {}, navigation = {} } = {}) {
  return render(
    <NavigationContainer>
      <Component navigation={navigation} route={route} />
    </NavigationContainer>
  );
}

describe('Insights screen', () => {
    it('barchart exists', /*async*/ () => {
        renderWithNavigation(InsightsScreen);
        // await act(async () => {
        //   renderWithNavigation(InsightsScreen);
        // });

        const barchart_exists = screen.UNSAFE_getAllByType(BarChart);
        expect(barchart_exists).toBeTruthy();
    }),
    it('data is reaggregated if hour is changed to day', async () => {

      const spyOnHandleData = jest.spyOn(InsightsScreen, 'handleData');


      renderWithNavigation(InsightsScreen);

      const button = screen.getByTestId('day_button');

      fireEvent.press(button)

      await waitFor(() => {
        expect(setTimeUnit).toHaveBeenCalledWith('Day'); // ✅ Ensures timeUnit changed
      });

      spyOnHandleData.mockRestore();

    })

});