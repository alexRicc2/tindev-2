import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import useAuth from "../hooks/useAuth";
import auth from '@react-native-firebase/auth';
const HomeScreen = () => {
  const {updateUser} = useAuth()
  const signOut = async () => {
    try{
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      updateUser(null)
    }
    catch( error) {
      console.error(error)
    }
  }
  const navigation = useNavigation();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="go to chat"
        onPress={() => updateUser(null)}
      />
      <Button title="sign out" onPress={signOut}/>
    </View>
  );
};

export default HomeScreen;
