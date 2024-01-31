import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface Props {
  text: string;
  reason: string | boolean;
  type: string | any;
  secure?: boolean;
  onChangeText?: (text: string) => void;
}

const InputField = (props: Props) => {
  const {text, type, onChangeText, secure, reason} = props;

  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View>
      <Text>
        {text} <Text style={styles.span}>{reason}</Text>
      </Text>
      <TextInput
        style={isFocus ? styles.inputField__Focus : styles.inputField}
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode={type}
        secureTextEntry={secure}
        onChangeText={onChangeText}
      />
    </View>
  );
};
//#5C6EF8 color purple
const styles = StyleSheet.create({
  inputField__Focus: {
    borderWidth: 1,
    borderColor: 'purple',
  },
  inputField: {
    borderWidth: 0.5,
    borderColor: 'black',
  },
  span: {
    color: 'red',
  },
});

export default InputField;
