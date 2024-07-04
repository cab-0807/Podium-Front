import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import VideoScreen from './Content/VideoScreen'; // Import your VideoScreen component
import AudioScreen from './Content/AudioScreen'; // Import your AudioScreen component
import DocScreen from './Content/DocScreen'; // Import your DocScreen component

const ContentScreen = () => {
  const [activeButton, setActiveButton] = useState('Videos');
  const [showVideoScreen, setShowVideoScreen] = useState(true);
  const [showAudioScreen, setShowAudioScreen] = useState(false);
  const [showDocScreen, setShowDocScreen] = useState(false);

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName === 'Videos') {
      const { thumbnails, watchlists, playlists } = useVideoUtilities();
      setShowVideoScreen(true);
      setShowAudioScreen(false);
      setShowDocScreen(false);
    } else if (buttonName === 'Audios') {
      setShowVideoScreen(false);
      setShowAudioScreen(true);
      setShowDocScreen(false);
    } else if (buttonName === 'Docs') {
      setShowVideoScreen(false);
      setShowAudioScreen(false);
      setShowDocScreen(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Videos' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress('Videos')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'Videos' ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Videos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Audios' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress('Audios')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'Audios' ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Audios
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            activeButton === 'Docs' ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={() => handleButtonPress('Docs')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'Docs' ? styles.activeButtonText : styles.inactiveButtonText,
            ]}
          >
            Docs
          </Text>
        </TouchableOpacity>
      </View>

      {showVideoScreen && <VideoScreen />}
      {showAudioScreen && <AudioScreen />}
      {showDocScreen && <DocScreen />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  activeButton: {
    backgroundColor: 'rgba(196, 25, 10, 1)',
  },
  inactiveButton: {
    backgroundColor: '#ccc',
  },
  activeButtonText: {
    color: 'white',
  },
  inactiveButtonText: {
    color: 'darkgrey',
  },
});

export default ContentScreen;
