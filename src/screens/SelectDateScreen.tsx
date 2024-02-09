import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import Button from '../components/Button';
import FlightCard from '../components/FlightCard';
import {Calendar} from 'react-native-calendars';
import {format} from 'date-fns';

const SelectDateScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {
    fromDestCity,
    fromDestCountry,
    fromDestination,
    destCity,
    destCountry,
    destination,
  } = route.params;
  const [selected, setSelected] = useState('');

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };

  const sendData = () => {
    navigation.navigate('PassengerScreen', {
      fromDestCity,
      fromDestCountry,
      fromDestination,
      destCity,
      destCountry,
      destination,
      date: selected ? getFormattedDate(selected) : '',
    });
  };

  return (
    <View style={styles.containericon}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ToScreen', {
            fromDestCity,
            fromDestCountry,
            fromDestination,
            destCity,
            destCountry,
            destination,
          })
        }>
        <Image
          source={require('../icons/atras.png')}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
      <FlightCard
        fly={{
          orgCountry: fromDestCountry,
          orgCity: fromDestCity,
          destCountry: destCountry,
          destCity: destCity,
          date: selected ? getFormattedDate(selected) : '',
          passengers: 0,
        }}
      />
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
          enable={selected === '' ? false : true}
          onPress={sendData}
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
  },
});
export default SelectDateScreen;
