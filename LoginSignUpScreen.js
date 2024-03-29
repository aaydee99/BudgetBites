import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { doc, setDoc} from 'firebase/firestore';
// Assume db is initialized in your firebase-config.js
import { FIRESTORE_DB as db } from './db/firebase';

const LoginSignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    const email = 'John@gmail.com'; // This would be dynamically set from user input
    const password = 'password'; // This would also be dynamically set from user input
  
    if (email === 'John@gmail.com' && password === 'password') {
      // Assuming the use of a dummy check for email and password
      // In a real app, replace this with Firebase Authentication
  
      // Add or update the document in Firestore
      const userRef = doc(db, "users", email); // Using email as the document ID for demonstration
      setDoc(userRef, { email: email, password: password }, { merge: true }) // 'merge: true' is optional here since we're only setting email
        .then(() => {
          console.log("User document created/updated in Firestore with email:", email);
          // Perform your navigation or state update after success
          navigation.navigate('HomePageScreen');
        })
        .catch((error) => {
          console.error("Error updating user document:", error);
        });
    } else {
      alert('Invalid email or password');
    }
  };
  

  const handleSignUpPress = () => {
    
    navigation.navigate('SignUpInfo');
  };

  const handleForgotPasswordPress = () => {
    
    alert('Forgot Password pressed!');
  };

  const handleAdminLoginPress = () => {
    
    navigation.navigate('AdminLogin');
  };

  return (
    
    <View style={styles.container}>
      <Image source={require('./assets/logo.jpg')} style={styles.topImage} />

      <Text style={styles.authTitle}>         Bargain Bites {"\n"}Plan meals on a budget {}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.authButton} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.authButton} onPress={handleSignUpPress}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPasswordPress}>
        <Text style={styles.buttonText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminLoginButton} onPress={handleAdminLoginPress}>
        <Text style={styles.buttonText}>Admin Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImage: {
    width: '40%', 
    height: 200, 
    resizeMode: 'contain',
  },

  authTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
    
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    
  },
  authButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPasswordButton: {
    marginTop: 10,
    fontWeight: 'Bold',
  },
  adminLoginButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
    marginTop: 20,
    fontWeight: 'Bold',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default LoginSignUpScreen;