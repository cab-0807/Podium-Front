// CommunityHeader.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, Dimensions, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext'; 
import { useNavigation } from '@react-navigation/native';
import CommunityHomeScreen from '../screens/Community/CommunityHomeScreen';
import ContentScreen from '../screens/Community/ContentScreen';
import EventScreen from '../screens/Community/EventScreen';

const { width } = Dimensions.get('window');
const CommunityHeader = ({ runFunction }) => {
    const navigation = useNavigation();
    const userImage = require('../../assets/images/logo-toftal.png');
    const [activeScreen, setActiveScreen] = useState('CommunityHomeScreen'); // Initialize active screen state

    const navigateToScreen = (screenName) => {
        navigation.navigate(screenName);
        setActiveScreen(screenName); 
    };

  const isClicked = () => {
    runFunction();
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={isClicked}>
          <Image source={userImage} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.centeredText}>Community Header</Text>
        <TouchableOpacity onPress={() => alert('Send icon clicked')}>
          <Ionicons name="send-outline" size={24} color="black" style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.tabContainer, activeScreen === 'CommunityHomeScreen' && styles.CommunityActive]}
          onPress={() => navigateToScreen('CommunityHomeScreen')}
        >
          <Ionicons name="chatbubbles-outline" size={20} color="rgba(7, 89, 227,1)" style={styles.tabIcon} />
          <Text style={styles.tabText}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabContainer, activeScreen === 'ContentScreen' && styles.ContentActive]}
          onPress={() => navigateToScreen('ContentScreen')}
        >
          <Ionicons name="play-circle-outline" size={20} color="rgba(227, 11, 11,1)" style={styles.tabIcon} />
          <Text style={styles.tabText}>Content</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabContainer, activeScreen === 'EventScreen' && styles.EventActive]}
          onPress={() => navigateToScreen('EventScreen')}
        >
          <Ionicons name="calendar-outline" size={20} color="rgba(244, 180, 0, 1)" style={styles.tabIcon} />
          <Text style={styles.tabText}>Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 80,
    top: -10,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 25,
    //borderWidth: 1,
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  sendIcon: {
    marginRight: 10,
  },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 5,
        top:-10 
        //paddingBottom: 5,
    },
    tabContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal:10,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    tabIcon: {
        marginRight: 8,
    },
    tabText: {
    fontWeight: 'bold',
    },
    CommunityActive: {
        borderBottomWidth:3,
        borderBottomColor:"rgba(7, 89, 227,1)",
        backgroundColor:"rgba(7, 89, 227,0.1)",
    },
    ContentActive: {
        borderBottomWidth:3,
        borderBottomColor:"rgba(227, 11, 11,1)",
        backgroundColor:"rgba(227, 11, 11, 0.1)",
    },
    EventActive: {
        borderBottomWidth:3,
        borderBottomColor:"rgba(244, 180, 0, 1)",
        backgroundColor:"rgba(244, 180, 0, 0.1)",
    },
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

export default CommunityHeader;
