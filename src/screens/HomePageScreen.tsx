import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomePageScreen = ({navigation}: {navigation: any}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function authStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(authStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <Text>No estas logueado</Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </View>
    );
  }

  const logOff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const handleLogOut = () => {
    logOff();
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Log Out" onPress={handleLogOut} />
    </View>
  );
};

export default HomePageScreen;
