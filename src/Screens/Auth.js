import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { Button } from "react-native";

const Auth = () => {
  const { confirmPayment } = useStripe();

  const stripe = useStripe();
  const amountValue = 999999;

  const buy = async () => {
    const response = await fetch("http://localhost:8080/pay", {
      method: "POST",
      body: JSON.stringify({
        amount: amountValue,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log("in buyy");
    console.log("data", data);
    if (!response.ok) {
      return Alert.alert(data.message);
    }
    const clientSecret = data.clientSecret;
    const initSheet = await stripe.initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
    });
    if (initSheet.error) {
      return Alert.alert(initSheet.error.message);
    }
    const presentSheet = await stripe.presentPaymentSheet({
      clientSecret,
    });
    if (presentSheet.error) {
      return Alert.alert(presentSheet.error.message);
    }
  };
  // const [publishableKey, setPublishableKey] = useState("");

  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   console.log("key", key);
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);
  return (
    <View style={styles.container}>
      <Text>Auth</Text>
      {/* <StripeProvider
        publishableKey={
          "pk_test_51NnwcUSC0UazBjvLXN8bWQ30nGxd7Hhp9bjxYLrsM9AxahPHOoeft2vwB0dS38VtNpEBRVtcjBzXVisIGdPtzFy70049yXqIZl"
        }
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log("cardDetails", cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log("focusField", focusedField);
          }}
        />
      </StripeProvider> */}
      <Button title="Press me" onPress={() => buy()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Auth;
