import React, { useState } from 'react';
import { AppRegistry, View, Animated, Dimensions } from 'react-native';
import MainNavigator from './navigation/mainNavigator';
import SlidingMenu from './components/SlidingMenu';

import { AuthProvider } from './AuthContext';
const { width } = Dimensions.get('window');

const App = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  const toggleMenu = () => {
    setIsMenuVisible(false)

    if (isMenuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setIsMenuVisible(true));
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setIsMenuVisible(true));
    }
  };

  const handleClose = () => {
    setIsMenuVisible(false)
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <MainNavigator runFunction={toggleMenu} />
        <SlidingMenu isVisible={isMenuVisible} onClose={handleClose} slideAnim={slideAnim} />
      </View>
    </AuthProvider>
  );
};

AppRegistry.registerComponent('MyApp', () => App);

export default App;

/*import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MainNavigator from './navigation/mainNavigator'
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/drawerNavigation";
export default function App() {
  return (
      <MainNavigator />
  );
}

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to Podium</Text>
        <Text style={styles.subtitle}>Create your first Community</Text>
        <TouchableOpacity
          style={[styles.button, isClicked && styles.buttonClicked]}
          onPressIn={() => setIsClicked(true)}
          onPressOut={() => setIsClicked(false)}
        >
          <Ionicons name="book" size={24} color={isClicked ? "white" : "black"} />
          <Text style={[styles.buttonText, isClicked && styles.buttonTextClicked]}>What is Podium?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/toftal.png')} // Adjust the path to your logo
          style={styles.logo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    position:"absolute"
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 26,
    color: "#ef2969",
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 90,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'flex-start',
    marginTop: 30,
    position:"relative",
    left:5
  },
  buttonClicked: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonTextClicked: {
    color: 'white',
  },
  logoContainer: {
    position:"absolute",
    bottom:-40,
    alignItems: 'center',
    marginBottom: 20, 
  },

  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});*/

