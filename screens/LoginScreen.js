import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>
        {user}
        in linux, in Windows
      </Text>
    </View>
  );
};

export default LoginScreen;
