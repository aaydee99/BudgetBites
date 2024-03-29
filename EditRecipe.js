import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity, Image, Alert, Text } from 'react-native';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';

const RecipeEditScreen = ({ route, navigation }) => {
  // Initialize Firestore
  const db = getFirestore();

  // State to hold the recipe data
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: []
  });
  // Extract the recipe ID from the navigation parameters
  const recipeId = 'NLN7yT5r7g3JDAA6IPwf'
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
      />
      <TextInput
        style={styles.ingredientsInput}
        value={recipe.ingredients.join('\n')}
        onChangeText={(text) => setRecipe(prev => ({ ...prev, ingredients: text.split('\n') }))}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text>Save Recipe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editIcon} onPress={() => {/* logic to enable edit mode if necessary */}}>
        {/* <Image source={require('./path-to-your-pencil-icon.png')} /> */}
        <Text>Edit</Text>
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
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  ingredientsInput: {
    fontSize: 16,
    height: 250, // Adjust as necessary
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default RecipeEditScreen;
