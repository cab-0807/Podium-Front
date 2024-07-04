import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const ContinueWatchingScreen = () => {
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
                    const thumb = await getThumbnailTime(shortUrl, { time: 1000 });
                    return { shortUrl, thumbnail: thumb };
                } catch (error) {
                    console.warn(`Failed to generate thumbnail for ${shortUrl}`, error);
                    return { shortUrl, thumbnail: null };
                }
            })
        );
        setShorts(thumbs);
    };

    const getThumbnailTime = async (videoUri, time) => {
        try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, time);
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
        <TouchableOpacity onPress={() => handleVideoPress(item.shortUrl)} style={styles.card}>
            <Image
                source={{ uri: item.thumbnail }}
                style={styles.videoThumbnail}
                resizeMode="cover"
            />
            <View style={styles.overlay}>
                <Ionicons name="play" size={24} color="white" style={styles.playIcon} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.title}>Reussir son saas en 2024</Text>
                    <Text style={styles.description}>10 vidéos . 3h 12 mn</Text>
                    <Progress.Bar style={styles.progress} color={'red'} unfilledColor={'#BDBDBD'} borderWidth={0} progress={0.3} width={330} />
                </View>
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
                <Text style={styles.screenTitle}>Continue Watching</Text>
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
        height: 200,
        borderRadius: 15,
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
        bottom: 25,
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
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'white',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    progress: {
        marginTop: 10,
    },
});

export default ContinueWatchingScreen;
