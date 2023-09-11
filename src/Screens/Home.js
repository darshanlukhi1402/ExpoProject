import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Home = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (email.length > 0 && password.length > 0) {
      console.log("Sign up with:", email, password);
      navigation.navigate("Home", { email, password });
    } else {
      alert(
        `Teri to Email & Password !!! 
         Kon, Tera Baap Dalega ...`
      );
    }
  };

  return (
    <View style={{ ...styles.container, height: "100%" }}>
      <Text style={{ ...styles.title, height: "auto" }}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={{
          ...styles.button,
          height: "auto",
          justifyContent: "center",
        }}
        onPress={() => {
          handleSignUp();
        }}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.toggleText}>Already have an account? Sign In!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#475252",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    height: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  toggleText: {
    marginTop: 10,
    color: "blue",
  },
});

export default Home;
