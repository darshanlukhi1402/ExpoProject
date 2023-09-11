import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

const SignUpScreen = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Car",
      price: 10,
      description: "Description 1",
      category: "Electronics",
    },
    {
      id: "2",
      name: "Mobile",
      price: 20,
      description: "Description 2",
      category: "Clothing",
    },
    {
      id: "3",
      name: "pen",
      price: 30,
      description: "Description 3",
      category: "Electronics",
    },
    {
      id: "4",
      name: "Towel",
      price: 15,
      description: "Description 4",
      category: "Clothing",
    },
    {
      id: "5",
      name: "Soap",
      price: 25,
      description: "Description 5",
      category: "Books",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Simulate user authentication (you can replace this with your own auth logic)
    const simulatedUser = { id: "1", name: "Darshan Lukhi" };
    setUser(simulatedUser);
  }, []);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const filterProducts = () => {
    let filteredProducts = products;

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filteredProducts;
  };

  const handleCheckout = () => {
    // Simulate a checkout process (you can replace this with your own checkout logic)
    alert("Checkout successful! Total amount: $" + getTotalPrice());
    setCart([]); // Clear the cart after successful checkout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>E-Commerce App</Text>
      {user ? (
        <View>
          <Text style={styles.userText}>Welcome, {user.name}!</Text>
          <View style={{ marginVertical: 10 }}>
            <Button
              title="Sign Out"
              onPress={() => setUser(null)}
              color="#d9534f"
            />
          </View>
        </View>
      ) : (
        <Text>Please sign in to continue shopping.</Text>
      )}
      <View style={{ marginVertical: 10 }}>
        <Button
          title={showCart ? "Hide Cart" : "Show Cart"}
          onPress={toggleCart}
          color="#5bc0de"
        />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Products"
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Text style={styles.categoryLabel}>Filter by Category:</Text>
      <View style={styles.categoryButtons}>
        <Button
          title="All"
          onPress={() => setSelectedCategory("")}
          color={selectedCategory === "" ? "#5bc0de" : "gray"}
        />
        <Button
          title="Electronics"
          onPress={() => setSelectedCategory("Electronics")}
          color={selectedCategory === "Electronics" ? "#5bc0de" : "gray"}
        />
        <Button
          title="Clothing"
          onPress={() => setSelectedCategory("Clothing")}
          color={selectedCategory === "Clothing" ? "#5bc0de" : "gray"}
        />
        <Button
          title="Books"
          onPress={() => setSelectedCategory("Books")}
          color={selectedCategory === "Books" ? "#5bc0de" : "gray"}
        />
      </View>

      {showCart && (
        <View>
          <Text style={styles.cartHeading}>Shopping Cart</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text>{item.name}</Text>
                <Text>
                  ${item.price} x {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.totalPrice}>Total Price: ${getTotalPrice()}</Text>
          <Button title="Checkout" onPress={handleCheckout} color="#5bc0de" />
        </View>
      )}

      <Text style={styles.productsHeading}>Available Products</Text>
      <FlatList
        data={filterProducts()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <TextInput
              style={styles.quantityInput}
              placeholder="Qty"
              keyboardType="numeric"
              onChangeText={(text) => {
                const quantity = parseInt(text) || 0;
                addToCart(item, quantity);
              }}
            />
            <Button
              title="Add to Cart"
              onPress={() => addToCart(item, 1)}
              color="#5bc0de"
            />
            <TouchableOpacity onPress={() => openProductDetails(item)}>
              <Text style={styles.detailsLink}>Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={selectedProduct !== null} animationType="slide">
        <View style={styles.productDetailsContainer}>
          {selectedProduct && (
            <View>
              <Text style={styles.productDetailsHeading}>Product Details</Text>
              <Text>Name: {selectedProduct.name}</Text>
              <Text>Price: ${selectedProduct.price}</Text>
              <Text>Description: {selectedProduct.description}</Text>
              <Button
                title="Close"
                onPress={closeProductDetails}
                color="#5bc0de"
              />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  userText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#5bc0de",
  },
  productsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  cartHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  productItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  removeButton: {
    color: "#d9534f",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },
  detailsLink: {
    color: "#5bc0de",
    textDecorationLine: "underline",
  },
  productDetailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailsHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  quantityInput: {
    width: 40,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f5f5f5",
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  categoryButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#5bc0de",
  },
});

export default SignUpScreen;
