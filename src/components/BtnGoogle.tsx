import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Button from './Button';
import auth from '@react-native-firebase/auth';

const BtnGoogle = ({navigation, title}: {navigation: any; title: string}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '644313173315-llsu6r28k9sq1fgv1h0801fc1tnmrp4v.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    navigation.push('HomePage');
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      title={`${title} with Google`}
      enable={true}
      onPress={onGoogleButtonPress}
      icon={
        'https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_1280.png'
      }
    />
  );
};

export default BtnGoogle;
