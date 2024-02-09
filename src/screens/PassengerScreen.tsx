import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import Button from '../components/Button';
import FlightCard from '../components/FlightCard';
import WheelPicker from 'react-native-wheely';
import Icon from 'react-native-vector-icons/AntDesign';

const PassengerScreen = ({
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
    date,
  } = route.params;

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const sendData = () => {
    navigation.navigate('ResultsScreen', {
      fromDestCity,
      fromDestCountry,
      fromDestination,
      destCity,
      destCountry,
      destination,
      date,
      numPassagers: selectedIndex,
    });
  };

  return (
    <View style={styles.containericon}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('SelectDateScreen', {
            fromDestCity,
            fromDestCountry,
            fromDestination,
            destCity,
            destCountry,
            destination,
            date,
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
          date: date,
          passengers: selectedIndex,
        }}
      />
      <Text style={styles.text}>How many passengers?</Text>
      <View>
        <Icon
          style={styles.caretleft}
          name="caretleft"
          size={20}
          color="rgb(92, 110, 248)"
        />
        <Icon
          style={styles.caretright}
          name="caretright"
          size={20}
          color="rgb(92, 110, 248)"
        />
        <WheelPicker
          selectedIndex={selectedIndex}
          options={['---', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
          onChange={index => setSelectedIndex(index)}
          itemStyle={styles.wheelPicker}
          itemTextStyle={styles.wheelPickerText}
          containerStyle={styles.wheelPickerContainer}
          selectedIndicatorStyle={styles.selectedIndicator}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          enable={selectedIndex === 0 ? false : true}
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
  wheelPicker: {
    width: 320,
    height: 150,
  },
  selectedIndicator: {
    borderStyle: 'solid',
    borderColor: '#d6d6d6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    maxWidth: 300,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  wheelPickerText: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wheelPickerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  caretright: {
    position: 'absolute',
    left: 90,
    top: 108,
  },
  caretleft: {
    position: 'absolute',
    right: 120,
    top: 108,
  },
});
export default PassengerScreen;
