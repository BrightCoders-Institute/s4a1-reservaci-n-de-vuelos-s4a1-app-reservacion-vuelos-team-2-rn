import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import BtnGoogle from '../components/BtnGoogle';

const SignUp = ({navigation}: {navigation: any}) => {
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxSubs, setCheckboxSubs] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [nameValid, setNameValid] = useState<string | boolean>('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z]+$/;

  const [loading, setLoading] = useState(false);

  const emailInvalid = (reason: string) => {
    setEmailValid(reason);
  };

  const passwordInvalid = () => {
    setPasswordValid('Incorrect email and/or password');
  };

  const nameInvalid = (state: boolean | string) => {
    if (state) {
      setNameValid('Invalid name, only text');
    } else {
      setNameValid('');
    }
  };

  const isEmpty = () => {
    return (
      checkboxTerms &&
      name.length > 0 &&
      password.length > 0 &&
      email.length > 0
    );
  };

  const SignUpTest = () => {
    if (!nameRegex.test(name)) {
      nameInvalid(true);
      return;
    } else if (!passwordRegex.test(password) || !emailRegex.test(email)) {
      nameInvalid(false);
      passwordInvalid();
      return;
    }
    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .then((userCredential) => {
        navigation.push('HomePage');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          emailInvalid('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          passwordInvalid();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign Up</Text>
      <InputField
        text={'First name'}
        type="text"
        onChangeText={text => setName(text)}
        secure={false}
        reason={nameValid}
      />
      <InputField
        text={'Email *'}
        type="email"
        onChangeText={text => setEmail(text)}
        secure={false}
        reason={emailValid}
      />
      <InputField
        text={'Password *'}
        type="text"
        onChangeText={text => setPassword(text)}
        secure={true}
        reason={passwordValid}
      />
      {passwordValid === '' ? (
        ''
      ) : (
        <Text style={styles.textInvalidPass}>
          Use 8 or more characters with a mix of letters, numbers, and symbols.
        </Text>
      )}
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
      <View>
        <Button title="Sign Up" enable={isEmpty()} onPress={SignUpTest} />
        <Text style={{textAlign: 'center'}}>or</Text>
        <BtnGoogle navigation={navigation}/>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
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
  textInvalidPass: {
    marginBottom: 20,
  },
});

export default SignUp;
