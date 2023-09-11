import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Auth from "../Screens/Auth";
import SignUpScreen from "../Screens/SignUpScreen";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
