//creating custom hook to manage login user authorization

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser]=useState(null)
  const [loading, setLoading] = useState(false);
  const updateUser = (newUser) => {
    setUser(newUser);
  };

  

  GoogleSignin.configure({
    webClientId: '963463176931-tm1in0plmsk34di0n05vsq8icrnd6rqb.apps.googleusercontent.com'
  })
  
  
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);

 // Handle user state changes
 function onAuthStateChanged(user) {
    updateUser(user);
   if (initializing) setInitializing(false);
 }

 useEffect(() => {
   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
   return subscriber; // unsubscribe on unmount
  }, []);
  
  const googleSignin = async() => {
    // setLoading(true)
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

  const signOut = async () => {
    setLoading(true)
    try{
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      updateUser(null)
    }
    catch( error) {
      console.error(error)
    }
    setLoading(false)
  }
  

  //using useMemo hook, so it won't be needed to re-render every component that uses one value of useAuth when one of the values changes, this way the values are cached
  const memoedValue = useMemo(()=> ({
    user, updateUser, signOut, googleSignin, loading
  }),[user, loading])

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initializing && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
