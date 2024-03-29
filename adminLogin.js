import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import LoginSignUpScreen from './LoginSignUpScreen';

const AdminLoginScreen = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Initialize navigation

  const handleLogin = () => {
    if (adminId === '4231' && password === 'password') {
      // Successful login
      Alert.alert('Login Successful ');
      // Navigate to AdminHomeScreen
      navigation.navigate('AdminHome'); // Navigate to AdminHomeScreen
    } else {
      // Failed login
      Alert.alert('Login Failed', 'Invalid admin ID or password. Please try again.');
    }
  };

  return (
    
    <View style={styles.container}>
       <Image source={require('./assets/logo.jpg')} style={styles.topImage} />
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        placeholder="Admin ID"
        value={adminId}
        onChangeText={setAdminId}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topImage: {
    width: '60%', 
    height: 200, 
    resizeMode: 'contain',
    marginTop: -10
  },
});

export default AdminLoginScreen;
