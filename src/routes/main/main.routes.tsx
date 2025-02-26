import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootState} from '@redux/store';
import {MainNavParamList} from '@routes/param-list';
import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import BottomTabNav from './bottom-tabs.routes';
import {FishDetailsScreen, SearchScreen} from '@screens';
import {ToastView} from '@components';

const mapStateToProps = (state: RootState) => {
  return {};
};

const {Navigator, Screen} = createNativeStackNavigator<MainNavParamList>();
const MainNav = memo(() => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Navigator
        initialRouteName={'BottomTabNav'}
        screenOptions={{headerShown: false}}>
        <Screen name="BottomTabNav" component={BottomTabNav} />
        <Screen name="FishDetails" component={FishDetailsScreen} />
        <Screen name="Search" component={SearchScreen} />
      </Navigator>
      <ToastView />
    </>
  );
});

export default connect(mapStateToProps)(MainNav);
