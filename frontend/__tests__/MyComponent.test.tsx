// MyComponent.test.js
import { render, screen, fireEvent , waitFor, userEvent} from '@testing-library/react-native';
import MyComponent from '../__tests_files__/MyComponent';  // Import the component to test
import { describe, expect, test, it} from '@jest/globals';
import React from 'react';

// It is recommended to use userEvent with fake timers
// Some events involve duration so your tests may take a long time to run.



describe('My Component', () => {
  it('should press button', () => {
  const comp = render(<MyComponent />);

  //const incrementing= {}

  const increment_button = comp.getAllByTestId('incrementButton');
  const textElement = comp.getByTestId('text');
  fireEvent.press(increment_button)

  //expect(increment_button).toHaveBeenCalled();

  expect(textElement).toHaveTextContent('1');
  
  
  });
});
