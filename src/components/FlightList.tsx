import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';
import FlightCard from './FlightCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface FlighProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const FlightList: React.FC<FlighProps> = ({onPress}) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const userId = auth().currentUser?.uid;
      if (userId) {
        const snapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('flights')
          .get();
        const fetchedFlights = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFlights(fetchedFlights);
      }
    };
    fetchFlights();
  });

  return (
    <>
      {flights.length === 0 ? (
        <View>
          <Text style={styles.emptyFly}>
            You don't have any flights registered yet.
          </Text>
        </View>
      ) : (
        <View>
          <FlatList
            ItemSeparatorComponent={Linea}
            style={styles.listStyle}
            data={flights}
            keyExtractor={item => item.id}
            renderItem={({item}) => <FlightCard fly={item} />}
          />
        </View>
      )}
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <Text style={styles.touchableText}>+</Text>
      </TouchableOpacity>
    </>
  );
};

const Linea = () => {
  return <View style={{height: 1, width: '100%', backgroundColor: 'black'}} />;
};

const styles = StyleSheet.create({
  listStyle: {
    width: '85%',
  },
  touchable: {
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
  },
  touchableText: {
    fontSize: 60,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  emptyFly: {
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});
export default FlightList;
