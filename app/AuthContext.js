// AuthContext.js
import React, { useEffect,createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Create a Context for the auth state
const AuthContext = createContext();

const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    // saving error
    console.error('Failed to save the auth token', e);
  }
};
const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    return token !== null ? token : null;
  } catch (e) {
    console.error('Failed to retrieve the auth token', e);
    return null;
  }
};

const clearAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('auth_token');
  } catch (e) {
    console.error('Failed to clear the auth token', e);
  }
};

const storeCurrentScreen = async (screen) => {
  try {
    await AsyncStorage.setItem('@current_screen', screen);
  } catch (e) {
    // saving error
    console.error('Failed to save the current screen', e);
  }
};

const getCurrentScreen = async () => {
  try {
    const screen = await AsyncStorage.getItem('@current_screen');
    return screen !== null ? screen : null;
  } catch (e) {
    console.error('Failed to retrieve the current screen', e);
    return null;
  }
};

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // State to store token
  const [currentScreen, setCurrentScreen] = useState(null); // State to store current screen
  const login = (token) => {
    setIsAuthenticated(true);
    storeAuthToken(token)
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearAuthToken(); 
  };


  const checkAuthToken = async () => {
    const token = await getAuthToken();
    if (token) {
      setIsAuthenticated(true);
      console.log('Connected')
    } else {
      setIsAuthenticated(false); 
      console.log('Not Connected')
    }
  };

  const saveCurrentScreen = (screen) => {
    setCurrentScreen(screen);
    storeCurrentScreen(screen);
  };

  const loadCurrentScreen = async () => {
    const screen = await getCurrentScreen();
    setCurrentScreen(screen);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, currentScreen,login, logout,checkAuthToken,saveCurrentScreen,loadCurrentScreen  }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
