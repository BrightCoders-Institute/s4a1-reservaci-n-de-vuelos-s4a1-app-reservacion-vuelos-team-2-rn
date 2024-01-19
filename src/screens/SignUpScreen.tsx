import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth'



const SignUp = ({navigation}) => {
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxSubs, setCheckboxSubs] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState('');

  const emailInvalid = (reason: string) => {
    setEmailValid(reason);
  }

  const SignUpTest = () =>{
    auth()
      .createUserWithEmailAndPassword( email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Alert.alert("Usuario Creado! " + email)
        // console.log(user)
      })
      .then((userCredential) => {
        // navigation.navigate('HomePageScreen');
        navigation.push("HomePage")
    })
    .catch((error)=>{
      if (error.code === 'auth/email-already-in-use') {
        emailInvalid('That email address is already in use!');
      }
      
      if (error.code === 'auth/invalid-email') {
        emailInvalid('That email address is invalid!');
      }
  
      //console.error(error);
    })
  }

  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign Up</Text>
      <InputField
        text={'First name'}
        type="text"
        onChangeText={(text) => setName(text)}
        invisible={false}
        reason=''
      />
      <InputField
        text={'Email *'}
        type="email"
        onChangeText={(text) => setEmail(text)}
        invisible={false}
        reason={emailValid}
      />
      <InputField
        text={'Password *'}
        type="text"
        onChangeText={(text) => setPassword(text)}
        invisible={true}
        reason=''
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
      {/* Posible componente reutilizable */}
      <View> 
        <Button title="Sign Up" enable={checkboxTerms} onPress={SignUpTest}/>
        <Text style={{textAlign:'center'}}>or</Text>
        <Button title="Sign Up with Google" enable={true} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() =>
            navigation.push("HomePage")
          }>
            <Text style={{color:'blue'}}>Log In</Text>
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
