import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View, PanResponder, Text,Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { useNavigation } from '@react-navigation/native';

const VideoReader = ({ route }) => {
    //console.log(route.params.shortUrls[0])

    const [parentHeight, setParentHeight] = useState(10);
    const { width: deviceWidth } = Dimensions.get('window');
    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setParentHeight(height);
      };
    const videoUrl = route.params.shortUrls[0];
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);

    // Handler to close the modal and navigate back
    const closeModalHandler = () => {
        setModalVisible(false);
        navigation.goBack(); // Navigate back to the previous screen
    };

    // Gesture handling for sliding down to close the modal
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: (e, gestureState) => {
            // Close modal if dragged down by a certain distance (adjust as needed)
            if (gestureState.dy > 50) {
                setModalVisible(false);
                navigation.goBack(); // Navigate back to the previous screen
            }
        },
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModalHandler} // Android back button handling
        >
            <TouchableOpacity
                style={styles.modalContainer}activeOpacity={1}
                {...panResponder.panHandlers} // Apply panResponder to detect gestures
            >
                <View style={styles.contentContainer} onLayout={onLayout}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModalHandler}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.videoContainer}>
                        <VideoPlayer
                            style={{ width: deviceWidth, height: parentHeight-90 }} 
                            videoProps={{
                                shouldPlay: false,
                                resizeMode: 'contain',
                                source: {
                                    uri: videoUrl,
                                },
                            }}
                            inFullscreen={false} // Ensures it's not fullscreen
                            showFullscreenButton={true} // Optionally show fullscreen button
                            playFromPositionMillis={0} // Start playing from the beginning
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height:'94%',
        //overflow: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, // Ensure it's above the content
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        padding: 5,
    },
    videoContainer: {
        top: 50,
        
    },
});

export default VideoReader;
