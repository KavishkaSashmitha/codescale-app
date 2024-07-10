import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Voice from '@react-native-voice/voice';
import * as Speech from 'expo-speech';

const HomeScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://thronesapi.com/api/v2/Characters')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setFilteredCharacters(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    filterCharacters(searchText);
  }, [searchText, characters]);

  const filterCharacters = (text) => {
    const filteredData = characters.filter((character) =>
      character.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCharacters(filteredData);
  };

  const handleVoiceInput = async () => {
    try {
      await Voice.start('en-US'); // Start voice recognition
      Voice.onSpeechResults = (event) => {
        const spokenText = event.value[0]; // Get the recognized text
        setSearchText(spokenText);
      };
    } catch (error) {
      console.error('Error with voice recognition:', error);
    }
  };

  const navigateToProfile = () => {
    console.log('Profile clicked');
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={navigateToProfile}
      >
        <Ionicons name="settings-outline" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search characters"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.micButton} onPress={handleVoiceInput}>
          <Ionicons name="mic-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image style={styles.image} source={{ uri: item.imageUrl }} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    color: '#ddd',
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 70, // Adjusted to space out from mic button
    backgroundColor: 'transparent',
    padding: 10,
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  micButton: {
    padding: 10,
    marginLeft: 10, // Adjusted to space out from search input
  },
});

export default HomeScreen;
