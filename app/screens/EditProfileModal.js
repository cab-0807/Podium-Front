import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import EditingProfile from './settingsTab/EditingProfile';



const EditProfileModal = ({ isVisible, profileData, onSave, onClose }) => {
  const [editedProfile, setEditedProfile] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    username: profileData.username,
    bio: profileData.bio,
    userImage: profileData.userImage,
  });
  const [activeTab, setActiveTab] = useState('Profile');


  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
            <View>
                <EditingProfile profileData={profileData} onSave={onSave}/>
            </View>
        );
      case 'Account':
        return (
          <View>
            <Text>Edit Account Content</Text>
          </View>
        );
      case 'Password':
        return (
          <View>
            <Text>Edit Password Content</Text>
          </View>
        );
      case 'Notifications':
        return (
          <View>
            <Text>Edit Notifications Content</Text>
          </View>
        );
      case 'Chat':
        return (
          <View>
            <Text>Edit Chat Content</Text>
          </View>
        );
      case 'Communities':
        return (
          <View>
            <Text>Edit Communities Content</Text>
          </View>
        );
      case 'Payment Method':
        return (
          <View>
            <Text>Edit Payment Method Content</Text>
          </View>
        );
      case 'Payment History':
        return (
          <View>
            <Text>Edit Payment History Content</Text>
          </View>
        );
      case 'Theme':
        return (
          <View>
            <Text>Edit Theme Content</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.closeContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close-outline" size={26} color="black" />
            </TouchableOpacity>
            <Text style= {{fontSize:16, fontWeight:'bold'}}>Settings</Text>
        </View>
        <View style={styles.modalContent}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
            >
            {['Profile', 'Account', 'Password', 'Notifications', 'Chat', 'Communities', 'Payment Method', 'Payment History', 'Theme'].map((tab, index) => (
                <TouchableOpacity
                key={index}
                style={[styles.tabItem, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
                >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                </TouchableOpacity>
            ))}
            </ScrollView>
            <View style={styles.tabContent}>
            {renderTabContent()}
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },
  closeContainer:{
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    padding: 10,
    zIndex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width:'100%'
  },
  tabContainer: {
    paddingTop:50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height:100,
  },
  tabItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ef2969', // Change color as needed
  },
  activeTabText: {
    color: '#ef2969', // Change color as needed
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center'
  },
  tabContent: {
    position: 'absolute',
    top: 130,
    width:'100%',
  },
});

export default EditProfileModal;
