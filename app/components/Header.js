// components/Header.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SlidingMenu from './SlidingMenu'; // Import SlidingMenu component

const { width } = Dimensions.get('window');
const Header = ({ runFunction }) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={runFunction} >
        <Ionicons name="menu" size={34} color="black" style={styles.menuIcon} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/toftal.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: 80,
    top: -10,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default Header;
