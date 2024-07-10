import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ user }) => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName={user ? 'Home' : 'Welcome'}
        screenOptions={{
          headerShown: false,
          ...darkScreenOptions,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const darkScreenOptions = {
  cardStyle: { backgroundColor: '#1E1E1E' },
  contentStyle: { backgroundColor: '#1E1E1E' },
  headerStyle: { backgroundColor: '#121212' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { color: '#FFFFFF' },
};

export default AppNavigator;
