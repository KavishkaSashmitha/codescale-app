import React, { useState, useEffect } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, analytics } from './firebaseConfig';
import * as Analytics from 'expo-firebase-analytics';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        Analytics.setUserId(user.uid);
        Analytics.logEvent('user_sign_in', {
          email: user.email,
        });
      } else {
        setUser(null);
        Analytics.logEvent('user_sign_out');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#333' }}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#333"
        translucent={false}
      />
      <AppNavigator user={user} />
    </View>
  );
};

export default App;
