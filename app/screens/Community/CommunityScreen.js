// CommunityScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const { width } = Dimensions.get('window');
import CommunityHeader from '../../components/CommunityHeader';
import SlidingMenu from '../../components/SlidingMenu';
import CommunityNavigation from '../../navigation/communityNavigation';

const Stack = createStackNavigator();

const CommunityScreen = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible); // Toggle menu visibility

    // Slide animation for menu
    Animated.timing(slideAnim, {
      toValue: isMenuVisible ? -width : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    setIsMenuVisible(false); // Close menu
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <CommunityHeader runFunction={toggleMenu} />
      <CommunityNavigation />
      <SlidingMenu isVisible={isMenuVisible} onClose={handleClose} slideAnim={slideAnim} />

    </View>
  );
};



export default CommunityScreen;
