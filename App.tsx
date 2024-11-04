import {View, Text} from 'react-native';
import React from 'react';
import Config from 'react-native-config';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>App {Config?.BASE_URL}</Text>
    </View>
  );
};

export default App;
