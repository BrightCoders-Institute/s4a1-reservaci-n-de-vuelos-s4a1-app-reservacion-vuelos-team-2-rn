import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputField from '../components/InputField';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import BtnGoogle from '../components/BtnGoogle';

const SignIn = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [loading, setLoading] = useState(false);

  const emailInvalid = (reason: string) => {
    setEmailValid(reason);
  };

  const clearErrors = () => {
    setEmailValid('');
    setPasswordValid('');
  };

  useEffect(() => {
    clearErrors();
  }, []);

  const passwordInvalid = () => {
    setPasswordValid('Wrong password!');
  };

  const isEmpty = () => {
    return password.length > 0 && email.length > 0;
  };

  const SignInTest = () => {
    if (!passwordRegex.test(password) || !emailRegex.test(email)) {
      passwordInvalid();
      return;
    }
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
      })
      .then((userCredential) => {
        navigation.push('HomePage');
      })
      .catch(error => {
        console.log(error.code);
        if (error.code === 'auth/invalid-credential') {
          emailInvalid('That email address not found!');
        }
        if (error.code === 'auth/wrong1-password') {
          passwordInvalid();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign In</Text>
      <InputField
        text={'Email'}
        type="email"
        onChangeText={text => setEmail(text)}
        secure={false}
        reason={emailValid}
      />
      <InputField
        text={'Password'}
        type="text"
        onChangeText={text => setPassword(text)}
        secure={true}
        reason={passwordValid}
      />
      {loading ? <ActivityIndicator size="large" color="0000ff" /> : false}
      <View style={styles.textInvalidPass} />
      <View>
        <Button title="Sign In" enable={isEmpty()} onPress={SignInTest} />
        <Text style={{textAlign: 'center'}}>or</Text>
        <BtnGoogle navigation={navigation}/>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>Don't you have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: 'blue'}}> Sign Up</Text>
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

export default SignIn;
