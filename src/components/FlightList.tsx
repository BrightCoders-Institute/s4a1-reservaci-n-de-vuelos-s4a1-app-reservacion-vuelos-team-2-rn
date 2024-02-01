import React from "react";
import { FlatList } from "react-native";
import FlightCard from './FlightCard';
import { flights } from '../db/myFlights.json';


const FlightList = () => {
    return (
      <FlatList
        data={flights}
        renderItem={({item}) => (
          <FlightCard
            item={item}
          />
        )}
      />
    );
  };


export default FlightList;