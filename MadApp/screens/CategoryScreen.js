import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"; // สำหรับปุ่ม back


const allItems = [
  { id: "1", title: "เสื้อพื้นเมืองชาย", category: "Shirt", image: require("../assets/images/shirt_local_men.jpg") },
  { id: "2", title: "เสื้อพื้นเมืองหญิง", category: "Shirt", image: require("../assets/images/shirt_local_women.jpeg") },
  { id: "3", title: "ผ้าพาดไหล่", category: "Other", image: require("../assets/images/fabric_traditional.jpeg") },
  { id: "4", title: "กางเกงพื้นเมือง", category: "Pant", image: require("../assets/images/pants_local_style2.jpeg") },
  { id: "5", title: "กางเกงพื้นเมืองสีน้ำเงิน", category: "Pant", image: require("../assets/images/pants_local_style.jpeg") },
  { id: "6", title: "รองเท้าแตะผู้ชาย", category: "Shoes", image: require("../assets/images/shoes.webp") },
];

const CategoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  const filteredItems = allItems.filter(item => item.category === category);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#850321" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Borrow", { item })}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: "#850321",
    fontWeight: "bold",
    marginLeft: 10,
    
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#850321",
  },
});

export default CategoryScreen;
