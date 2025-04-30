import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    if (username && password && email && phone) {
      const user = { username, password, email, phone };
      try {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        Alert.alert("Success", "Registration successful", [
          { text: "OK", onPress: () => navigation.replace("Login") },
        ]);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCurve} />
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>

        {/* Username */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#6C1D1F"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#6C1D1F"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Phone Number */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#6C1D1F"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6C1D1F"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginContainer}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#850321", // สีแดงเข้มพื้นหลัง
    },
    topCurve: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 250,
      backgroundColor: "#fff",
      borderBottomRightRadius: 250, // โค้งขวาล่าง
    },
    content: {
      flex: 1,
      marginTop: 120,
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 50,
      fontWeight: "bold",
      color: "#850321",
      marginBottom: 100,
    },
    inputContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.52)",
      borderRadius: 30,
      borderColor: "#fff",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      height: 55,
    },
    input: {
      flex: 1,
      color: "#6C1D1F",
      fontSize: 16,
    },
    registerButton: {
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 15,
      alignItems: "center",
      marginVertical: 20,
    },
    registerButtonText: {
      color: "#850321",
      fontSize: 20,
      fontWeight: "bold",
    },
    loginContainer: {
      alignItems: "center",
    },
    loginText: {
      color: "#fff",
      fontSize: 14,
    },
  });