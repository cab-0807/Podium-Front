// CommunityHomeScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Community Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityHomeScreen;
