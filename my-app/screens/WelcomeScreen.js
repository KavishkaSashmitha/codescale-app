import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const colors = {
  primary: '#007bff', // Primary color (blue)
  text: '#fff', // Text color (white) for dark mode
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Dark background color
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: colors.text, // Text color from variables
  },
  button: {
    backgroundColor: '#FFD482',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
  },
});

export default WelcomeScreen;
