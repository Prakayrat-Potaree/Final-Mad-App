import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // สำหรับ icon back

export default function ReturnScreen({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header: Back Button + Title */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#7B1E25" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Return</Text>
      </View>

      {/* Item Info */}
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1593032465171-8da8be91fb43?auto=format&fit=crop&w=800&q=80' }}
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>เสื้อพื้นเมืองชาย</Text>
          <Text style={styles.itemSize}>XL</Text>
          <Text style={styles.itemDate}>ยืมเมื่อ 12/04/2025</Text>
        </View>
      </View>

      {/* Upload Area */}
      <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.uploadText}>Upload picture</Text>
        )}
      </TouchableOpacity>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.returnButton}>
          <Text style={styles.returnButtonText}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },

  // Header
  headerRow: {
    flexDirection: 'row', // แนวนอน
    alignItems: 'center', // กึ่งกลางแนวตั้ง
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10, // ระยะห่างระหว่างปุ่มกับข้อความ
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1E25',
  },

  // Item Info
  itemContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  itemImage: { width: 60, height: 60, borderRadius: 10, marginRight: 15 },
  itemInfo: { flexDirection: 'column' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#7B1E25' },
  itemSize: { fontSize: 14, color: '#7B1E25', marginTop: 2 },
  itemDate: { fontSize: 12, color: 'gray', marginTop: 2 },

  // Upload
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden', // ป้องกันภาพล้นขอบ
  },
  uploadText: { color: 'gray', fontSize: 16 },
  uploadedImage: { width: '100%', height: '100%' },

  // Buttons
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around' },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7B1E25',
  },
  cancelButtonText: { color: '#7B1E25', fontSize: 16 },

  returnButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#7B1E25',
  },
  returnButtonText: { color: '#fff', fontSize: 16 },
});
