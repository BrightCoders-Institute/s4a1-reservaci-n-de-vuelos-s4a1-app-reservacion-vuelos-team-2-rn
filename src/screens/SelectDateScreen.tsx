import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import FlightCard from "../components/FlightCard";
import {Calendar} from 'react-native-calendars';
import { format } from 'date-fns';

const SelectDateScreen = ({navigation, route}: {navigation: any, route: any}) => {
    const {destination, fromDestination} = route.params
    const [selected, setSelected] = useState("");

    const getFormattedDate = (dateString: string) => {
      const date = new Date(dateString);
      return format(date, 'MMMM dd, yyyy');
  };

    return (
        <View style={styles.containericon}>
            <TouchableOpacity onPress={() => navigation.navigate('ToScreen', {
                    destination: destination,
                    fromDestination: fromDestination
                })}>
                <Image source={require('../icons/atras.png')} style={styles.iconStyle}/>
            </TouchableOpacity>
            <FlightCard fly={  
                {orgCountry: fromDestination,
                orgCity: "BEG",
                destCountry: destination,
                destCity: "AMS",
                date: selected ? getFormattedDate(selected) : "",
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
              <Button 
                title="Next"
                enable={selected == '' ? false : true }
                onPress={
                  () => navigation.navigate('PassengerScreen', {
                    date: selected ? getFormattedDate(selected) : "",
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
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Esto empuja el botón hacia el final del contenedor
        marginBottom: 20, 
    }
  });
export default SelectDateScreen;