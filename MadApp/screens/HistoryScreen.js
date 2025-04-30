import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen({ navigation, route }) {
  const [showReturned, setShowReturned] = useState(false);
  const [borrowed, setBorrowed] = useState([]);  // เริ่มต้นด้วยข้อมูลว่าง
  const [returned, setReturned] = useState([]);

  // ดึงข้อมูลจาก AsyncStorage เมื่อหน้าจอโหลด
  useEffect(() => {
    const loadItems = async () => {
      try {
        const borrowedItems = await AsyncStorage.getItem("borrowedItems");
        const returnedItems = await AsyncStorage.getItem("returnedItems");

        if (borrowedItems) setBorrowed(JSON.parse(borrowedItems));
        if (returnedItems) setReturned(JSON.parse(returnedItems));
      } catch (e) {
        console.error("Error loading items from AsyncStorage:", e);
      }
    };

    loadItems();
  }, []);

  // เช็คข้อมูล borrowedItem ที่มาจากหน้า Borrow
  useEffect(() => {
    if (route.params?.borrowedItem) {
      const borrowedItem = route.params.borrowedItem;
      setBorrowed((prev) => [...prev, borrowedItem]); // เพิ่ม borrowedItem เข้าไปใน borrowed

      // บันทึกข้อมูลใหม่ใน AsyncStorage
      AsyncStorage.setItem(
        "borrowedItems",
        JSON.stringify([...borrowed, borrowedItem])
      );
    }
  }, [route.params?.borrowedItem]);

  // ฟังก์ชันสำหรับการคืนของ
  const handleReturn = async (item) => {
    try {
      const returnedItem = { ...item, returnedDate: new Date().toLocaleDateString() };

      // อัปเดตรายการที่คืนแล้วใน state
      setReturned((prevReturned) => [...prevReturned, returnedItem]);
      setBorrowed((prevBorrowed) => prevBorrowed.filter((borrowedItem) => borrowedItem.id !== item.id));

      // อัปเดตข้อมูลใน AsyncStorage
      await AsyncStorage.setItem(
        "borrowedItems",
        JSON.stringify(borrowed.filter((borrowedItem) => borrowedItem.id !== item.id))
      );
      await AsyncStorage.setItem(
        "returnedItems",
        JSON.stringify([...returned, returnedItem])
      );

      Alert.alert("Success", "คุณได้คืนของแล้ว!");
    } catch (e) {
      console.error("Error returning item:", e);
      Alert.alert("Error", "ไม่สามารถคืนของได้");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>History</Text>

      <View style={styles.toggle}>
        <TouchableOpacity
          style={[styles.toggleButton, !showReturned && styles.activeButton]}
          onPress={() => setShowReturned(false)}
        >
          <Text style={[styles.toggleButtonText, !showReturned && styles.activeButtonText]}>
            Currently Borrowed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, showReturned && styles.activeButton]}
          onPress={() => setShowReturned(true)}
        >
          <Text style={[styles.toggleButtonText, showReturned && styles.activeButtonText]}>
            Returned Items
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={showReturned ? returned : borrowed}
        keyExtractor={(item, index) => index.toString()}  // ใช้ index ในการกำหนด key
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.size}>{item.size}</Text>
              <Text style={styles.date}>ยืมเมื่อ {item.date}</Text>
              {showReturned && item.returnedDate && (
                <Text style={styles.date}>คืนเมื่อ {item.returnedDate}</Text>
              )}
            </View>
            {!showReturned && (
              <TouchableOpacity
                style={styles.returnButton}
                onPress={() => handleReturn(item)}
              >
                <Text style={styles.returnButtonText}>Return</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50, color: "#888" }}>
            No items.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  header: { fontSize: 28, fontWeight: "bold", marginTop: 30, marginBottom: 20, color: "#850321" },
  toggle: { flexDirection: "row", marginBottom: 20 },
  toggleButton: { flex: 1, paddingVertical: 10, borderRadius: 20, alignItems: "center" },
  toggleButtonText: { fontSize: 16, color: "#850321" },
  activeButton: { backgroundColor: "#850321" },
  activeButtonText: { color: "white" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, color: "#850321", fontWeight: "bold" },
  size: { fontSize: 14, color: "#850321" },
  date: { fontSize: 12, color: "#999", marginTop: 4 },
  returnButton: { padding: 5 },
  returnButtonText: { color: "#850321", fontWeight: "bold", fontSize: 16 },
});
