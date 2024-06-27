import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Image, Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditingProfile = ({ profileData, onSave, onClose }) => {
  const [firstName, setFirstName] = useState(profileData.firstName);
  const [lastName, setLastName] = useState(profileData.lastName);
  const [bio, setBio] = useState(profileData.bio);
  const [location, setLocation] = useState(profileData.location || ''); // Initialize location state
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
  });
  const userImage = require('../../../assets/images/toftal.png');

  const handleSave = () => {
    onSave({ firstName, lastName, bio, location, socialLinks });
  };

  const handleUploadPhoto = () => {
    // Implement photo upload logic here
    console.log('Upload profile photo');
  };

  const toggleSocialMedia = () => {
    setShowSocialMedia(!showSocialMedia);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.photoContainer}>
            <Image source={userImage} style={styles.userImage} />
            <TouchableOpacity onPress={handleUploadPhoto}>
              <Text style={styles.uploadText}>Change profile photo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={[styles.input, styles.nameInput]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="lightgrey"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={[styles.input, styles.nameInput]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="lightgrey"
              />
            </View>
          </View>
          <View style={styles.changeText}>
            <Text style={styles.note}>
              You can only change your name once.
            </Text>
            <TouchableOpacity onPress={() => console.log('Change name')}>
              <Text style={styles.changeNameLink}>Change name</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor="lightgrey"
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[styles.input, styles.locationInput]}
              value={location}
              onChangeText={setLocation}
              placeholder="Location"
              placeholderTextColor="lightgrey"
            />
          </View>
          <TouchableOpacity style={styles.bottomButtonContainer} onPress={handleSave}>
                <Text style={styles.bottomButtonButtonText}>Update Profile</Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 15,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  changeText: {
    flexDirection: 'row',
  },
  bioInput: {
    height: 80,
  },
  locationInput: {
    height: 40,
  },
  bottomButtonContainer: {
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ef2969',
  },

  bottomButtonButtonText: {
    color: '#ef2969',
    fontSize: 16,
    textAlign: 'center',
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    color: '#ef2969',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameInput: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flex: 1,
    paddingTop: 15,
  },
  note: {
    marginBottom: 10,
    fontStyle: 'italic',
    color: 'gray',
  },
  changeNameLink: {
    color: '#ef2969',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialMediaInputs: {
    marginTop: 10,
  },
});

export default EditingProfile;
