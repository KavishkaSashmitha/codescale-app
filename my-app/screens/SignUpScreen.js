import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Ensure the path is correct
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation();
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    validateForm();
  }, [name, email, password, confirmPassword]);

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else {
      setPasswordRequirements({
        length: password.length >= 8,
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
      if (password.length < 8) {
        errors.password = 'Password must be at least 8 characters.';
      }
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSignUp = async () => {
    if (isFormValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update the user's profile to include the display name
        await updateProfile(user, { displayName: name });

        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
        });

        console.log('User registered and data stored successfully.');
      } catch (error) {
        console.error(error);
        Alert.alert('Sign Up Failed', error.message);
      }
    } else {
      Alert.alert(
        'Form has errors',
        'Please correct the errors before submitting.'
      );
    }
  };

  const renderPasswordRequirement = (text, met) => (
    <View style={styles.requirement}>
      <MaterialIcons
        name={met ? 'check-circle' : 'cancel'}
        size={20}
        color={met ? 'green' : 'red'}
      />
      <Text style={styles.requirementText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {errors.name && <Text style={styles.validationText}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {errors.email && (
        <Text style={styles.validationText}>{errors.email}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.password && (
        <Text style={styles.validationText}>{errors.password}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <Text style={styles.validationText}>{errors.confirmPassword}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <View style={styles.requirementsContainer}>
        {renderPasswordRequirement(
          'At least 8 characters',
          passwordRequirements.length
        )}
        {renderPasswordRequirement(
          'Contains a number',
          passwordRequirements.number
        )}
        {renderPasswordRequirement(
          'Contains a special character',
          passwordRequirements.specialChar
        )}
      </View>
      <TouchableOpacity
        style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]}
        disabled={!isFormValid}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.text}>Have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#2A2A2A',
  },
  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#3D3D3D',
    color: '#C0C0C0',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    backgroundColor: '#FFD482',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  validationText: {
    fontSize: 12,
    color: '#FF5E5B',
    marginTop: 0,
    marginLeft: 4,
  },
  requirementsContainer: {
    marginBottom: 12,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    marginLeft: 8,
    color: '#FFF',
  },
  successText: {
    fontSize: 12,
    color: '#6FCF97',
    marginTop: 4,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: 16,
    color: '#FFD482',
  },
});

export default SignUpScreen;
