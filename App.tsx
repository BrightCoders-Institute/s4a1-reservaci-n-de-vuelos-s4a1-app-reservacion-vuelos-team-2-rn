/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import { StackNavigator } from './src/navigator/StackNavigator';

import SignUp from './src/screens/SignUpScreen';
import HomePageScreen from './src/screens/HomePageScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" >
          {props => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
