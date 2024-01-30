import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/SignUpScreen';
import SignIn from '../screens/SignInScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};
