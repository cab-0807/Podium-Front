import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EditProfileModal from './EditProfileModal';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useAuth } from '../AuthContext';

const ProfileScreen = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuth();
  const navigation = useNavigation(); // Hook to access navigation object

  // Profile and memberships data
  const profile = {
    userImage: require('../../assets/images/toftal.png'),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isOnline: true,
    joinedDate: "June 2020",
    contributorsCount: 10,
    followersCount: 100,
    followingCount: 50,
  };

  const memberships = [
    { name: "Gold Member", since: "Jan 2023" },
    { name: "Silver Member", since: "Mar 2023" },
  ];

  // Toggle edit modal visibility
  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  // Save profile changes (mock implementation)
  const saveProfileChanges = (editedProfile) => {
    console.log("Saving profile changes:", editedProfile);
    toggleEditModal();
  };

  // Toggle dropdown menu visibility
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle logout action
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => {
        logout();
        navigation.navigate('Home'); // Navigate to 'Home' screen after logout
      } }
    ]);
  };

  // Close dropdown menu if clicked outside
  const handleOutsidePress = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        {/* Dropdown Menu Icon */}
        <TouchableOpacity style={styles.menuButton} onPress={handleToggleMenu}>
          <Icon name="ellipsis-horizontal-outline" size={24} color="#666" />
        </TouchableOpacity>

        {/* Menu items */}
        {showMenu && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={toggleEditModal} style={styles.menuItem}>
              <Icon name="settings-outline" size={20} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem1}>
              <Icon name="help-circle-outline" size={20} style={styles.menuIcon1} />
              <Text style={styles.menuItemText1}>Help Center</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem1}>
              <Icon name="log-out-outline" size={20} style={styles.menuIcon1} />
              <Text style={styles.menuItemText1}>Log out</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Profile Photo */}
        <Image source={profile.userImage} style={styles.profileImage} />

        {/* Firstname and Lastname */}
        <Text style={styles.name}>{profile.firstName} {profile.lastName}</Text>

        {/* Username */}
        <Text style={styles.username}>@{profile.username}</Text>

        {/* Bio */}
        <Text style={styles.bio}>{profile.bio}</Text>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton} onPress={toggleEditModal}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Online Status and Joined Date */}
        <View style={styles.container2}>
          {/* Online Status */}
          <View style={styles.statusContainer}>
            <View style={[styles.statusIndicator, { backgroundColor: profile.isOnline ? '#4CAF50' : '#ccc' }]} />
            <Text style={styles.statusText}>{profile.isOnline ? 'Online now' : 'Offline'}</Text>
          </View>
          {/* Joined Date */}
          <Text style={styles.joinedDate}>Joined in {profile.joinedDate}</Text>

          {/* Contributor, Followers, Following Counts */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>{profile.contributorsCount}</Text>
              <Text style={styles.statLabel}>Contributors</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>{profile.followersCount}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statCount}>{profile.followingCount}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Memberships */}
          <View style={styles.membershipsContainer}>
            <Text style={styles.membershipsTitle}>Memberships</Text>
            {memberships.map((membership, index) => (
              <View key={index} style={styles.membershipItem}>
                <Text style={styles.membershipName}>{membership.name}</Text>
                <Text style={styles.membershipSince}>Since {membership.since}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isVisible={isEditModalVisible}
          profileData={profile}
          onSave={saveProfileChanges}
          onClose={toggleEditModal}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
  },
  joinedDate: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  editButton: {
    width: '90%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  editButtonText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
  container2: {
    width: '90%',
    alignItems: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  membershipsContainer: {
    marginTop: 50,
  },
  membershipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  membershipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  membershipName: {
    fontSize: 14,
    marginRight: 10,
  },
  membershipSince: {
    fontSize: 12,
    color: '#999',
  },
  menuButton: {
    position: 'absolute',
    top: -10,
    right: 10,
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    elevation: 5,
    zIndex: 1,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    paddingRight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  menuItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,

    paddingRight: 50,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight:'bold'
  },
  menuItemText1: {
    fontSize: 16,
    marginLeft: 10,
    color:"#ccc"
  },
  menuIcon: {
    marginRight: 0,
    color:'black',
    fontWeight:'bold'
  },

  menuIcon1: {
    marginRight: 0,
    color:'#ccc',
    fontWeight:'bold'
  },
});

export default ProfileScreen;
