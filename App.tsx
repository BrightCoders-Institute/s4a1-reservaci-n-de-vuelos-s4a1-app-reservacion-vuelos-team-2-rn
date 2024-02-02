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
import FromScreen from './src/screens/FromScreen';
import ToScreen from './src/screens/ToScreen';
import SelectDateScreen from './src/screens/SelectDateScreen';
import PassengerScreen from './src/screens/PassengerScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="SignUp">
          {props => <SignUp {...props} />}
        </Stack.Screen>
        <Stack.Screen name="HomePage" component={HomePageScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="FromScreen" component={FromScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ToScreen" component={ToScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectDateScreen" component={SelectDateScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PassengerScreen" component={PassengerScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
