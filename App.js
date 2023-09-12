import React from "react";
import Navigation from "./src/Navigations/Navigation";
import { StatusBar } from "expo-status-bar";
import { StripeProvider } from "@stripe/stripe-react-native";

const App = () => {
  return (
    <>
      {/* <StripeProvider
        publishableKey={
          "pk_test_51NnwcUSC0UazBjvLXN8bWQ30nGxd7Hhp9bjxYLrsM9AxahPHOoeft2vwB0dS38VtNpEBRVtcjBzXVisIGdPtzFy70049yXqIZl"
        }
      > */}
      <Navigation />
      <StatusBar style="auto" />
      {/* </StripeProvider> */}
    </>
  );
};

export default App;
