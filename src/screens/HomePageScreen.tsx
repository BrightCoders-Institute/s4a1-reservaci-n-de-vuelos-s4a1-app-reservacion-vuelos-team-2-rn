import React, { useState, useEffect } from 'react';
import {View, Text, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const HomePageScreen = ({ navigation }) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);
  
    if (initializing) return null;
  
    if (!user) {
      return (
        <View>
          <Text>Home Page</Text>
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
      navigation.navigate('SignUpScreen');
    };
  
    return (
      <View>
        <Text>Welcome {user.email}</Text>
        <Button title="Log Out" onPress={handleLogOut} />
      </View>
    );
  }

  export default HomePageScreen;