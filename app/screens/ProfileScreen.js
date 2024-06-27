import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import EditProfileModal from './EditProfileModal'; // Import the EditProfileModal component

const ProfileScreen = () => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const profile = {
    userImage: require('../../assets/images/toftal.png'),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    isOnline: true, // Example: Change as per your application state
    joinedDate: "June 2020", // Example: Change as per your application state
    contributorsCount: 10, // Replace with actual number of contributors
    followersCount: 100, // Replace with actual number of followers
    followingCount: 50, // Replace with actual number of following
  };

  const memberships = [
    { name: "Gold Member", since: "Jan 2023" },
    { name: "Silver Member", since: "Mar 2023" },
  ];

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const saveProfileChanges = (editedProfile) => {
    // Handle saving profile changes here (e.g., update state, send to server)
    console.log("Saving profile changes:", editedProfile);
    // Close the modal after saving changes
    toggleEditModal();
  };

  return (
    <View style={styles.container}>
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
    borderRadius: 75, // half of width and height to make it round
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
});

export default ProfileScreen;
