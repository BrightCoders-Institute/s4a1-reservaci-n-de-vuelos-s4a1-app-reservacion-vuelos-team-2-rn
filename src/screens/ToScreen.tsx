import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import FlightCard from "../components/FlightCard";

const ToScreen = ({navigation, route}: {navigation: any, route:any}) => {
    const { fromDestination} = route.params
    const [destination, setDestination] = useState<string>('');

    return (
        <View style={styles.containericon}>
            <TouchableOpacity onPress={
                () => navigation.navigate('FromScreen', {destination: route.params.fromDestination})
              }>
                <Image source={require('../icons/atras.png')} style={styles.iconStyle}/>
            </TouchableOpacity>
            <FlightCard fly={  
                {
                  orgCountry: fromDestination,
                  orgCity: "BEG",
                  destCountry: "",
                  destCity: "",
                  date: "",
                  passengers: 0,}
              }/>
            <Text style={styles.text}>Where will you be flying to?</Text>
            <TextInput 
              style={styles.InputText}
              placeholder="Select Location"
              onChangeText={setDestination}
              value={destination}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Next"
                enable={destination == '' ? false : true }
                onPress={
                  () => navigation.navigate('SelectDateScreen', {
                    destination: destination,
                    fromDestination: fromDestination
                })
                }
              />
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
    iconStyle: {
        width: 25,
        height: 25,
      },
    containericon: {
        flex: 1,
        margin: 22,
    },
    text: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        paddingTop: 30,
    },
    InputText: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 120,
        marginRight: -22,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Esto empuja el botón hacia el final del contenedor
        marginBottom: 20, 
        
    }
  });
export default ToScreen;