import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData !== null) {
        const user = JSON.parse(userData);
        if (username === user.username && password === user.password) {
          await AsyncStorage.setItem("isLoggedIn", "true"); // ตั้งค่าเป็นล็อกอินแล้ว
          navigation.replace("Main");
        } else {
          Alert.alert("Login Failed", "Invalid username or password");
        }
      } else {
        Alert.alert("No Account", "Please register first");
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCurve} />
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

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

        {/* Password */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6C1D1F"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureText}
          />
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="#850321"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerContainer}
        >
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={{ fontWeight: "bold" }}>Register</Text>
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
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 30,
  },
  forgotText: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#850321",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerContainer: {
    alignItems: "center",
  },
  registerText: {
    color: "#fff",
    fontSize: 14,
  },
});  
