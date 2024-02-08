import React, {useState, useEffect} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';
import Autocomplete from 'react-native-autocomplete-input';

import atras from '../icons/atras.png';

interface FromDestinationProps {
    ciudad: string;
    pais: string;
}

const FromScreen = ({navigation}: {navigation: any}) => {
  const [fromDestination, setFromDestination] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState({});

  const [fromDestData, setFromDestData] = useState<Array<FromDestinationProps>>([]);
  const [filteredFromDestData, setfilteredFromDestData] = useState<Array<FromDestinationProps>>([]);

  const Data = [
        {
            ciudad: "Monterrey",
            pais: 'MX'
        }
    ]

  useEffect(() => {
    setFromDestData(Data)
  }, []);

  const findFromDest = (query: string) => {
    if (query) {
      setfilteredFromDestData(
        fromDestData.filter((fromDestsData) => fromDestData.ciudad >= 0)
      )
    } else {
      setfilteredFromDestData([]);
    }
  };

  return (
    <View style={styles.containericon}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Image source={atras} style={styles.iconStyle}/>
      </TouchableOpacity>
      <Text style={styles.text}>Where are you now?</Text>
      {/* <TextInput
        style={styles.InputText}
        placeholder="Select Location"
        onChangeText={setFromDestination}
        value={fromDestination}
      /> */}
      <View>
        <View style={styles.autocompleteContainer}>
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                data={filteredFromDestData}
                onChangeText={(text) => findFromDest(text)}
                defaultValue={
                    JSON.stringify(selectedValue) === '{}' ? '' : selectedValue.ciudad
                }
                renderResultList={(item) => (
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedValue(item);
                                setfilteredFromDestData([]);
                            }}
                        >
                            <Text>hola</Text>
                        </TouchableOpacity>
                    </>
                )}
            />
        </View>
        <View >
          {fromDestData.length > 0 ? (
            <>
              <Text>Selected Data</Text>
              <Text>
                {JSON.stringify(selectedValue)}
              </Text>
            </>
          ) : (
            <Text>Enter The Film Title</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          enable={fromDestination == '' ? false : true }
          onPress={
            () => navigation.navigate('ToScreen', {fromDestination: fromDestination})
          }
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
        marginRight: -22,
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
        zIndex: 1
    }
  });
export default FromScreen;
