import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Auth from "../Screens/Auth";
import SignUpScreen from "../Screens/SignUpScreen";
import Payment from "../Screens/Payment";
import { Provider } from "react-redux";
import HomeP from "../Screens/ReduxToolKit/ReduxScreens/HomeP";
import { store } from "../Screens/ReduxToolKit/store";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="HomeP"
        >
          <Stack.Screen name="HomeP" component={HomeP} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
