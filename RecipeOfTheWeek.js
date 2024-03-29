import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {FIRESTORE_DB as db } from './db/firebase'; // Adjust this path to your Firebase config file
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
const RecipeOfTheWeekScreen = () => {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe from Firestore when the screen loads
    const fetchRecipe = async () => {
      const recipeRef = doc(db, "recipes", "NLN7yT5r7g3JDAA6IPwf"); // Replace 'yourRecipeId' with the actual recipe ID
      try {
        const docSnap = await getDoc(recipeRef);
        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          Alert.alert('Error', 'No recipe found!');
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        Alert.alert('Error', 'There was an issue fetching the recipe.');
      }
    };

    fetchRecipe();
  }, []);

  const addToFavorites = async () => {
    if (recipe) {
      try {
        // Add the recipe to the user's favorites
        const userFavRef = doc(db, `users/John@gmail.com/favorites`, "yourRecipeId"); // Replace 'yourRecipeId' with the actual recipe ID
        await setDoc(userFavRef, recipe);

        Alert.alert('Success', 'The recipe has been added to your favorites!');
      } catch (error) {
        console.error("Error adding document to favorites:", error);
        Alert.alert('Error', 'There was a problem adding the recipe to your favorites.');
      }
    } else {
      Alert.alert('Error', 'No recipe to add to favorites.');
    }
  };

  if (!recipe) {
    return <Text>Loading recipe...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{recipe.title}</Text>
      <Text style={styles.ingredients}>
        <Text style={styles.boldText}>Ingredients and Tips:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index}>
            {"\n"}<Text style={styles.boldText}>{ingredient.split(': ')[0]}:</Text> {ingredient.split(': ')[1]}
          </Text>
        ))}
      </Text>
      <TouchableOpacity style={styles.button} onPress={addToFavorites}>
        <Text style={styles.buttonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 16,
    lineHeight: 25,
  },
  boldText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RecipeOfTheWeekScreen;
