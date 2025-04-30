import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // สำหรับปุ่ม back
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BorrowScreen({ route, navigation }) {
  const { item } = route.params;

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleBorrow = async () => {
    if (!selectedSize) {
      Alert.alert("Error", "กรุณาเลือกขนาดก่อนยืม!");
      return;
    }

    const borrowedItem = {
      id: item.id,
      name: item.title,
      size: selectedSize,
      quantity: quantity,
      date: new Date().toLocaleDateString(),
      image: item.image,
    };

    try {
      // เก็บข้อมูลการยืมใน AsyncStorage
      const existingBorrowedItems = await AsyncStorage.getItem("borrowedItems");
      const borrowedItems = existingBorrowedItems ? JSON.parse(existingBorrowedItems) : [];
      
      borrowedItems.push(borrowedItem);

      // บันทึกข้อมูลใหม่กลับไปยัง AsyncStorage
      await AsyncStorage.setItem("borrowedItems", JSON.stringify(borrowedItems));

      Alert.alert("Success", `คุณได้ยืม ${item.title} ไซส์ ${selectedSize} จำนวน ${quantity} ชิ้นแล้ว!`);
      navigation.goBack(); // กลับไปหน้าก่อนหน้า
    } catch (e) {
      console.error("Error saving borrowed item: ", e);
      Alert.alert("Error", "ไม่สามารถบันทึกข้อมูลการยืมได้");
    }
  };

  const sizes = ["S", "M", "X", "XL"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#850321" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Borrow</Text>
      </View>

      {/* รูปภาพ */}
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      {/* ชื่อไอเท็ม */}
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.divider} />

      {/* เลือกขนาด */}
      <View style={styles.section}>
        <Text style={styles.label}>ขนาด</Text>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={styles.checkboxContainer}
            onPress={() => setSelectedSize(size)}
          >
            <View style={styles.checkbox}>
              {selectedSize === size && <View style={styles.checked} />}
            </View>
            <Text style={styles.sizeText}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {/* เลือกจำนวน */}
      <View style={styles.section}>
        <Text style={styles.label}>จำนวน</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}
          >
            <Text style={styles.quantitySymbol}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityNumber}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity((prev) => prev + 1)}
          >
            <Text style={styles.quantitySymbol}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ปุ่ม Borrow */}
      <TouchableOpacity style={styles.borrowButton} onPress={handleBorrow}>
        <Text style={styles.borrowButtonText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    color: "#850321",
    fontWeight: "bold",
    marginLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#850321",
    textAlign: "center",
    marginVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#850321",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "#850321",
  },
  sizeText: {
    fontSize: 18,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#850321",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  quantitySymbol: {
    fontSize: 24,
    color: "#850321",
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  borrowButton: {
    backgroundColor: "#850321",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  borrowButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
