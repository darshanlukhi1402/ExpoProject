import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { fetchProducts } from "../Actions/Action";

const HomeP = () => {
  const { data, isLoader, isError } = useSelector((state) => state?.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <StatusBar style="dark" />
      {isLoader ? (
        <Text>Loading ....</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item?.id}
          data={data}
          style={{ marginTop: 15 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: item,
                  width: 150,
                  alignSelf: "center",
                  margin: 10,
                }}
              >
                <Text>{item?.id}</Text>
                <Text>{item?.email}</Text>
                <Text>{item?.phone}</Text>
                <Text>{item?.firstName}</Text>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeP;

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
});
