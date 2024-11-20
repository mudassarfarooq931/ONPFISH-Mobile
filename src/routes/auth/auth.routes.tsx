import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthNavParamList} from '@routes/param-list';
import {ChangePasswordScreen, LoginScreen, SignupScreen} from '@screens';
import React from 'react';

interface IProps {}

const {Navigator, Screen} = createNativeStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => {
  return (
    <Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
      <Screen name={'Login'} component={LoginScreen} />
      <Screen name={'ChangePassword'} component={ChangePasswordScreen} />
      <Screen name={'Signup'} component={SignupScreen} />
    </Navigator>
  );
};

export default AuthNav;
