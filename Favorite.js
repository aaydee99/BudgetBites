import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { collection, getDocs, query } from 'firebase/firestore';
import {FIRESTORE_DB as db} from './db/firebase'
const Favorite = () => {
   // State to hold the favorite recipes
   const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();
   useEffect(() => {
     // Fetch the favorite recipes from Firestore when the screen loads
     const fetchFavorites = async () => {
       try {
         // Assuming the user's ID is known and favorites are stored in a subcollection of the user's document
         const q = query(collection(db, `users/John@gmail.com/favorites`));
         const querySnapshot = await getDocs(q);
         const favoriteRecipes = querySnapshot.docs.map(doc => doc.data());
 
         setFavorites(favoriteRecipes);
       } catch (error) {
         console.error("Error fetching favorites:", error);
         Alert.alert('Error', 'There was an issue fetching the favorites.');
       }
     };
 
     fetchFavorites();
   }, []);
 
   return (
     <ScrollView style={styles.container}>
       <Text style={styles.heading}>My Favorites</Text>
       {favorites.map((favorite, index) => (
         <View key={index} style={styles.favoriteItem}>
           <Text style={styles.favoriteText} onPress={()=>navigation.navigate('RecipeOfTheWeek')}>{favorite.title}</Text>
           {/* You can add more details or an onPress to navigate to the recipe's detail view */}
         </View>
       ))}
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
    lineHeight:35,
  },
  button: {
    backgroundColor: '#ccc', // Grey color
    borderRadius: 20, // Rounded shape
    paddingVertical: 15,
    paddingHorizontal:15,
    marginTop: 35,
  },
  buttonText: {
    fontSize: 16,
    color: 'black', // White text color
    textAlign: 'center',
    fontWeight: 'bold'
  },
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
  favoriteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Light grey border color for items
  },
  favoriteText: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Favorite;
