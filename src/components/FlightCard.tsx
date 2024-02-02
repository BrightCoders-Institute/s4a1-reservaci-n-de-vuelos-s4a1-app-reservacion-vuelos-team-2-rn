import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

interface FlyProp {
  orgCountry: string;
  orgCity: string;
  destCountry: string;
  destCity: string;
  date: string;
  passengers: number;
}

const FlightCard = ({fly}: {fly: FlyProp}) => { 
    const { orgCountry, orgCity, destCountry, destCity, date, passengers } = fly;
    return (
      <View style={styles.card}>
        <View style={styles.fly}>
          <View style={{width: '40%'}}>
            <Text style={styles.airportCode}>{orgCity}</Text>
            <Text>{orgCountry}</Text>
          </View>
          <View style={styles.containerIconStyle}>
            <Image source={require('../icons/airplane.png')} style={styles.iconStyle}/>
          </View>
          <View style={{width: '40%'}}>
            <Text style={[styles.airportCode, {textAlign: 'right'}]}>{destCity}</Text>
            <Text style={{textAlign: 'right'}}>{destCountry}</Text>
          </View>
        </View>

        <View style={styles.rowgray}/>
          <View style={styles.fly}>
          <Text style={styles.detailsFly}>{date}</Text>
          <Text style={styles.detailsFly}>{passengers != 0 ? passengers+" passenger": ""}</Text>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    card: {
      paddingVertical: 20,
    },
    fly: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
    airportCode: {
      fontSize: 19,
      color: 'black',
      fontWeight: 'bold',
    },
    detailsFly: {
      fontSize: 13,
      color: 'black',
      fontWeight: 'bold',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    containerIconStyle: {
      width: '20%',
      alignItems: 'center',
    },
    rowgray: {
      height: 1,
      backgroundColor: '#D3D3D3',
      marginTop: 7,
      marginBottom: 7,
    },

  });

  export default FlightCard;
  