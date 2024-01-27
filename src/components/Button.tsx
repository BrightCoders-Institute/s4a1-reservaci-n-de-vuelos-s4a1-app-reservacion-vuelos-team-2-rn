import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface ButtonProps {
  title: string;
  enable: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  enable,
  onPress,
}) => {
  const style = enable
    ? {button: styles.button, text: styles.text}
    : {button: styles.button__disabled, text: styles.text__disabled};

  const process1 = () => {
    console.log('Process 1');
  };

  const process2 = () => {
    console.log('Process 2');
  };

  return (
    <TouchableOpacity
      style={style.button}
      onPress={onPress}
      disabled={!enable}>
      <Text style={style.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5C6EF8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  button__disabled: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  text__disabled: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Button;
