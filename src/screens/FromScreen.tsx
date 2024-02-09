import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import Button from '../components/Button';
import {Dropdown} from 'react-native-element-dropdown';
import atras from '../icons/atras.png';

import {flights} from '../db/myFlights.json';

const FromScreen = ({navigation}: {navigation: any}) => {
  const [fromDestination, setFromDestination] = useState<string>('');

  const splitFromDestination = () => {
    const position = Number(fromDestination);
    return flights[position].label.split(', ');
  };

  const sendData = () => {
    const org = splitFromDestination();
    navigation.navigate('ToScreen', {
      fromDestCity: org[1],
      fromDestCountry: org[0],
      fromDestination,
    });
  };

  return (
    <View style={styles.containericon}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Image source={atras} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.text}>Where are you now?</Text>
      <Dropdown
        style={styles.InputText}
        data={flights}
        search
        labelField="label"
        valueField="value"
        placeholder="Select location"
        searchPlaceholder="Search a city..."
        value={fromDestination}
        onChange={item => {
          setFromDestination(item.value);
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          enable={fromDestination === '' ? false : true}
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
    paddingTop: 80,
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
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});
export default FromScreen;
