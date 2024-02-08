import React, {useState, useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import FlightCard from "../components/FlightCard";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ResultsScreen = ({navigation, route}: {navigation: any, route: any}) => {
  const {destination, fromDestination, date, numPassagers} = route.params
  const [selected, setSelected] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const flightData = {
    orgCountry: fromDestination,
    orgCity: "BEG",
    destCountry: destination,
    destCity: "AMS",
    date: date,
    passengers: numPassagers,
  };

  useEffect(() => {
    const user = auth().currentUser;
    if (user !== null) {
      setUserId(user.uid); 
    }
  }, []); 

  const sendFlightDataToFirestore = async () => {
    if (userId) {
      try {
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('flights')
          .add(flightData);
        console.log('Reservacion guardada!');
      } catch (error) {
        console.error("Error a;adiendo el documento: ", error);
      }
    } else {
      console.log('ID usuario encontrado, no esta logeado!');
    }
  };

  return (
    <View style={styles.containericon}>
      <FlightCard fly={  
        flightData
      }/>
      <Text style={styles.text}>Your request     was received.</Text>
      <View style={styles.buttonContainer}>
        <Button  title="Next" enable={true} onPress={() => {
          sendFlightDataToFirestore();
          navigation.navigate('HomePage');
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    containericon: {
        flex: 1,
        margin: 22,
        paddingVertical: '50%',
    },
    text: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Esto empuja el botón hacia el final del contenedor
        marginBottom: -177, 
        
    }
});

export default ResultsScreen;
