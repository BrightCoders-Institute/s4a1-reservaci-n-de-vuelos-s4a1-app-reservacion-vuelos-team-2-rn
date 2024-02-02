import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import flightsData from '../db/myFlights.json';
import FlightList from '../components/FlightList';

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
  return (
    <View style={{flex: 1}}>
      <Text style={styles.textTitle}>My flights</Text>
      <View style={{alignItems: 'center', flex: 1}}>
        <FlightList onPress={() => navigation.navigate('FromScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: '#5C6EF8',
    fontSize: 25    ,
    fontWeight: 'bold',
  },
  vuelo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomePageScreen;
