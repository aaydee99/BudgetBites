import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { FIRESTORE_DB as db } from './db/firebase'; // Make sure this path points to your Firebase configuration
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const ShoppingHistoryItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{`${item.date} - ${item.amount} spent in ${item.store}`}</Text>
  </View>
);

const ShoppingScreen = () => {
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [store, setStore] = useState('');
  
  // User's unique ID, which would be dynamic in a real application
  const userId = 'John@gmail.com'; // Replace with the actual user ID or retrieve from authentication state

  useEffect(() => {
    const fetchShoppingHistory = async () => {
      const userRef = doc(db, "users", userId);
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().shopping) {
          setShoppingHistory(userSnap.data().shopping);
        } else {
          setShoppingHistory([]); // User document or shopping array doesn't exist
        }
      } catch (error) {
        console.error("Error fetching shopping history:", error);
        Alert.alert('Error', 'Unable to fetch shopping history.');
      }
    };

    fetchShoppingHistory();
  }, [userId]);

  const renderShoppingItem = ({ item }) => <ShoppingHistoryItem item={item} />;

  const handleAddShopping = () => {
    setModalVisible(true);
  };

  const handleSaveShopping = async () => {
    if (date && amount && store) {
      const newShoppingItem = { date, amount, store };
      try {
        // Update Firestore with the new shopping item
        const userRef = doc(db, "users", userId);
        // Fetch the current document to update the shopping array
        const userSnap = await getDoc(userRef);
        const existingShopping = userSnap.exists() && userSnap.data().shopping ? userSnap.data().shopping : [];

        // Use updateDoc to update the shopping array in Firestore
        await updateDoc(userRef, {
          shopping: [...existingShopping, newShoppingItem]
        });

        // Update local state
        setShoppingHistory(prev => [...prev, newShoppingItem]);
        Alert.alert('Success', 'New shopping item added.');
      } catch (error) {
        console.error("Error saving shopping item:", error);
        Alert.alert('Error', 'Unable to save shopping item.');
      }
      setModalVisible(false);
      // Reset input fields
      setDate('');
      setAmount('');
      setStore('');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your recent shopping history</Text>
      <FlatList
        data={shoppingHistory}
        renderItem={renderShoppingItem}
        keyExtractor={(item, index) => `shopping-${index}`}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddShopping}>
        <Text style={styles.buttonText}>Add new shopping</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        {/* Footer icons would go here */}
      </View>

      {/* Modal for adding new shopping */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Shopping</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter date"
                value={date}
                onChangeText={text => setDate(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount Spent:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount spent"
                value={amount}
                onChangeText={text => setAmount(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Store:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter store"
                value={store}
                onChangeText={text => setStore(text)}
              />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveShopping}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center', // Center title text
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 18,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center', // Position button in the center
    marginTop: 20, // Add some margin at the top
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    // Style for the footer icons
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
  },
});

export default ShoppingScreen;
