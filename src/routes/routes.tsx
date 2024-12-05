import {ToastView} from '@components';
import {colors} from '@constants';
import {NavigationContainer} from '@react-navigation/native';
import {RootState} from '@redux/store';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {isReadyRef, navigationRef, routeNameRef} from '../../navigation-helper';
import AuthNav from './auth/auth.routes';
import MainDrawerNav from './main/drawer-nav.routes';

interface IProps {
  isLogined: string;
  toast: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    isLogined: state.auth.isLogined,
    toast: state.toast.message,
  };
};

//-----------------------------------------
const Routes: React.FC<IProps> = ({isLogined, toast}: IProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current =
            navigationRef?.current?.getCurrentRoute()?.name;
          isReadyRef.current = true;
        }}>
        {toast && <ToastView />}
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <SafeAreaView style={{backgroundColor: colors.primary}} />
        <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
          {isLogined ? (
            <>
              <MainDrawerNav />
            </>
          ) : (
            <AuthNav />
          )}
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default connect(mapStateToProps)(Routes);
