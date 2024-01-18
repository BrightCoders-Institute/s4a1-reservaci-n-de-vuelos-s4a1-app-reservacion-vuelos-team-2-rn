import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';


const SignUp = () => {
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxSubs, setCheckboxSubs] = useState(false);

  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign Up</Text>
      <InputField text={'First name'} type="text" />
      <InputField text={'Email'} type="email" />
      <InputField text={'Password *'} type="text" invisible={true} />
      <View>
        <CheckBox
          state={checkboxTerms}
          setState={setCheckboxTerms}
          textCheckbox={'I agree to the Terms and Privacy Policy.'}
        />
        <CheckBox
          state={checkboxSubs}
          setState={setCheckboxSubs}
          textCheckbox={'Subscribe for select product updates.'}
        />
        <Button title="Sign Up" enable={checkboxTerms} processNum={1} />
        <Text style={{textAlign:'center'}}>or</Text>
        <Button title="Sign Up with Google" enable={true} processNum={2} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: '#5C6EF8',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});

export default SignUp;
