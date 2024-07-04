// AddComponent.js
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../AuthContext'; 

const AddComponent = () => {
const { currentScreen } = useAuth(); 

  useEffect(() => {
    console.log(currentScreen);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>AddComponent Screen</Text>
    </View>
  );
};

export default AddComponent;
