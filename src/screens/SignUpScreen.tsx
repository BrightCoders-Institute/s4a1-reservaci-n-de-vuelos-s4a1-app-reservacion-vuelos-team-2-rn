import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

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

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "644313173315-llsu6r28k9sq1fgv1h0801fc1tnmrp4v.apps.googleusercontent.com",
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

  const SignUpTest = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then((userCredential) => {
        navigation.push("HomePage");
      })
      .catch((error)=>{
        if (error.code === 'auth/email-already-in-use') {
          emailInvalid('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          emailInvalid('That email address is invalid!');
        }
      });
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
          onPress={SignUpTest}
        />
        <Text style={{textAlign: 'center'}}>or</Text>
        <Button
          title="Sign Up with Google"
          enable={true}
          onPress={onGoogleButtonPress}
        />
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
