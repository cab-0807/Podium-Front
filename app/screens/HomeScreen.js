// HomeScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Ionicons for icons
import { useAuth } from '../AuthContext'; // Import the custom hook
import LoginModal from './LoginModal'; // Import your LoginModal component

const communities = Array.from({ length: 50 }, (_, i) => ({
  name: `Community ${i + 1}`,
  description: `Description for Community ${i + 1}`,
  image: `../../assets/images/logo-toftal.png`, // Example image import
  private: true,
  free: true,
  membersNumber: 10,
}));

const ITEMS_PER_PAGE = 15;

function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); // Initially hide pagination
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const scrollViewRef = useRef(null);
  const { isAuthenticated } = useAuth(); // Access authentication state

  const handleNext = () => {
    if (currentPage * ITEMS_PER_PAGE < communities.length) {
      setCurrentPage(currentPage + 1);
      setShowPagination(false); // Hide pagination after clicking Next
      scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to top
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setShowPagination(false); // Hide pagination after clicking Previous
      scrollViewRef.current.scrollTo({ y: 0, animated: true }); // Scroll to top
    }
  };

  const handleNavItemPress = (content) => {
    if (isAuthenticated) {
      Alert.alert('Community Details', content);
    } else {
      setIsModalVisible(true); // Show the login modal
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setShowPagination(isEndReached); // Show pagination when scrolled to the end
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToRender = communities.slice(startIndex, endIndex);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Adjust the throttle as needed
      >
        {itemsToRender.map((community, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleNavItemPress(community.description)}>
            <Text style={styles.cardTitle}>{community.name}</Text>
            <Text style={styles.cardContent}>{community.description}</Text>
            <View style={styles.bottomInfo}>
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>{community.private ? 'Private' : 'Public'}</Text>
                <Text style={styles.infoText}>{community.membersNumber} members</Text>
                <Text style={styles.infoText}>{community.free ? 'Free' : 'Paid'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showPagination && (
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrevious}
            disabled={currentPage === 1}
            style={[styles.paginationButton, currentPage === 1 ? styles.disabledButton : null]}
          >
            <Ionicons name="chevron-back" size={16} color="white" style={styles.paginationIcon} />
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNext}
            disabled={currentPage * ITEMS_PER_PAGE >= communities.length}
            style={[
              styles.paginationButton,
              currentPage * ITEMS_PER_PAGE >= communities.length ? styles.disabledButton : null,
            ]}
          >
            <Text style={styles.paginationText}>Next</Text>
            <Ionicons name="chevron-forward" size={16} color="white" style={styles.paginationIcon} />
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <LoginModal closeModal={() => setIsModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 60,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
  },
  bottomInfo: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    marginRight: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align buttons left and right
    padding: 30,
    paddingLeft: 40,
    paddingRight: 40,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    zIndex: 1000, // Ensure pagination is above content
  },
  paginationButton: {
    flexDirection: 'row', // Ensure text and icon are aligned horizontally
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center', // Center items vertically
  },
  paginationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5, // Space between text and icon
    marginRight: 5, // Space between text and icon
  },
  paginationIcon: {
    marginRight: 5, // Space between text and icon
  },
  disabledButton: {
    opacity: 0.5, // Reduce opacity to visually indicate disabled state
  },
});

export default HomeScreen;
