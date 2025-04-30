import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: "1",
    title: "เสื้อพื้นเมืองชาย",
    image: require("../assets/images/shirt_local_men.jpg"),
  },
  {
    id: "2",
    title: "เสื้อพื้นเมืองหญิง",
    image: require("../assets/images/shirt_local_women.jpeg"),
  },
  {
    id: "3",
    title: "ผ้าพาดไหล่",
    image: require("../assets/images/fabric_traditional.jpeg"),
  },
  {
    id: "4",
    title: "กางเกงพื้นเมือง",
    image: require("../assets/images/pants_local_style2.jpeg"),
  },
  {
    id: "5",
    title: "กางเกงพื้นเมืองสีน้ำเงิน",
    image: require("../assets/images/pants_local_style.jpeg"),
  },
  {
    id: "6",
    title: "รองเท้าแตะผู้ชาย",
    image: require("../assets/images/shoes.webp"),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCategoryPress = (category) => {
    navigation.navigate("Category", { category }); // ส่งหมวดหมู่ที่เลือกไปยังหน้าจอ Category
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.header}>Thai-Lanna Music Club</Text>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Category */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoryContainer}>
        {/* Shirt */}
        <View style={styles.categoryItem}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('Shirt')}
          >
            <Image
              source={require("../assets/images/iconoir_shirt.png")}
              style={styles.categoryIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>Shirt</Text>
        </View>

        {/* Pant */}
        <View style={styles.categoryItem}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('Pant')}
          >
            <Image
              source={require("../assets/images/iconoir_pants.png")}
              style={styles.categoryIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>Pant</Text>
        </View>

        {/* Shoes */}
        <View style={styles.categoryItem}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('Shoes')}
          >
            <Image
              source={require("../assets/images/Sneakers.png")}
              style={styles.categoryIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.categoryText}>Shoes</Text>
        </View>

        {/* Other */}
        <View style={styles.categoryItem}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress('Other')}
          >
            <FontAwesome5 name="ellipsis-h" size={24} color="#7A1629" />
          </TouchableOpacity>
          <Text style={styles.categoryText}>Other</Text>
        </View>
      </View>

      {/* All Clothes */}
      <Text style={styles.sectionTitle}>All Clothes</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Borrow", { item })}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#850321",
    marginTop: 30,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: "#F9F9F9",
  },
  searchButton: {
    backgroundColor: "#850321",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#850321",
    width: 68,
    height: 68,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 6,
  },
  categoryIcon: {
    width: 32,
    height: 32,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    marginBottom: 20,
    width: "48%",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
  categoryItem: {
    alignItems: "center",
    width: 70,
  },
});
