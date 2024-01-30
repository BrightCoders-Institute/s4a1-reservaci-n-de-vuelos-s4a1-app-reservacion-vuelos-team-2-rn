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
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '644313173315-llsu6r28k9sq1fgv1h0801fc1tnmrp4v.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log(idToken);
    navigation.push('HomePage');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const passwordInvalid = () => {
    setPasswordValid('Incorrect email and/or password');
  };

  const isEmpty = () => {
    return password.length > 0 && email.length > 0;
  };

  const SignUpTest = () => {
    if (!passwordRegex.test(password) || !emailRegex.test(email)) {
      passwordInvalid();
      return;
    }
    setLoading(true);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then((userCredential) => {
        navigation.push("HomePage");
      })
      .catch((error) => {
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
      <Text style={styles.textTitle}>Sign In</Text>
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
        reason={passwordValid}
      />
      {passwordValid === '' ? (
        ''
      ) : (
        <Text style={styles.textInvalidPass}>
          Use 8 or more characters with a mix of letters, numbers, and symbols.
        </Text>
      )}
      {loading ? <ActivityIndicator size="large" color="0000ff" /> : false}
      {/* Posible componente reutilizable */}
      <View style={styles.textInvalidPass} />
      <View>
        <Button title="Sign Up" enable={isEmpty()} onPress={SignUpTest} />
        <Text style={{textAlign: 'center'}}>or</Text>
        <Button
          title="Sign Up with Google"
          enable={true}
          onPress={onGoogleButtonPress}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>You don't have an account? </Text>
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
