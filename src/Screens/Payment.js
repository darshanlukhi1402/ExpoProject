import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";

const Payment = () => {
  const generateUniqueId = () => {
    return Math.floor(Math.random() * 9999999999);
  };

  const [furnitureItems, setFurnitureItems] = useState([
    {
      id: generateUniqueId(),
      name: "Sofa",
      price: 499,
      image: require("../Assets/Images/furniture.png"),
    },
    {
      id: generateUniqueId(),
      name: "Coffee Table",
      price: 199,
      image: require("../Assets/Images/lamp.png"),
    },
    // Add more furniture items here
  ]);

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    const newTotalAmount = totalAmount + item.price;
    setCart(updatedCart);
    setTotalAmount(newTotalAmount);
  };

  const stripe = useStripe();

  const buy = async (amount) => {
    if (amount?.toString().length > 1) {
      console.log("11111");
      const response = await fetch("http://localhost:8080/pay", {
        method: "POST",
        body: JSON.stringify({
          amount: amount * 100,
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
    } else {
      Alert.alert("Please Add to Cart any Product");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={furnitureItems}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => {
          return (
            <View
              key={item.id}
              style={{
                padding: 10,
                borderWidth: 1.5,
                margin: 10,
                borderRadius: 15,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 100, height: 100, alignSelf: "center" }}
              />
              <Text style={{ fontSize: 17, fontWeight: "600", color: "green" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "red" }}>
                ${item.price}
              </Text>
              <TouchableOpacity
                onPress={() => addToCart(item)}
                style={{
                  backgroundColor: "blue",
                  padding: 10,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white" }}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={{ backgroundColor: "lightgray", padding: 10 }}>
        <Text>Cart</Text>
        <ScrollView>
          {cart.map((item) => (
            <View key={item.id}>
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
            </View>
          ))}
        </ScrollView>
        <Text>Total: ${totalAmount}</Text>
        <TouchableOpacity
          onPress={() => {
            buy(totalAmount);
          }}
          style={{
            backgroundColor: "green",
            padding: 10,
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
