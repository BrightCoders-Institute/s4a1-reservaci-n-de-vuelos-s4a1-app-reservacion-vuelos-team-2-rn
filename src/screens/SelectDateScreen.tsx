import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import FlightCard from "../components/FlightCard";
import {Calendar} from 'react-native-calendars';

const SelectDateScreen = ({navigation}: {navigation: any}) => {
    const [selected, setSelected] = useState("");

    return (
        <View style={styles.containericon}>
            <TouchableOpacity onPress={() => navigation.navigate('ToScreen')}>
                <Image source={require('../icons/atras.png')} style={styles.iconStyle}/>
            </TouchableOpacity>
            <FlightCard fly={  
                {orgCountry: "Serbia",
                orgCity: "BEG",
                destCountry: "Netherlands",
                destCity: "AMS",
                date: selected,
                passengers: 0,}
                }/>
            <Text style={styles.text}>Select date</Text>
            <Calendar
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: '#5f6def',
                    },
                }}
                />
            <View style={styles.buttonContainer}>
              <Button  title="Next" enable={true} onPress={() => navigation.navigate('PassengerScreen')} />
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Esto empuja el botón hacia el final del contenedor
        marginBottom: 20, 
    }
  });
export default SelectDateScreen;