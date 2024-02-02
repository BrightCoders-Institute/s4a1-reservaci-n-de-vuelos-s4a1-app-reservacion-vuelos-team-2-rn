import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Text} from "react-native";
import FlightCard from './FlightCard';
import { flights } from '../db/myFlights.json';

const FlightList = () => {
  return (
    <View>
      <FlatList
        style={styles.listStyle}
        data={flights}
        renderItem={({item}) => (
          <FlightCard
            fly={item}
          />
        )}
      />

      <TouchableOpacity style={{
        borderRadius: 100,
        width: 80,
        height: 80,
        backgroundColor: '#5C6EF8',
        position: 'absolute',
        bottom: 30,
        alignSelf: "center",
        justifyContent: 'center',
        margin: 0,
        padding: 0,
      }}>
        <Text style={{
          fontSize: 60,
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          padding: 0,
          margin: 0,
        }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: '85%',
  },
});

export default FlightList;