// NavBar.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      <Text style={styles.navText}>Your App Name</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
