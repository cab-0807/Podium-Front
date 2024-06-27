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
import { useAuth } from '../AuthContext'; // Import the custom hook

const LoginModal = ({ closeModal }) => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [underlineRegister, setUnderlineRegister] = useState(false); // State to underline "Sign up for free"
  const [forgotClicked, setForgotClicked] = useState(false); // State to track forgot password click
  const [loginClicked, setLoginClicked] = useState(false); // State to track login button click
  const [resetSent, setResetSent] = useState(false); // State to track if reset email is sent

  const [registering, setRegistering] = useState(false); // State to track if registering
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Animation and gesture state
  const [pan] = useState(new Animated.ValueXY());

  // Refs for text input focus
  const passwordInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Pan responder to handle gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        // Close modal if dragged down by more than 50 pixels
        closeModal();
      } else {
        // Reset position if not dragged enough
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });

  // Function to handle overlay press (dismiss keyboard and unfocus inputs)
  const handleOverlayPress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    if (emailInputRef.current) emailInputRef.current.blur(); // Unfocus email input
    if (passwordInputRef.current) passwordInputRef.current.blur(); // Unfocus password input
    if (registerPasswordRef.current) registerPasswordRef.current.blur(); // Unfocus register password input
    if (confirmPasswordRef.current) confirmPasswordRef.current.blur(); // Unfocus confirm password input
  };

  // Email validation function
  const validateEmail = (email) => {
    // Basic email validation using regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateLogin = () => {
    if (!email.trim() && !password.trim()) {
      setLoginError('Email & password are required.');
      return;
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setLoginError('Invalid email address.');
      return;
    }

    if (!password.trim()) {
      setLoginError('Password is required.');
      return;
    }

    // Password strength validation
    if (password.length < 8) {
      setLoginError('Password must be at least 8 characters long.');
      return;
    }
    setLoginError('');
  };

  const handleLogin = () => {
    login()
    return;
    if (!validateLogin()) {
      return;
    }
    
    setLoading(true);
    setLoginClicked(true); 
    // Simulate API call for login
    setTimeout(() => {
      console.log('Logging in with:', email, password);
      setLoading(false);
      //login(); // Set isAuthenticated to true
      closeModal();
    }, 1500);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
    setForgotClicked(true); // Set forgot password button clicked
    // Implement logic for forgot password
    // For demonstration, let's assume an API call to send reset email
    setTimeout(() => {
      setResetSent(true);
    }, 1500);
  };

  const handleRegistration = () => {
    setUnderlineRegister(!registering); // Toggle underline "Sign up for free"
    setRegistering(!registering); // Toggle registering state
  };

  const validateRegistration = () => {
    if (!registerEmail.trim() && !registerPassword.trim()) {
      setRegisterError('Email & password are required.');
      return;
    }

    if (registerEmail.trim() && !validateEmail(registerEmail.trim())) {
      setRegisterError('Invalid email address.');
      return;
    }

    if (!registerPassword.trim()) {
      setRegisterError('Password is required.');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    // Password strength validation
    if (registerPassword.length < 8) {
      setRegisterError('Password must be at least 8 characters long.');
      return;
    }

    // Clear previous errors if valid
    setRegisterError('');
  };

  const handleRegisterSubmit = () => {
    // Validate before proceeding with registration
    validateRegistration();

    if (registerError) {
      return; // Do not proceed if there are errors
    }

    // Simulate API call for registration
    setLoading(true);
    setTimeout(() => {
      console.log('Registering with:', registerEmail, registerPassword);
      setLoading(false);
      setRegistering(false);
      closeModal();
    }, 1500);
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
                    validateLogin();
                  }}
                  returnKeyType="next"
                  onSubmitEditing={focusPasswordInput}
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.inputContainer}>
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
                    validateLogin();
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%', opacity: loginClicked ? 0.5 : 1 }]}
                onPress={handleLogin}
                disabled={loading|| loginError}
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
              <View style={[styles.inputContainer, registerError && !registerEmail.trim() ? styles.inputError : null]}>
                <Ionicons name="person-outline" size={24} color="black" style={styles.inputIcon} />
                <TextInput
                  ref={emailInputRef}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="lightgrey"
                  value={registerEmail}
                  onChangeText={(text) => {
                    setRegisterEmail(text);
                    validateRegistration();
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => registerPasswordRef.current.focus()}
                  blurOnSubmit={false}
                />
              </View>
              <View style={[styles.inputContainer, registerError && (!registerPassword.trim() || registerPassword.length < 8) ? styles.inputError : null]}>
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
                    validateRegistration();
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleRegisterSubmit}
                />
              </View>

              <View style={[styles.inputContainer, registerError && registerPassword !== confirmPassword ? styles.inputError : null]}>
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
                    validateRegistration();
                  }}
                  returnKeyType="done"
                  onSubmitEditing={handleRegisterSubmit}
                />
              </View>
              <TouchableOpacity
                style={[styles.loginButton, { width: '100%', opacity: loading ? 0.5 : 1 }]}
                onPress={handleRegisterSubmit}
                disabled={loading|| registerError}
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

          {registering && registerError ? <Text style={styles.errorText}>{registerError}</Text> : null}
          {!registering && loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
          {resetSent && (
            <Text style={{ marginTop: 10, color: 'green' }}>Reset link sent to {email}. Check your email.</Text>
          )}

          {!registering ? (
            <TouchableOpacity onPress={handleRegistration} style={styles.registerLink}>
              <Text>Don't have an account? </Text>
              <Text style={[styles.registerLinkText, underlineRegister]}>
                Sign up for free
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleRegistration} style={styles.registerLink}>
              <Text>Already have an account? </Text>
              <Text style={[styles.registerLinkText, underlineRegister ]}>
                Log In instead
              </Text>
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
  underlinedText: {
    textDecorationLine: 'underline',
  },

  errorText: {
    color: 'red',
    fontWeight:'bold',
    fontSize:12,
    marginTop: 10,
    textAlign: 'center',
  },
  resetText: {
    color: 'green',
    fontWeight:'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
});

export default LoginModal;
