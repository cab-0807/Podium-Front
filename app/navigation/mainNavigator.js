// MainNavigator.js
import React from 'react';
import { View, Image, Text,TouchableOpacity,TouchableHighlight,StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Assuming you use Expo for vector icons
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Footer from '../components/Footer'; 
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import CommunityScreen from '../screens/Community/CommunityScreen'
import AddComponent from '../components/AddComponent'
import { useNavigation } from 'expo-router';
import { useAuth } from '../AuthContext'; 

const Stack = createStackNavigator();


const MainNavigator = ({ runFunction }) => {
  const navigation = useNavigation()

const { currentScreen } = useAuth(); 
  const handleAddButtonPress = () => {
    if(currentScreen != "AddComponent")
    navigation.navigate('AddComponent')
  
  };
  const pressed = () => {
    runFunction();
  };

  return (
      <View style={{ flex: 1,}}>
        <Stack.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          cardStyle: {
          },
        })}
      >
            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ runFunction: pressed }}/>
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Notifications" component={NotificationScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="CreateCommunityScreen" component={CreateCommunityScreen} />
            <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
            <Stack.Screen name="AddComponent" component={AddComponent} />
            
        </Stack.Navigator>

        {/* Fixed Button */}
        <TouchableHighlight
          style={styles.addButtonTouchableHighlight}
          underlayColor="whitesmoke"
          onPress={handleAddButtonPress}
        >
          <Ionicons name="add" size={24} color="black" />
        </TouchableHighlight>
        <Footer />
      </View>
  );
};

const styles = StyleSheet.create({

    addButton: {
      backgroundColor: 'whitesmoke',
      padding: 10,
      borderRadius: 5,

      position: 'absolute',
      bottom: 20,
      left: "42%",
      width: 70,
      height: 70,
      borderRadius: 40,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOpacity: 0.4,
      shadowOffset: { width: 3, height: 3 },
      shadowRadius: 10,
      zIndex: 10,
    },
    addButtonTouchableHighlight: {
      borderRadius: 5,
      padding: 10,
      position: 'absolute',
      bottom: 20,
      left: "42%",
      width: 70,
      height: 70,
      borderRadius: 40,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5, // for Android shadow
      shadowColor: '#000', // for iOS shadow
      shadowOpacity: 0.4,
      shadowOffset: { width: 3, height: 3 },
      shadowRadius: 10,
      zIndex: 10,
    },
});

export default MainNavigator;
