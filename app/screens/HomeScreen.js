import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../AuthContext'; 
import LoginModal from './LoginModal';
import Card from '../components/Card'

const communities = Array.from({ length: 50 }, (_, i) => ({
  name: `Podium ${i + 1}`,
  description: `Description for Community ${i + 1}`,
  image: require('../../assets/images/com-image.jpeg'), 
  private: true,
  free: true,
  membersNumber: 10,
  category:'💰 Business',
  owner: {
    name: 'Hapsatou Sy',
    image:require('../../assets/images/com-image.jpeg') 
  },
  members:[
    { profilePicture: require('../../assets/images/com-image.jpeg') },
    { profilePicture: require('../../assets/images/com-image.jpeg') },
    { profilePicture: require('../../assets/images/com-image.jpeg') }
  ],
}));
const categories = ['Tout', '💰 Business', '📚 Dev Perso', '👩🏾‍⚕️ Health']
const ITEMS_PER_PAGE = 15;

function HomeScreen({ route }) {
  const { runFunction } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const scrollViewRef = useRef(null);
  const { isAuthenticated, checkAuthToken, saveCurrentScreen } = useAuth(); 
  const navigation = useNavigation(); 
  const [activeButton, setActiveButton] = useState(0); // Track the active button

  const pressed = () => {
    runFunction();
  };

  useEffect(() => {
    checkAuthToken();
    saveCurrentScreen('HomeScreen');
  }, []); 

  const handleNext = () => {
    if (currentPage * ITEMS_PER_PAGE < communities.length) {
      setCurrentPage(currentPage + 1);
      setShowPagination(false);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setShowPagination(false);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const handleNavItemPress = (community) => {
    navigation.navigate('CommunityScreen', { community }); 
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height;
    setShowPagination(isEndReached);
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToRender = filteredCommunities.slice(startIndex, endIndex);

  const isClicked = () => {
    if (!isAuthenticated) {
      runFunction();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleCategoryPress = (index) => {
    setActiveButton(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={isClicked} >
          <Ionicons name="menu" size={34} color="black" style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search a podium"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity>
          <View style={styles.filterIcon} >
            <Ionicons name="filter" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16} 
      >

        <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.buttonContainer}
        >
          {categories.map((buttonLabel, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleCategoryPress(index)} 
              style={[
                styles.button, 
                activeButton === index ? styles.activeButton : styles.inactiveButton
              ]}
            >
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.contentTitle}>
          <Text style={styles.contentTitleText}>Top podiums</Text>
        </View>
        {itemsToRender.map((community,index) => (
          <Card community={community} index={index} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this line
    backgroundColor: 'white',
    height: 80,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '70%',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  buttonContainer: {
    paddingVertical: 5,
    paddingLeft: 5,
    marginBottom:10
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#0759E3',
  },
  inactiveButton: {
    backgroundColor: '#C2D3EE',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight:'bold'
  },
  contentTitle:{
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  contentTitleText:{
    fontSize:22,
    fontWeight:'bold'
  },
  content: {
    padding: 20,
    paddingBottom: 50
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    padding: 20,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    zIndex: 1000, 
  },
  paginationButton: {
    flexDirection: 'row', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    alignItems: 'center', 
  },
  paginationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5, 
    marginRight: 5, 
  },
  paginationIcon: {
    marginRight: 5, 
  },
  disabledButton: {
    opacity: 0.5, 
  },
  filterIcon: {
    backgroundColor:'#E9E9E9',
    width:50,
    paddingHorizontal:5,
    paddingVertical:10,
    alignItems:'center',
    borderRadius: 20,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
    elevation: 5,
  },
});

export default HomeScreen;
