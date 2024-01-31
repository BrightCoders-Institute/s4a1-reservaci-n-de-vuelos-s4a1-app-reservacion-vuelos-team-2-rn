import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  Image
} from 'react-native';

interface ButtonProps {
  title: string;
  enable: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: any;
}

const Button: React.FC<ButtonProps> = ({title, enable, onPress, icon}) => {
  const style = enable
    ? {button: styles.button, text: styles.text, icgiton: styles.buttonWithIcon}
    : {button: styles.button__disabled, text: styles.text__disabled};

  return (
    <TouchableOpacity style={style.button} onPress={onPress} disabled={!enable}>
       {icon && <Image source={{uri: icon}} style={styles.icon} />}
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
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  buttonWithIcon: {
    paddingLeft: 15, 
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 25, 
    height: 25, 
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
