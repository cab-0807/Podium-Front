// CommunityNavigation.js
import React from 'react';
import { View, Image, Text,TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CommunityHomeScreen from '../screens/Community/CommunityHomeScreen';
import ContentScreen from '../screens/Community/ContentScreen';
import EventScreen from '../screens/Community/EventScreen';
import ShortsScreen from '../screens/Community/Content/Video/ShortsScreen'
import ContinueWatchingScreen from '../screens/Community/Content/Video/ContinueWatchingScreen'
import PlaylistsScreen from '../screens/Community/Content/Video/PlaylistsScreen'
import VideoReader from '../components/videoReader';

const Stack = createStackNavigator();
const userImage = require('../../assets/images/logo-toftal.png');

const CommunityNavigation = ({ runFunction }) => {


  return (
      <View style={{ flex: 1,}}>
        <Stack.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          cardStyle: {
          },
        })}
        
        >
            <Stack.Screen name="CommunityHomeScreen" component={CommunityHomeScreen}/>
            <Stack.Screen name="ContentScreen" component={ContentScreen} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
            
            <Stack.Screen name="ShortsScreen" component={ShortsScreen} />
            <Stack.Screen name="ContinueWatchingScreen" component={ContinueWatchingScreen} />
            <Stack.Screen name="PlaylistsScreen" component={PlaylistsScreen} />
            <Stack.Screen name="VideoReader" component={VideoReader} />
        </Stack.Navigator>
      </View>
  );
};



export default CommunityNavigation;
