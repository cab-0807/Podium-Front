import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo package
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const menuWidth = 0.8 * width;

const SlidingMenu = ({ isVisible, onClose }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-menuWidth)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (isVisible) {
      openMenu();
      setMenuVisible(true);
    } else {
      closeMenu();
    }
  }, [isVisible]);

  const openMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -menuWidth,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const handleOverlayPress = () => {
    closeMenu();
    onClose(); // Call onClose when the overlay is clicked
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return gestureState.dx < 0;
      },
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          slideAnim.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        const { dx } = gestureState;
        const closeThreshold = 0.99 * menuWidth;

        if (dx < closeThreshold) {
          closeMenu();
        } else {
          openMenu();
        }
      },
    })
  ).current;

  return (
    <React.Fragment>
      {menuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Communities</Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Ionicons name="search-outline" size={24} color="gray" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.menu}>
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={onClose}>
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name="search-outline" size={24} color="white" />
                  </View>
                  <Text style={styles.menuText}>Discover communities</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.menuItem, styles.createCommunityItem]} 
                onPress={() => {
                  onClose();
                  navigation.navigate('CreateCommunityScreen');
                }}
              >
                <View style={styles.menuItemContent}>
                  <View style={styles.menuIconContainer}>
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                  </View>
                  <Text style={styles.menuText}>Launch your podium</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: menuWidth,
    backgroundColor: 'white',
    zIndex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    borderColor: 'transparent',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
  },
  menu: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  createCommunityItem: {
    marginTop: 'auto',
    borderTopWidth:1,
    borderColor:'#ccc',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
});

export default SlidingMenu;
