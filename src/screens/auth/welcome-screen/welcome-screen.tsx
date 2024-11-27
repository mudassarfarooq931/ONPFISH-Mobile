import {colors, ScreenEnum} from '@constants';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {navigate} from '../../../../root-navigation';
import {styles} from './style';

const WelcomeScreen = () => {
  const handleLoginPress = () => {
    navigate(ScreenEnum?.Login);
    // Add navigation logic here
  };

  const handleSignupPress = () => {
    navigate(ScreenEnum?.Signup);
  };

  return (
    <View style={styles.container}>
      <Image source={require('@images/app-logo.png')} style={styles.logo} />

      <Text style={styles.heading}>Instant Fish Identification</Text>
      <Text style={styles.description}>
        Take a picture to instantly identify your catch and learn local fishing
        regulations.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={handleSignupPress}>
          <Text style={styles.signupButtonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
