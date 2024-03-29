import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleBack = () => {
    // This function will be called when the back button is pressed.
    // If you are using `react-navigation`, you can call `navigation.goBack()`
    // or `navigation.navigate('YourHomePage')` to go back to the homepage.
    // For now, it will just log to the console.
    console.log('Back to Homepage');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text>Back to Homepage</Text>
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>J</Text>
        </View>
        <Text style={styles.profileName}>John Smith</Text>
        <Text style={styles.profileUsername}>@John01</Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Settings</Text>
      </View>
      
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Account details</Text>
      </View>
      
      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>My Recipes</Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>My Preferences</Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Privacy policy</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Log out pressed')}>
        <Text style={styles.menuItemText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    color: '#fff',
    fontSize: 24,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileUsername: {
    fontSize: 16,
    color: 'grey',
  },
  menuItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default ProfileScreen;
