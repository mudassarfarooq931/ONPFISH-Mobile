import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@redux/store';
import {MainNavParamList} from '@routes/param-list';
import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import BottomTabNav from './bottom-tabs.routes';

const mapStateToProps = (state: RootState) => {
  return {};
};

const {Navigator, Screen} = createNativeStackNavigator<MainNavParamList>();
const MainNav = memo(() => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Navigator
      initialRouteName={'BottomTabNav'}
      screenOptions={{headerShown: false}}>
      <Screen name="BottomTabNav" component={BottomTabNav} />
    </Navigator>
  );
});

export default connect(mapStateToProps)(MainNav);
