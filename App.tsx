/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import { StackNavigator } from './src/navigator/StackNavigator';

import SignUp from './src/screens/SignUpScreen';
import SignIn from './src/screens/SignInScreen';
import HomePageScreen from './src/screens/HomePageScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignUp">
          {props => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
