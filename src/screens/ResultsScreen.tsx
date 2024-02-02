import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import FlightCard from "../components/FlightCard";

const ResultsScreen = ({navigation}: {navigation: any}) => {
    const [selected, setSelected] = useState("");

    return (
        <View style={styles.containericon}>
            <FlightCard fly={  
                {orgCountry: "Serbia",
                orgCity: "BEG",
                destCountry: "Netherlands",
                destCity: "AMS",
                date: 'September 3, 2024',
                passengers: 2,}
                }/>
            <Text style={styles.text}>Your request     was received.</Text>
            <View style={styles.buttonContainer}>
              <Button  title="Next" enable={true} onPress={() => navigation.navigate('HomePage')} />
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