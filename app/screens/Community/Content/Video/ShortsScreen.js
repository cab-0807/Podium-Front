import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';

const ShortsScreen = () => {
    const [shorts, setShorts] = useState([]);

    const shortUrls = [
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        // Add more video URLs as needed
    ];

    useEffect(() => {
        generateShorts();
    }, []);

    const generateShorts = async () => {
        const thumbs = await Promise.all(
            shortUrls.map(async (shortUrl) => {
                try {
                    const thumb = await getThumbnail(shortUrl);
                    return { shortUrl, thumbnail: thumb };
                } catch (error) {
                    console.warn(`Failed to generate thumbnail for ${shortUrl}`, error);
                    return { shortUrl, thumbnail: null };
                }
            })
        );
        setShorts(thumbs);
    };

    const getThumbnail = async (videoUri) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri);
            return uri;
        } catch (error) {
            console.warn(`Error fetching thumbnail for ${videoUri}`, error);
            return null;
        }
    };

    const handleVideoPress = (videoUrl) => {
        console.log('Video pressed:', videoUrl);
        // Handle navigation or other actions when a video is pressed
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleVideoPress(item.shortUrl)} style={styles.videoContainer}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.videoThumbnail}
                resizeMode="cover"
            />
            <Ionicons name="play" size={18} color='white' style={styles.playIcon} />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={shorts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    videoContainer: {
        width: 100,
        height: 160,
        margin: 10, 
        borderRadius: 10,
    },
    videoThumbnail: {
        width: 100,
        height: 160, 
        borderRadius: 10,
    },
    playIcon: {
        position: 'absolute',
        top: 5,
        right: 0,
        borderRadius: 20,
        padding: 5,
    },
});

export default ShortsScreen;
