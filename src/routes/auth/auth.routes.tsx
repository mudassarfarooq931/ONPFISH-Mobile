import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@redux/store';
import {AuthNavParamList} from '@routes/param-list';
import {
  ChangePasswordScreen,
  LoginScreen,
  SignupScreen,
  WelcomeScreen,
} from '@screens';
import loginScreen from '@screens/auth/login-screen/login-screen';
import React from 'react';
import {connect} from 'react-redux';

interface IProps {}

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth?.uid,
  };
};

const {Navigator, Screen} = createNativeStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => {
  return (
    <Navigator
      initialRouteName={'Welcome'}
      screenOptions={{headerShown: false}}>
      <Screen name={'Welcome'} component={WelcomeScreen} />
      <Screen name={'Login'} component={LoginScreen} />
      <Screen name={'ChangePassword'} component={ChangePasswordScreen} />
      <Screen name={'Signup'} component={SignupScreen} />
    </Navigator>
  );
};

export default connect(mapStateToProps)(AuthNav);
