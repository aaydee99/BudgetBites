import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity, Image, Alert, Text } from 'react-native';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { IoPencil } from "react-icons/io5";
import {FIRESTORE_DB as db} from './db/firebase'
const RecipeEditScreen = ({ route, navigation }) => {
  // Initialize Firestore
  
  // State to hold the recipe data
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: []
  });
  const [isEditing, setIsEditing] = useState(false);

  // Extract the recipe ID from the navigation parameters
  const recipeId = 'URbNjvST6CZRSQg3HMY4'
  useEffect(() => {
    // Fetch the recipe from Firestore using the recipeId
    const fetchRecipe = async () => {
      const recipeRef = doc(db, 'recipes', recipeId);
      try {
        const docSnap = await getDoc(recipeRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          Alert.alert('Error', 'No such recipe found!');
          navigation.goBack(); // Go back if no recipe is found
        }
      } catch (error) {
        Alert.alert('Error', 'Error fetching recipe');
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [db, navigation]);

  const handleSave = async () => {
    const recipeRef = doc(db, 'recipes', recipeId);
    try {
      await updateDoc(recipeRef, recipe);
      Alert.alert('Success', 'Recipe updated successfully!');
      navigation.goBack(); // Navigate back after save
    } catch (error) {
      Alert.alert('Error', 'Error updating recipe');
      console.error('Error updating recipe:', error);
    }
  };

  // Render UI
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        value={recipe.title}
        onChangeText={(text) => setRecipe(prev => ({ ...prev, title: text }))}
        editable={isEditing}
      />
      <TextInput
        style={styles.ingredientsInput}
        value={recipe.ingredients.join('\n')}
        onChangeText={(text) => setRecipe(prev => ({ ...prev, ingredients: text.split('\n') }))}
        multiline
        editable={isEditing}
      />

      <TouchableOpacity
        style={styles.editIcon}
        onPress={() => {
          if (isEditing) {
            // Save the recipe
            handleSave();
          }
          setIsEditing(!isEditing);
        }}
      >
        {isEditing ? (
          // This is a placeholder for a save (tick) icon
          <View style={styles.saveIcon}>
            <Text style={styles.saveIconText}>✔</Text>
          </View>
        ) : (
          <Image source={require('./assets/edit-03.png')} />
        )}
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: 10,
  },
  ingredientsInput: {
    fontSize: 16,
    height: 250, // Adjust as necessary
    padding: 10,
    textAlignVertical: 'top',
    flex: 1,

  },
  saveButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveIcon: {
    // Placeholder styles for the save (tick) icon
    width: 30,
    height: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  saveIconText: {
    color: 'white',
    fontSize: 20,
  },
  editIcon: {
   left: "50%"
  },
});

export default RecipeEditScreen;
