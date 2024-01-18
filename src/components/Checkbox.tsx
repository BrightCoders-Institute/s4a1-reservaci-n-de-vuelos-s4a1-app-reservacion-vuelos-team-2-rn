import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  textCheckbox: string;
}

const CheckBoxComponent = (props: Props) => {
  const {state, setState, textCheckbox} = props;

  return (
    // <View style={styles.container}>
    <View>
      {/* <View style={styles.checkboxContainer}> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CheckBox
          value={state}
          onValueChange={setState}
          //   style={styles.checkbox}
        />
        <Text>{textCheckbox}</Text>
      </View>
      {/* <Text>Is CheckBox selected: {state ? 'si' : 'no'}</Text> */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   checkbox: {
//     backgroundColor: '#5C6EF8',
//   },
//   label: {
//     margin: 8,
//   },
// });

export default CheckBoxComponent;
