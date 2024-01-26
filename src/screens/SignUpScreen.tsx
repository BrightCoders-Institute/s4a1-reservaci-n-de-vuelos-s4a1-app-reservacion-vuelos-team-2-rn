import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';

const SignUp = ({navigation}) => {
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxSubs, setCheckboxSubs] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState('');
  const [pwdValid, setPwdValid] = useState('');
  const [loading, setLoading] = useState(false);

  const emailInvalid = (reason: string) => {
    setEmailValid(reason);
  };

  const pwdInvalid = (reason: string) => {
    setPwdValid(reason);
  };

  const transformError = (error: unknown) => {
    const err = `${error}`;

    return err.slice(err.indexOf(']') + 2, err.length + 1);
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(response);
      navigation.push('HomePage');
    } catch (error) {
      console.log(error);
      const reason = transformError(error);

      if (reason.includes('email')) {
        emailInvalid(reason);
        setPwdValid('');
      } else if (reason.includes('password')) {
        pwdInvalid(reason);
        setEmailValid('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign Up</Text>
      <InputField
        text={'First name'}
        type="text"
        onChangeText={text => setName(text)}
        invisible={false}
        reason=""
      />
      <InputField
        text={'Email *'}
        type="email"
        onChangeText={text => setEmail(text)}
        invisible={false}
        reason={emailValid}
      />
      <InputField
        text={'Password *'}
        type="text"
        onChangeText={text => setPassword(text)}
        invisible={true}
        reason={pwdValid}
      />
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
      {loading ? <ActivityIndicator size="large" color="0000ff" /> : false}
      {/* Posible componente reutilizable */}
      <View>
        <Button
          title="Sign Up"
          enable={checkboxTerms && email.length > 0 && password.length > 0}
          onPress={signUp}
        />
        <Text style={{textAlign: 'center'}}>or</Text>
        <Button title="Sign Up with Google" enable={true} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('HomePage')}>
            <Text style={{color: 'blue'}}>Log In</Text>
          </TouchableOpacity>
        </View>
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
