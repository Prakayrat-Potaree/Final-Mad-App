import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    avatar: null, // เพิ่ม avatar
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // สำหรับโชว์ password

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setEditing(false);
      setShowPassword(false);
      Alert.alert("Success", "Profile updated");
    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access gallery is required!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
  
      if (!result.canceled) { // <- ต้องเช็ค canceled
        const selectedAsset = result.assets[0];
        setUser({ ...user, avatar: selectedAsset.uri });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#6C1D1F" />
        </TouchableOpacity>
      </View>

      {/* Avatar */}
      <TouchableOpacity onPress={editing ? pickImage : null}>
        <Image
          source={
            user.avatar
              ? { uri: user.avatar }
              : require("../assets/images/profile.jpeg")
          }
          style={styles.avatar}
        />
        {editing && (
          <Text style={{ textAlign: "center", color: "#6C1D1F", marginTop: 5 }}>
            Change Profile Picture
          </Text>
        )}
      </TouchableOpacity>

      {/* Form */}
      <View style={styles.form}>
        {/* Username */}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={user.username}
          editable={editing}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          editable={editing}
          onChangeText={(text) => setUser({ ...user, email: text })}
        />

        {/* Phone */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          editable={editing}
          onChangeText={(text) => setUser({ ...user, phone: text })}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={user.password}
          editable={editing}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setUser({ ...user, password: text })}
        />
      </View>

      {/* Edit/Save Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          if (editing) {
            handleSave();
          } else {
            setEditing(true);
            setShowPassword(true);
          }
        }}
      >
        <Text style={styles.editButtonText}>{editing ? "Save" : "Edit"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#6C1D1F",
    fontWeight: "bold",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    color: "#6C1D1F",
    marginBottom: 5,
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 3,
  },
  editButton: {
    backgroundColor: "#850321",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
