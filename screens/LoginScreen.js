import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'

const LoginScreen = () => {

  const { googleSignin } = useAuth()
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: '#00233b' }}>
      <ImageBackground
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/logo.png") }
      >
        <View style={{ position: "absolute", bottom: 200, marginHorizontal: "25%"}}>

          <GoogleSigninButton onPress={googleSignin} style={{marginLeft: -15}}/>
          
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
