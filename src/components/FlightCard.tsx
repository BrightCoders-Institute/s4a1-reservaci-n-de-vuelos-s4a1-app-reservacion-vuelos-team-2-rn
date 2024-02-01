import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

interface FlyProp {
  orgCountry: string;
  orgCity: string;
  destCountry: string;
  destCity: string;
  date: string;
  passengers: string;
}

const Row = ({data, data2, stys, icon}) => {
  return(
    <View style={styles.vuelo}>
      <Text style={stys}>{data}</Text>
      {icon ? <Text>ICon</Text> : false }
      <Text style={stys}>{data2}</Text>
    </View>
  );
};

const FlightCard = ({item}: {item: FlyProp}) => { 
    const { orgCountry, orgCity, destCountry, destCity, date, passengers } = item;
    return (
      <View style={styles.card}>
        <Row data={orgCity} data2={destCity} stys={styles.airportCode} icon={true} />
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.passengers}>{passengers} No.</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowColor: 'black',
      shadowOffset: { height: 2, width: 0 },
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    airportCode: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    date: {
      fontSize: 16,
      color: 'black',
      marginTop: 4,
    },
    passengers: {
      fontSize: 16,
      color: '#666',
      marginTop: 4,
    },
    iconStyle: {
        width: 24,
        height: 24,
    },
    vuelo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row'
    },
  });
  
  export default FlightCard;