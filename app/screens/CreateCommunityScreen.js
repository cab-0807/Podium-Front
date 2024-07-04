import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import axiosService from '../../services/axiosService';

const CreateCommunityScreen = () => {
  const groupNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expDateRef = useRef(null);
  const cvvRef = useRef(null);
  const cardNameRef = useRef(null);

  const [groupName, setGroupName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [groupNameError, setGroupNameError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expDateError, setExpDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [cardNameError, setCardNameError] = useState(false);

  const handleGroupNameChange = (input) => {
    setGroupName(input);
    setGroupNameError(false); // Clear error state on input change
  };

  const handleHolder = (input) => {
    setCardName(input);
    setCardNameError(false); // Clear error state on input change
  };

  const handleCardNumberChange = (input) => {
    let formattedInput = input.replace(/\D/g, '');
    formattedInput = formattedInput.slice(0, 16);
    formattedInput = formattedInput.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedInput);
    setCardNumberError(false); // Clear error state on input change
  };

  const handleExpDateChange = (input) => {
    let formattedInput = input.replace(/\D/g, '');
    if (formattedInput.length > 2) {
      formattedInput = formattedInput.slice(0, 2) + '/' + formattedInput.slice(2);
    }
    formattedInput = formattedInput.slice(0, 5);
    setExpDate(formattedInput);
    setExpDateError(false); // Clear error state on input change
  };

  const handleCvvChange = (input) => {
    let formattedInput = input.replace(/\D/g, '');
    formattedInput = formattedInput.slice(0, 3);
    setCvv(formattedInput);
    setCvvError(false); // Clear error state on input change
  };

  const handleButtonClick = () => {
    let hasError = false;

    if (!groupName) {
      setGroupNameError(true);
      hasError = true;
    }
    /*if (!validateCardNumber(cardNumber)) {
      setCardNumberError(true);
      hasError = true;
    }
    if (!validateExpDate(expDate)) {
      setExpDateError(true);
      hasError = true;
    }
    if (cvv.length !== 3) {
      setCvvError(true);
      hasError = true;
    }
    if (!cardName) {
      setCardNameError(true);
      hasError = true;
    }*/

    if (hasError) {
      return;
    }

    let data = {
      name:groupName
    }
    axiosService
      .createCommunity(data)
      .then((response) => {
        setLoading(false);
        console.log('Community Creation  successful:', response);

          Toast.show({
            type: 'success',
            text1: 'Community Creation Successful',
            visibilityTime: 2000,
            autoHide: true,
          });

      })
      .catch((error) => {
        setLoading(false);
        console.error('Error registering:', error);
        // Handle specific error scenarios if needed
        if (error.response) {
          // Server responded with an error status code
          setRegisterError(error.response.data.message);
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: error.response.data.message,
            visibilityTime: 3000,
            autoHide: true,
          });
        } else if (error.request) {
          // Request made but no response received
          setRegisterError('Network Error. Please try again.');
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: 'Network Error. Please try again.',
            visibilityTime: 3000,
            autoHide: true,
          });
        } else {
          // Something else happened
          setRegisterError('An unexpected error occurred. Please try again later.');
          Toast.show({
            type: 'error',
            text1: 'Registration Error',
            text2: 'An unexpected error occurred. Please try again later.',
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      });
  };

  const validateCardNumber = (cardNumber) => {
    const strippedCardNumber = cardNumber.replace(/\s/g, '');
    return strippedCardNumber.length === 16;
  };

  const validateExpDate = (expDate) => {
    const parts = expDate.split('/');
    if (parts.length !== 2) {
      return false;
    }
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    if (isNaN(month) || isNaN(year)) {
      return false;
    }
    if (month < 1 || month > 12) {
      return false;
    }
    return true;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Toast/>
        <Image source={require('../../assets/images/toftal.png')} style={styles.logo} />
        <Text style={styles.title}>Create your community</Text>
        <Text style={styles.description}>
          Free for 14 days, then $99/month. Cancel anytime. All features. Unlimited everything. No hidden fees.
        </Text>
        <TextInput
          ref={groupNameRef}
          style={[styles.input, groupNameError ? styles.inputError : null]}
          placeholder="Group Name"
          value={groupName}
          onChangeText={handleGroupNameChange}
          placeholderTextColor="lightgrey"
          returnKeyType="next"
        />
        {groupNameError && <Text style={styles.errorText}>Please enter a group name</Text>}
        {!groupNameError && <Text style={styles.infoText}>You can change this later.</Text>}
        
        <View style={styles.row}>
          
          <TextInput
            ref={expDateRef}
            style={[styles.input, styles.halfInput, expDateError ? styles.inputError : null]}
            placeholder="MM/YY"
            placeholderTextColor="lightgrey"
            keyboardType="number-pad"
            value={expDate}
            onChangeText={handleExpDateChange}
            returnKeyType="next"
          />
          
          <TextInput
            ref={cvvRef}
            style={[styles.input, styles.halfInput, cvvError ? styles.inputError : null]}
            placeholder="CVV"
            placeholderTextColor="lightgrey"
            keyboardType="number-pad"
            value={cvv}
            onChangeText={handleCvvChange}
            returnKeyType="next"
          />
        </View>
        <View style={styles.row}>
        {expDateError && <Text style={styles.errorText1}>Please enter a valid expiration date (MM/YY)</Text>}
        {cvvError && <Text style={styles.errorText1}>Please enter a valid CVV (3 digits)</Text>}
        </View>
        
        <TextInput
          ref={cardNumberRef}
          style={[styles.input, cardNumberError ? styles.inputError : null]}
          placeholder="Card Number"
          placeholderTextColor="lightgrey"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          returnKeyType="next"
        />
        {cardNumberError && <Text style={styles.errorText}>Please enter a valid card number</Text>}
        
        <TextInput
          ref={cardNameRef}
          style={[styles.input, cardNameError ? styles.inputError : null]}
          placeholder="Cardholder's Name"
          placeholderTextColor="lightgrey"
          value={cardName}
          onChangeText={handleHolder}
          returnKeyType="done"
        />
        {cardNameError && <Text style={styles.errorText}>Please enter the cardholder's name</Text>}

        <Text style={styles.chargeText}>
          Your first charge will be on July 15th, 2024 for $99. Cancel anytime with 1-click. By clicking below, you accept our terms.
        </Text>
        <TouchableOpacity
          style={[styles.button, (cardNumberError || expDateError || cvvError || cardNameError) && styles.disabledButton]}
          onPress={handleButtonClick}
          disabled={cardNumberError || expDateError || cvvError || cardNameError}
        >
          <Text style={styles.buttonText}>START FREE TRIAL</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height:50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 20,
    marginLeft: 10,
    color: 'grey',
    fontStyle: 'italic',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  chargeText: {
    fontSize: 13,
    textAlign: 'left',
    marginBottom: 30,
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ef2969',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC', // Grey color for disabled state
  },
  errorText: {
    color: 'red',
    marginTop: 0,
    textAlign: 'left',
    width: '100%',
  },
  errorText1: {
    color: 'red',
    marginTop: 0,
    textAlign: 'left',
    width: '48%',
  },
});

export default CreateCommunityScreen;
