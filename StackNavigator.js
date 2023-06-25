import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import LoginScreen from "./screens/LoginScreen";
import useAuth from "./hooks/useAuth";
import ModalRegisterScreen from "./screens/ModalRegisterScreen";
import MatchScreen from "./screens/MatchScreen";
import MessageScreen from "./screens/MessageScreen";
import UserScreen from "./screens/UserScreen";
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const StackNavigator = () => {
  const { user } = useAuth();


  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      {/* <Drawer.Navigator> */}
      {user ? (
        <>
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Group>
          {/* <Drawer.Screen name="UserScreen" component={UserScreen}/> */}
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen name="MatchScreen" component={MatchScreen}/>
          <Stack.Screen name="ModalRegisterScreen" component={ModalRegisterScreen}/>
        </Stack.Group>
        </>
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
        {/* </Drawer.Navigator> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
