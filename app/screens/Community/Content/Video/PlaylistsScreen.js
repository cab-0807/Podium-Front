import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const PlaylistsScreen = () => {
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
        <TouchableOpacity onPress={() => handleVideoPress(item.videoUrl)} style={styles.card}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.videoThumbnail}
                resizeMode="cover"
            />
            <View style={styles.descriptionContainer}>
                <Text style={styles.title}>Reussir son saas en 2024</Text>
                <Text style={styles.description}>10 videos . 3h 12 mn</Text>
            </View>

            <View style={styles.playIconContainer}>
                <Ionicons name="play" size={24} color="red" style={styles.playIcon} />
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={shorts}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={
                <Text style={styles.screenTitle}>Playlists</Text>
            }
        />
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 15,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#C4190A',
    },
    listContainer: {
        paddingTop: 0,
        padding: 20,
        marginTop: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: '350',
        elevation: 2,
        marginBottom: 10,
    },
    videoThumbnail: {
        width: '350',
        height: 170,
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    playIconContainer: {
        // position: 'absolute',
        // paddingTop: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
    },
    playIcon: {
        position: 'absolute',
        bottom: 5,
        right:10,
        borderRadius: 20,
        padding: 5,
    },
    descriptionContainer: {
        flex: 1,
        padding: 5,
    },
    title: {
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555555',
        paddingBottom: 5,
        paddingLeft: 5,
    },
    progress: {
        marginTop: 10,
    },
});

export default PlaylistsScreen;
