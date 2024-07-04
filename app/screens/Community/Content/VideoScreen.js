import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal,Image, ScrollView, Platform, } from 'react-native';

import * as VideoThumbnails from 'expo-video-thumbnails';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { VideoReader } from '../../../components/videoReader.js'

const VideoScreen = ({  }) => {
    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

    const shortUrls = [
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        // Add more video URLs as needed
    ];
    const videoUrls = [
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        // Add more video URLs as needed
    ];

    const watchUrls = [
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        // Add more video URLs as needed
    ];

    const [thumbnails, setThumbnails] = useState([]);
    const [watchlists, setWatchLists] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        generateThumbnails();
        generatePlaylists();
        generateWatchlists();
    }, []);

    const generateThumbnails = async () => {
        const thumbs = await Promise.all(
            shortUrls.slice(0, 5).map(async (shortUrl) => {
                try {
                    const thumb = await getThumbnail(shortUrl);
                    return { shortUrl, thumbnail: thumb };
                } catch (error) {
                    console.warn(`Failed to generate thumbnail for ${videoUrl}`, error);
                    return { shortUrl, thumbnail: null };
                }
            })
        );
        setThumbnails(thumbs);
    };

    const generatePlaylists = async () => {
        const playlist = await Promise.all(
            videoUrls.slice(0, 5).map(async (videoUrl) => {
                try {
                    const thumb = await getThumbnail(videoUrl);
                    return { videoUrl, thumbnail: thumb };
                } catch (error) {
                    console.warn(`Failed to generate thumbnail for ${videoUrl}`, error);
                    return { videoUrl, thumbnail: null };
                }
            })
        );
        setPlaylists(playlist);
    };

    const generateWatchlists = async () => {
        const wlists = await Promise.all(
            watchUrls.slice(0, 5).map(async (videoUrl) => {
                try {
                    const thumbnail = await getThumbnailTime(videoUrl, { time: 1000 });
                    return { videoUrl, thumbnail };
                } catch (error) {
                    return { videoUrl, thumbnail: null };
                }
            })
        );
        setWatchLists(wlists);
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
        navigation.navigate('VideoReader', { shortUrls });
        // Handle navigation or other actions when a video is pressed
    };

    const navigateToShortsScreen = () => {
        navigation.navigate('ShortsScreen', { shortUrls });
    };

    const navigateToContinueWatchingScreen = () => {
        navigation.navigate('ContinueWatchingScreen', { watchUrls });
    };

    const navigateToPlaylistsScreen = () => {
        navigation.navigate('PlaylistsScreen', { videoUrls });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Shorts</Text>
                    <TouchableOpacity onPress={navigateToShortsScreen} style={{backgroundColor:'transparent'}}>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {thumbnails.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleVideoPress(item.shortUrl)}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.videoThumbnail}
                                resizeMode="cover"
                            />
                            <Ionicons name="play" size={18} color='white' style={styles.playIcon} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Continue to watch</Text>
                    <TouchableOpacity onPress={navigateToContinueWatchingScreen} style={{backgroundColor:'transparent'}}>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playListScroll0}>
                    {watchlists.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleVideoPress(item.videoUrl)} style={styles.card0}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.videoThumbnail2}
                                resizeMode="cover"
                            />
                            <View style={styles.overlay}>
                                <Ionicons name="play" size={20} color="white" style={styles.playIcon0} />
                                <View style={styles.descriptionContainer0}>
                                    <Text style={styles.title0}>Reussir son saas en 2024</Text>
                                    <Text style={styles.description0}>10 vidéos . 3h 12 mn</Text>
                                    <Progress.Bar style={styles.progress} color={'red'} unfilledColor={'#BDBDBD'} borderWidth={0} progress={0.3} width={170} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Playlists</Text>
                    <TouchableOpacity onPress={navigateToPlaylistsScreen} style={{backgroundColor:'transparent'}}>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playListScroll}>
                    {playlists.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleVideoPress(item.videoUrl)} style={styles.card}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.videoThumbnail3}
                                resizeMode="cover"
                            />
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.title}>Reussir son saas en 2024</Text>
                                <Text style={styles.description}>10 videos . 3h 12 mn</Text>
                            </View>
                            <View style={styles.playIconContainer}>
                                <Ionicons name="play" size={24} color="red" style={styles.playIcon1} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.4)',
    },
    videoThumbnail: {
        width: 100,
        height: 160,
        marginRight: 10,
        borderRadius: 10,
    },
    videoThumbnail2: {
        width: 200,
        height: 135,
        marginRight: 10,
        borderRadius: 10,
    },
    videoThumbnail3: {
        width: 350,
        height: 165,
        marginRight: 10,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    playIcon: {
        position: 'absolute',
        top: 5,
        right: 10,
        borderRadius: 20,
        padding: 5,
    },
    playIcon0: {
        position: 'absolute',
        bottom: 20,
        right: 8,
        borderRadius: 20,
        padding: 5,
    },

    playIcon1: {
        position: 'absolute',
        bottom: 20,
        right: 8,
        borderRadius: 20,
        padding: 5,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: 350,
        elevation: 2,
    },
    card0: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: 200,
        elevation: 2,
    },
    playIconContainer: {
        // position: 'absolute',
        // paddingTop: 20,
    },
    playIconContainer0: {
        // position: 'absolute',
        // paddingTop: 20,
    },
    descriptionContainer: {
        flex: 1,
        padding: 10,
    },
    descriptionContainer0: {
        flex: 1,
        padding: 5,
    },
    title: {
        fontSize: 16,
        paddingTop: 5,
        paddingLeft: 5,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        paddingBottom: 5,
        paddingLeft: 5,
        color: '#555555',
    },
    title0: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'white',
    },
    description0: {
        fontSize: 10,
        color: 'white',
    },
    playListScroll: {
        flexDirection: 'row',
        gap: 15,
    },
    playListScroll0: {
        flexDirection: 'row',
        gap: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 10,
    },
    progress: {
        marginTop: 10,
    },
});

export default VideoScreen;
