import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Text, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Assume AuthContext is created and provides the authentication status
import { useAuth } from '../AuthContext';
import LoginModal from '../screens/LoginModal';

const Footer = () => {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const userImage = require('../../assets/images/logo-toftal.png');
  const [activeScreen, setActiveScreen] = useState('Home'); // Initialize active screen state
  const [modalVisible, setModalVisible] = useState(false);

  const navigateToScreen = (screenName) => {
    if (isAuthenticated) {
      navigation.navigate(screenName);
      setActiveScreen(screenName); // Update active screen state
    } else {
      setModalVisible(true); // Show the modal if the user is not authenticated
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'Home' && styles.activeIcon]}
        onPress={() => navigateToScreen('Home')}
      >
        <Ionicons name="home" size={24} color={activeScreen === 'Home' ? 'white' : 'grey'} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'Chat' && styles.activeIcon]}
        onPress={() => navigateToScreen('Chat')}
      >
        <Ionicons name="chatbubble" size={24} color={activeScreen === 'Chat' ? 'white' : 'grey'} />
      </TouchableOpacity>

      {/* Add a spacer View for space */}
      <View style={{ width: 30 }} />

      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'Notifications' && styles.activeIcon]}
        onPress={() => navigateToScreen('Notifications')}
      >
        <Ionicons name="notifications" size={24} color={activeScreen === 'Notifications' ? 'white' : 'grey'} />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.iconContainer, activeScreen === 'Profile' && styles.activeIcon]}
        onPress={() => navigateToScreen('Profile')}
      >
        <Image
          source={userImage}
          style={{ width: 30, height: 30, borderRadius: 15 }}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <LoginModal closeModal={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 15,
    paddingBottom: 35,
    marginBottom: -27.5,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15
  },
  iconContainer: {
    alignItems: 'center',
  },
  activeIcon: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default Footer;
