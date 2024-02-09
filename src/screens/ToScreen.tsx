import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../components/Button';
import FlightCard from '../components/FlightCard';
import {flights} from '../db/myFlights.json';

const ToScreen = ({navigation, route}: {navigation: any; route: any}) => {
  const {fromDestCity, fromDestCountry, fromDestination} = route.params;
  const [destination, setDestination] = useState<string>('');
  const [allFlights, setAllFlights] = useState<
    Array<{label: string; value: string}>
  >([]);

  const filtroDeVuelo = (fly: any) => {
    return fromDestination !== fly.value;
  };

  const excludeOriginFlight = () => {
    const _allFly = flights.filter(filtroDeVuelo);
    return _allFly;
  };

  const splitFromDestination = () => {
    const position = Number(destination);
    return flights[position].label.split(', ');
  };

  const sendData = () => {
    const des = splitFromDestination();
    navigation.navigate('SelectDateScreen', {
      fromDestCity,
      fromDestCountry,
      fromDestination,
      destCity: des[1],
      destCountry: des[0],
      destination,
    });
  };

  useEffect(() => {
    const _allFlights = excludeOriginFlight();
    setAllFlights(_allFlights);
  }, []);

  return (
    <View style={styles.containericon}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('FromScreen', {
            fromDestCity,
            fromDestCountry,
            fromDestination,
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
          destCountry: '',
          destCity: '',
          date: '',
          passengers: 0,
        }}
      />
      <Text style={styles.text}>Where will you be flying to?</Text>
      <Dropdown
        style={styles.InputText}
        data={allFlights}
        search
        labelField="label"
        valueField="value"
        placeholder="Select location"
        searchPlaceholder="Search a city..."
        value={destination}
        onChange={item => {
          setDestination(item.value);
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          enable={destination === '' ? false : true}
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
  InputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical: 120,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Esto empuja el botón hacia el final del contenedor
    marginBottom: 20,
  },
});
export default ToScreen;
