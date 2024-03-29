import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const AdminHomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.jpg')} style={styles.topImage} />
        <Text style={styles.headerText}>Welcome to the {"\n"}Admin Portal</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => console.log('View Users')}>
          <Text style={styles.tabText}>View Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('EditRecipe')}>
          <Text style={styles.tabText}>Edit Recipe of the week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => console.log('Add Shopping Items')}>
          <Text style={styles.tabText}>Add Shopping Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => console.log('Edit Shopping Items')}>
          <Text style={styles.tabText}>Edit Shopping Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => console.log('Logout')}>
          <Text style={styles.tabText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize:30,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  buttonsContainer: {
    flex: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#ccc',
    marginVertical: 5,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default AdminHomeScreen;



