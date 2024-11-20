import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import {ButtonPrimary, Input, ProgressDialog} from '@components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, ScreenEnum} from '@constants';
import {navigate} from '../../../../root-navigation';

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    setEmail('');

    return () => {
      setLoading(false);
      setEmail('');
    };
  }, []);

  const onSubmit = async () => {
    if (email) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setEmail('');

        Alert.alert(
          'Success',
          'Please check your email addresss',
          [
            {
              text: 'OK',
              onPress: () => {
                navigate(ScreenEnum?.Login);
              },
            },
          ],
          {cancelable: false},
        );

        setEmail('');
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Failed', 'Please enter a valid email address');
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: 0, android: -500})}>
      {loading && <ProgressDialog visible={loading} />}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Forgot Password</Text>

        <Text style={styles.label}>Email</Text>

        <Input
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email?.toLowerCase()}
          keyboardType="email-address"
        />

        <ButtonPrimary title="Login" onPress={onSubmit} />
        <View style={styles.linkButtonContainer}>
          <Text style={styles.linkLabel1}>{'Back to '}</Text>
          <TouchableOpacity onPress={() => navigate(ScreenEnum?.Login)}>
            <Text style={styles.linkLabel2}>{'Login'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;
