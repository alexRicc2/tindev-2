import { View, Text, Button, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { useLayoutEffect } from "react";
const HomeScreen = () => {
  const {signOut, user} = useAuth()
  
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  console.log("user", user.photoURL)
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', position: 'relative', justifyContent: 'space-between', flexDirection: 'row', padding: 5}}>
        <TouchableOpacity onPress={signOut}>
          <Image source={{uri: user.photoURL}} style={{height: 40, width: 40, borderRadius: 20}}/> 
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/icon.png')} style={{height: 50, width: 50}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("ChatScreen")}>
          <Ionicons name="chatbox" size={40} color="#00233b" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
