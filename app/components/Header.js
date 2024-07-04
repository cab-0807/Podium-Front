// components/Header.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext'; 
import LoginModal from '../screens/LoginModal'; 

const Header = ({ runFunction }) => {
  const { isAuthenticated } = useAuth(); 
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const isClicked = () =>{
    if(isAuthenticated){
      runFunction();
    }
    else{
      setIsModalVisible(true);
    }
  }

  return (
    <View >
      <View style={styles.header}>
        <TouchableOpacity onPress={isClicked} >
          <Ionicons name="menu" size={34} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        {/* 
        <Image
          source={require('../../assets/images/toftal.png')}
          style={styles.logo}
        />
        */}
      </View>

      <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      >
      <LoginModal closeModal={() => setIsModalVisible(false)} />
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
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
