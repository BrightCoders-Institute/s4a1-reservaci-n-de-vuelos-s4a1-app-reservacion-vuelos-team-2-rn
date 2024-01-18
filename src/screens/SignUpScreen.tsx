import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth'


const SignUp = () => {
  const [checkboxTerms, setCheckboxTerms] = useState(false);
  const [checkboxSubs, setCheckboxSubs] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignUpTest = () =>{
    auth().createUserWithEmailAndPassword(email,password).then(()=>{
      Alert.alert("Usuario Creado!")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  return (
    <View style={{flex: 1, margin: 22}}>
      <Text style={styles.textTitle}>Sign Up</Text>
      <InputField text={'First name'} type="text" />
      <InputField text={'Email'} type="email" onChangeText={(text) => setEmail(text)}/>
      <InputField text={'Password *'} type="text" invisible={true}  onChangeText={(text) => setPassword(text)} />
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
        <Button title="Sign Up" enable={checkboxTerms} onPress={SignUpTest}/>
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
