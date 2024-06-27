
// MainNavigator.js
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();
const userImage = require('../../assets/images/logo-toftal.png');

const MainNavigator = ({ runFunction }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const pressed = () => {
    runFunction();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header runFunction={pressed} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'About') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              return (
                <Image
                  source={userImage}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              );
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
            position: 'absolute',
            bottom: -30,
            paddingTop: 20,
            paddingBottom: 20,
            left: 0,
            right: 0,
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={ChatScreen} />
        <Tab.Screen name="Settings" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default MainNavigator;
