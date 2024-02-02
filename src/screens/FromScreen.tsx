import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from "react-native";
import Button from '../components/Button';


const FromScreen = ({navigation}: {navigation: any}) => {
    return (
        <View style={styles.containericon}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                <Image source={require('../icons/atras.png')} style={styles.iconStyle}/>
            </TouchableOpacity>
            <Text style={styles.text}>Where are you now?</Text>
            <TextInput style={styles.InputText} placeholder="Select Location"/>
            <View style={styles.buttonContainer}>
              <Button  title="Next" enable={true} onPress={() => navigation.navigate('ToScreen')} />
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
        
    }
  });
export default FromScreen;
