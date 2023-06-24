import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>
        {user}
        in linux
      </Text>
    </View>
  );
};

export default LoginScreen;
