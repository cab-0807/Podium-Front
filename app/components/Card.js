import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Card = ({ community, index }) => {
  return (
    <TouchableOpacity key={index} style={styles.card}>
      <TouchableOpacity style={styles.topRightButton}>
        <Text style={styles.buttonText}>{community.category}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={community.image} style={styles.communityImage} />
      </View>
      <View style={styles.cardContentContainer}>
        <Text style={styles.cardTitle}>{community.name}</Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardContent}>
          {community.description}
        </Text>
      </View>
      <View style={styles.ownerContainer}>
        <Image source={community.owner.image} style={styles.ownerImage} />
        <Text style={{fontSize:12}}> Par</Text>
        <TouchableOpacity >
            <Text style={styles.ownerName}> {community.owner.name}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomInfo}>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
        <View style={styles.infoCard}>
          <View style={styles.leftBlock}>
            <Text style={styles.infoText}>+5k Members</Text>
            <Text style={styles.infoText}>10k FCFA/mois</Text>
          </View>
          <View style={styles.rightBlock}>
            {community.members.map((member, index) => (
              <Image
                key={index}
                source={member.profilePicture}
                style={styles.memberImage}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 30,
    elevation: 3,
    flexDirection: 'column',
    padding:15,
    borderRadius: 30
  },
  topRightButton: {
    position: 'absolute',
    top: 20,
    right: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',//rgba(244, 180, 0, 0.7)
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    zIndex: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative', 
    width: '100%',
    height: 170,
    marginBottom: 10,
  },
  communityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  cardContentContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
    color: '#00000080',
  },
  bottomInfo: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#D9D9D933',
    shadowColor: '#0759E31A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
    elevation: 5,
  },
  joinButton: {
    backgroundColor: '#0F9D484D',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 40,
    shadowColor: '#4CD9641A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: '30%',
  },
  joinButtonText: {
    color: '#0F9D48',
    fontSize: 18,
  },
  leftBlock: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  rightBlock: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingLeft: 10,
  },
  memberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: -15, 
    borderWidth: 2,
    borderColor: '#fff',
  },
  ownerContainer:{
    marginTop:10,
    marginLeft:5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerImage:{
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  ownerName:{
    fontSize:14,
    fontWeight:'bold'
  }
});

export default Card;
