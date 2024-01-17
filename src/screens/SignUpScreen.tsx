import React from 'react';
import {View, Text} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';

const SignUp = () => {
  return (
    <View style={{flex: 1, margin: 22}}>
      <Text>Sign Up</Text>
      <InputField text={'First name'} type="text" />
      <InputField text={'Email'} type="email" />
      <InputField text={'Password'} type="text" invisible={true} />
      <View>
        <CheckBox />
        <CheckBox />
        <Button title="Sign Up" />
      </View>
    </View>
  );
};

export default SignUp;
