import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckBoxComponent = () => {
  const [isSelected, setSelection] = useState(false);

  return (
    // <View style={styles.container}>
    <View>
      {/* <View style={styles.checkboxContainer}> */}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>?????</Text>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          //   style={styles.checkbox}
        />
      </View>
      <Text>Is CheckBox selected: {isSelected ? 'si' : 'no'}</Text>
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
