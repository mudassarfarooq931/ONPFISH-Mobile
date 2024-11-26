import {colors, ScreenEnum} from '@constants';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {navigate} from '../../../../root-navigation';

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
      <Image
        source={require('@images/app-logo.png')}
        style={{
          height: 200,
          width: 200,
          resizeMode: 'cover',
          marginBottom: 20,
        }}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    // flex: 1,
    backgroundColor: colors.primary,
    // paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  signupButtonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
