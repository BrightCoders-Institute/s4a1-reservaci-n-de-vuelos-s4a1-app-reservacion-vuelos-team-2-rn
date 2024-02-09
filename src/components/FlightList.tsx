import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';
import FlightCard from './FlightCard';
import {flights} from '../db/myFlights.json';
interface FlighProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const FlightList: React.FC<FlighProps> = ({onPress}) => {
  return (
    <View>
      <FlatList
        ItemSeparatorComponent={Linea}
        style={styles.listStyle}
        data={flights}
        renderItem={({item}) => <FlightCard fly={item} />}
      />

      <TouchableOpacity
        style={{
          borderRadius: 100,
          width: 80,
          height: 80,
          backgroundColor: '#5C6EF8',
          position: 'absolute',
          bottom: 30,
          alignSelf: 'center',
          justifyContent: 'center',
          margin: 0,
          padding: 0,
        }}
        onPress={onPress}>
        <Text
          style={{
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
const Linea = () => {
  return (
    <View style={{height: 1, width: '100%', backgroundColor: 'black'}}></View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: '85%',
  },
});

export default FlightList;
