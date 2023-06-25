import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from "react";
const LoginScreen = () => {
  
  
  GoogleSignin.configure({
    webClientId: '963463176931-tm1in0plmsk34di0n05vsq8icrnd6rqb.apps.googleusercontent.com'
  })
  
  
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const { user, updateUser } = useAuth();

 // Handle user state changes
 function onAuthStateChanged(user) {
    updateUser(user);
   if (initializing) setInitializing(false);
 }

 useEffect(() => {
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   return subscriber; // unsubscribe on unmount
  }, []);

  
  
  const onGoogleButtonPress = async() => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    const user_sign_in = auth().signInWithCredential(googleCredential)
    user_sign_in.then((user)=>{
      console.log(user)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  if (initializing) return null;

  return (
    <View>
      <Text>
        {user}
        in linux, in Windows, etc
      </Text>
      <GoogleSigninButton onPress={onGoogleButtonPress }/>
    </View>
  );
};

export default LoginScreen;
