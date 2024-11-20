import {ButtonPrimary, Input, ProgressDialog} from '@components';
import {colors, ScreenEnum} from '@constants';
import {SignupUser} from '@redux/slice/auth/actions/signup';
import {AppDispatch, RootState} from '@redux/store';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect, useDispatch} from 'react-redux';
import {navigate} from '../../../../root-navigation';
import {styles} from './style';

interface IProps {
  loading: boolean;
}
const mapStateToProps = (state: RootState) => {
  return {
    loading: state.auth.signupLoading,
  };
};
const SignupScreen = ({loading}: IProps) => {
  useEffect(() => {
    setFullName('');
    setEmail('');
    setPassword('');
    setRrole('');
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('National$1');
  const [role, setRrole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleChange = (role: string) => {
    setRrole(role);
  };
  const onSubmit = async () => {
    if (fullName === '' && email === '' && password === '' && role === '') {
      Alert.alert('Please fill all required fields');
      return;
    }
    if (fullName === '') {
      Alert.alert('please enter your full name');
    } else if (email === '') {
      Alert.alert('please enter your email address');
    } else if (password === '') {
      Alert.alert('please enter your password');
    } else if (role === '') {
      Alert.alert(' Please select your role');
    } else {
      dispatch(SignupUser({fullName, email, password, role}));
      console.log(fullName, email, password, role);
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
        <Text style={styles.title}>Signup</Text>

        <Text style={styles.label}>Full Name</Text>
        <Input
          style={styles.input}
          placeholder="Enter your full name"
          onChangeText={setFullName}
          value={fullName}
          keyboardType="default"
        />

        <Text style={styles.label}>Email</Text>
        <Input
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email?.toLowerCase()}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <Input
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secure={!showPassword}
          children={
            <TouchableOpacity
              style={styles.inputIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye' : 'eye-off'}
                size={25}
                color={colors.gray}
              />
            </TouchableOpacity>
          }
        />

        <Text style={styles.label}>Choose Your Role</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioCircle,
              role === 'admin' && styles.radioCircleSelected,
            ]}
            onPress={() => handleRoleChange('admin')}>
            {role === 'admin' && <View style={styles.radioInnerCircle} />}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>Admin</Text>

          <TouchableOpacity
            style={[
              styles.radioCircle,
              role === 'user' && styles.radioCircleSelected,
            ]}
            onPress={() => handleRoleChange('user')}>
            {role === 'user' && <View style={styles.radioInnerCircle} />}
          </TouchableOpacity>
          <Text style={styles.radioLabel}>User</Text>
        </View>

        <ButtonPrimary title="Signup" onPress={onSubmit} />
        <View style={styles.linkButtonContainer}>
          <Text style={styles.linkLabel1}>{'Already have an account? '}</Text>
          <TouchableOpacity onPress={() => navigate(ScreenEnum.Login)}>
            <Text style={styles.linkLabel2}>{'Login'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default connect(mapStateToProps)(SignupScreen);
