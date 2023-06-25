// import 'react-native-gesture-handler';
import { StyleSheet } from "react-native";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import 'expo-dev-client'
// import { StatusBar } from 'expo-status-bar';
export default function App() {

  return (
    <>
    {/* <StatusBar style="light" /> */}
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
