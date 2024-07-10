import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { analytics, auth } from '../firebaseConfig';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('SignIn');
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={[styles.container, styles.darkBackground]}>
      <Text style={styles.title}>Profile Details</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, styles.darkText]}
          value={auth.currentUser?.displayName || 'Name not set'}
          placeholder="Update your name"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={1}
          editable={false}
        />
      </View>
      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, styles.darkText]}
          value={auth.currentUser?.email}
          placeholder="Update your email"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={1}
          editable={false}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  darkBackground: {
    backgroundColor: '#333', // Dark background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // Text color in dark theme
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#555', // Dark input box background color
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#fff', // Text color in dark theme
    textAlignVertical: 'top',
    height: 25,
  },
  darkText: {
    color: '#fff', // Text color in dark theme
  },
  button: {
    backgroundColor: '#FFD482',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
  },
});

export default ProfileScreen;
