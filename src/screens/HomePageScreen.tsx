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
      <Text style={styles.textTitle}>My flights</Text>

      <FlightList />

      {/* <View style={styles.vuelo}>
        <View style={styles.despega}>
          <Text>Beg</Text>
          <Text>Serbia</Text>
        </View>
        
        <Text>icon fly</Text>

        <View style={styles.destino}></View>
          <Text>Ams</Text>
          <Text>Netherlands</Text>
        </View>
      </View>
   
      <Text>line gris</Text>

      <View style={styles.infoVuelo}>
        <Text>September 3, 2020</Text>
        <Text>2 passengers</Text>
      </View>
      <Text>line negra</Text> */}

      {/* <Text>Welcome {user.email}</Text>
      <Button title="Log Out" onPress={handleLogOut} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: '#5C6EF8',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 30,
  },
  vuelo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  despega: {
  },
  destino: {
  },
  infoVuelo: {
  },
});

export default HomePageScreen;
