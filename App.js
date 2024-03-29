// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageScreen from './HomePageScreen'; 
import LoginSignUpScreen from './LoginSignUpScreen';
import SignUpInfoScreen from './SignUpInfoScreen'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, image } from 'react-native';
import ShoppingScreen from './ShoppingScreen';
import ProfileScreen from './ProfileScreen';
import RecipeOfTheWeek from './RecipeOfTheWeek';
import Favorite from './Favorite';
import AdminHomeScreen from './AdminHome';
import AdminLoginScreen from './adminLogin'
import RecipeEditScreen from './EditRecipe';






const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSignUp">
        <Stack.Screen
          name="LoginSignUp"
          component={LoginSignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUpInfo" component={SignUpInfoScreen} />
        <Stack.Screen name="HomePageScreen" component={HomePageScreen} />
        <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="RecipeOfTheWeek" component={RecipeOfTheWeek} /> 
        <Stack.Screen name="Favorite" component={Favorite} /> 
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} /> 
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} /> 
        <Stack.Screen name="EditRecipe" component={RecipeEditScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    position: 'absolute',
    top: -200,
    left: -150,
    fontSize: 32,
    marginBottom: 5,
  },
  subText: {
    position: 'absolute',
    top: -100,
    left: -150,
    fontSize: 17,
    color: 'black',
  },
  button: {
    width: 4350,
    height: 95,
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
  buttonText: {
    fontSize: 16,
  },
  additionalText: {
    marginTop: 20, // Add margin from the top for separation
    fontSize: 17,
    textAlign: 'center',
  },
  bottomNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
  
  },
});