import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  PanResponder,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';
import axiosService from '../../services/axiosService';
import Toast from 'react-native-toast-message';

const LoginModal = ({ closeModal }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [underlineRegister, setUnderlineRegister] = useState(false);
  const [forgotClicked, setForgotClicked] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const [registering, setRegistering] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const [pan] = useState(new Animated.ValueXY());

  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        closeModal();
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  const handleOverlayPress = () => {
    Keyboard.dismiss();
    if (emailInputRef.current) emailInputRef.current.blur();
    if (passwordInputRef.current) passwordInputRef.current.blur();
    if (registerPasswordRef.current) registerPasswordRef.current.blur();
    if (confirmPasswordRef.current) confirmPasswordRef.current.blur();
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateLogin = () => {
    if (!email.trim() && !password.trim()) {
      setLoginError(true);
      Toast.show({
        type: 'error',
        text1: 'Email & Password are required',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setLoginError(false);
      }, 2000);
      return false;
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setLoginError(true);
      Toast.show({
        type: 'error',
        text1: 'Invalid Email Address',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setLoginError(false);
      }, 2000);
      return false;
    }

    if (!password.trim()) {
      setLoginError(true);
      Toast.show({
        type: 'error',
        text1: 'Password is required',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setLoginError(false);
      }, 2000);
      return false;
    }

    if (password.length < 8) {
      setLoginError(true);
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 8 characters long.',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setLoginError(false);
      }, 2000);
      return false;
    }

    setLoginError(false);
    return true;
  };

  const handleLogin = () => {
    if (!validateLogin()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    axiosService
    .login(data)
    .then((response) => {
      setLoading(false);
      console.log('Login successful:', response);
      const token = response.access_token;
      if(token){
        login(token);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => closeModal(),
        });
      }else{
        Toast.show({
          type: 'error',
          text1: 'Failed to log you in. Try again.',
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => closeModal(),
        });
      }
    })
    .catch((error) => {
      setLoading(false);
      console.error('Error logging in:', error);
      // Handle specific error scenarios if needed
      if (error.response) {
        setLoginError(error.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'Login Error',
          text2: error.response.data.message,
          visibilityTime: 3000,
          autoHide: true,
        });
      } else if (error.request) {
        setLoginError('Network Error. Please try again.');
        Toast.show({
          type: 'error',
          text1: 'Login Error',
          text2: 'Network Error. Please try again.',
          visibilityTime: 3000,
          autoHide: true,
        });
      } else {
        setLoginError('An unexpected error occurred. Please try again later.');
        Toast.show({
          type: 'error',
          text1: 'Login Error',
          text2: 'An unexpected error occurred. Please try again later.',
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    });

  };

  const handleForgotPassword = () => {
    setForgotClicked(true);
    setTimeout(() => {
      setResetSent(true);
    }, 1500);
  };

  const handleRegistration = () => {
    setUnderlineRegister(!registering);
    setRegistering(!registering);
  };

  const validateRegistration = () => {
    if (!registerName.trim() && !registerEmail.trim() && !registerPassword.trim()) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Name, Email & Password are required',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    if (!registerName.trim()) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Name is required',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    if (registerEmail.trim() && !validateEmail(registerEmail.trim())) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Email is invalid',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    if (!registerPassword.trim()) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Password is required',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    if (registerPassword.length < 8) {
      setRegisterError(true);
      Toast.show({
        type: 'error',
        text1: 'Password must be at least 8 characters long' ,
        visibilityTime: 3000,
        autoHide: true,
      });
      setTimeout(() => { 
        setRegisterError(false);
      }, 2000);
      return false;
    }

    setRegisterError(false);
    return true;
  };

  const handleRegisterSubmit = () => {
    if (!validateRegistration()) {
      return;
    }
    setLoading(true);
    const data = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
      provider: "None"
    };
    axiosService
      .register(data)
      .then((response) => {
        setLoading(false);
        console.log('Registration successful:', response);
        // Assuming your API response returns a token in the response
        const token = response.access_token; 
        if(token){
          login(token);
          setRegistering(false);
          Toast.show({
            type: 'success',
            text1: 'Registration Successful',
            visibilityTime: 2000,
            autoHide: true,
            onHide: () => closeModal()
          });
        }else{
          setRegistering(false);
          Toast.show({
            type: 'error',
            text1: 'Failed to create session. Try to log in.',
            visibilityTime: 2000,
            autoHide: true,
            onHide: () => closeModal()
          });
        }
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

  const focusPasswordInput = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  const focusEmailInput = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleOverlayPress}>
      <Animated.View
        style={[styles.modalContainer, { transform: [{ translateY: pan.y }] }]}
        {...panResponder.panHandlers}
      >
      <Toast/>

        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <Ionicons name="logo-react" size={60} color="black" style={styles.logo} />
          <Text style={styles.modalTitle}>{registering ? 'Register on Podium' : 'Log in to Podium'}</Text>
          {!registering ? (
            <>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%' }]}
                onPress={() => console.log('Sign in with Google')}
                disabled={loading}
              >
                <Ionicons name="logo-google" size={24} color="white" style={styles.loginIcon} />
                <Text style={styles.loginButtonText}>Sign in with Google</Text>
              </TouchableOpacity>

              <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 24, fontWeight: 'bold' }}>OR</Text>
              <View style={[styles.inputContainer, loginError && !email.trim() ? styles.inputError : null]}>
                <Ionicons name="person-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="lightgrey"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  returnKeyType="Next"
                  onSubmitEditing={focusPasswordInput}
                  blurOnSubmit={false}
                />
              </View>
              <View style={[styles.inputContainer, loginError && (!password.trim() || password.length < 8) ? styles.inputError : null]}>
                <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="lightgrey"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  returnKeyType="Done"
                  onSubmitEditing={handleLogin}
                />
              </View>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%', opacity: loginError ? 0.5 : 1 }]}
                onPress={handleLogin}
                disabled={loading || loginError}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Ionicons name="log-in-outline" size={24} color="white" style={styles.loginIcon} />
                    <Text style={styles.loginButtonText}>Login</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.forgotButton, { width: '100%', opacity: forgotClicked ? 0.5 : 1 }]}
                onPress={handleForgotPassword}
                disabled={loading}
              >
                <Ionicons name="lock-closed-outline" size={24} color="white" style={styles.loginIcon} />
                <Text style={styles.forgotButtonText}>Forgot Password?</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%' }]}
                onPress={() => console.log('Sign up with Google')}
                disabled={loading}
              >
                <Ionicons name="logo-google" size={24} color="white" style={styles.loginIcon} />
                <Text style={styles.loginButtonText}>Sign up with Google</Text>
              </TouchableOpacity>

              <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 24, fontWeight: 'bold' }}>OR</Text>
              <View
                style={[styles.inputContainer, registerError && !registerName.trim() ? styles.inputError : null]}
              >
                <Ionicons name="person-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor="lightgrey"
                  value={registerName}
                  onChangeText={(text) => setRegisterName(text)}
                  returnKeyType="Next"
                  onSubmitEditing={() => emailInputRef.current.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View
                style={[styles.inputContainer, registerError && !registerEmail.trim() ? styles.inputError : null]}
              >
                <Ionicons name="mail-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="lightgrey"
                  value={registerEmail}
                  onChangeText={(text) => {
                    setRegisterEmail(text);
                  }}
                  returnKeyType="Next"
                  onSubmitEditing={() => registerPasswordRef.current.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View
                style={[
                  styles.inputContainer,
                  registerError && (!registerPassword.trim() || registerPassword.length < 8)
                    ? styles.inputError
                    : null,
                ]}
              >
                <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={registerPasswordRef}
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="lightgrey"
                  secureTextEntry
                  value={registerPassword}
                  onChangeText={(text) => {
                    setRegisterPassword(text);
                  }}
                  returnKeyType="Done"
                  onSubmitEditing={handleRegisterSubmit}
                />
              </View>

              <View
                style={[
                  styles.inputContainer,
                  registerError && registerPassword !== confirmPassword ? styles.inputError : null,
                ]}
              >
                <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="lightgrey"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleRegisterSubmit}
                />
              </View>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%', opacity: loading ? 0.5 : 1 }]}
                onPress={handleRegisterSubmit}
                disabled={loading || registerError}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <>
                    <Ionicons name="person-add-outline" size={24} color="white" style={styles.loginIcon} />
                    <Text style={styles.loginButtonText}>Register</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}

          
          {resetSent && (
            <Text style={{ marginTop: 10, color: 'green' }}>Reset link sent to {email}. Check your email.</Text>
          )}

          {!registering ? (
            <TouchableOpacity onPress={handleRegistration} style={styles.registerLink}>
              <Text>Don't have an account? </Text>
              <Text style={[styles.registerLinkText, underlineRegister]}>Sign up for free</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleRegistration} style={styles.registerLink}>
              <Text>Already have an account? </Text>
              <Text style={[styles.registerLinkText, underlineRegister]}>Log In instead</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', //'rgba(255, 255, 255, 0.9)',
    marginTop: 50,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  forgotButton: {
    backgroundColor: '#ef2969',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  forgotButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  loginIcon: {
    marginRight: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  registerLink: {
    marginTop: 10,
    flexDirection: 'row',
  },
  registerLinkText: {
    color: '#ef2969',
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  resetText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
});

export default LoginModal;
