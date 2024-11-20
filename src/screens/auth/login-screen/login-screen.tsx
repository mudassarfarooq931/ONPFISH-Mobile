import {ButtonPrimary, Input, ProgressDialog} from '@components';
import {colors, fonts, ScreenEnum} from '@constants';
import {handleLogin} from '@redux/slice/auth/actions/login';
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
    loading: state.auth.loginLoading,
  };
};
const LoginScreen = ({loading}: IProps) => {
  const [email, setEmail] = useState('javaid@gmail.com');
  const [password, setPassword] = useState('National$1');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
    };
  }, []);

  const onSubmit = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please enter email and password!');
    } else if (email && password) {
      dispatch(handleLogin({email, password}));
    } else {
      Alert.alert('Login Failed', 'Please fill all fields');
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
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Email</Text>
        <Input
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email.toLowerCase()}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <Input
          style={[styles.input, {marginBottom: 10}]}
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

        <TouchableOpacity
          onPress={() => navigate(ScreenEnum?.ChangePassword)}
          activeOpacity={0.7}
          style={{
            justifyContent: 'center',
            alignSelf: 'flex-end',
            marginBottom: 10,
            paddingLeft: 5,
          }}>
          <Text
            style={[
              styles.label,
              {color: colors.primary, fontFamily: fonts.MONTSERRAT_SEMIBOLD},
            ]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <ButtonPrimary title="Login" onPress={onSubmit} />

        <View style={styles.linkButtonContainer}>
          <Text style={styles.linkLabel1}>{"Don't have an account? "}</Text>
          <TouchableOpacity onPress={() => navigate(ScreenEnum?.Signup)}>
            <Text style={styles.linkLabel2}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default connect(mapStateToProps)(LoginScreen);
