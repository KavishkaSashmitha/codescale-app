import React, { useState, useEffect } from 'react';
import { View, StatusBar, Platform } from 'react-native'; // Import Platform from react-native
import AppNavigator from './navigation/AppNavigator';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#333' }}>
      <StatusBar
        barStyle={'dark-content'} // Adjust based on Platform.OS
        backgroundColor="#333" // Background color for Android
        translucent={false} // Make status bar opaque
      />
      <AppNavigator user={user} />
    </View>
  );
};

export default App;
