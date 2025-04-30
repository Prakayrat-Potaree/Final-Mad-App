import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TLN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#850321',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
});
