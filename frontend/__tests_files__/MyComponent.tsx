import React, { useState } from 'react';
//import { Button } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from 'react-native-paper';
const MyComponent = () => {
    const [count, setCount] = useState(0);

    function increment () {
      setCount(count + 1);
    }
  
    return (
      <div>
        <Button onPress={increment} testID='incrementButton'> Increment </Button>
        <Text testID='text' >{count}</Text>
      </div>
    );
  };

  export default MyComponent;