import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface Props {
  text: string;
  type: string | any;
  invisible?: boolean;
}

const InputField = (props: Props) => {
  const {text, type, invisible} = props;

  const [isFocus, setIsFocus] = useState(false);

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View>
      <Text>{text}</Text>
      <TextInput
        style={isFocus ? styles.inputField__Focus : styles.inputField}
        inputMode={type}
        secureTextEntry={invisible}
        onFocus={onFocus}
        onBlur={onBlur}
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
});

export default InputField;
