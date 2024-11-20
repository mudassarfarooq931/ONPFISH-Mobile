import {CustomInput, PrimaryHeader} from '@components';
import {DrawerActions} from '@react-navigation/native';
import {RootState} from '@redux/store';
import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {navigationRef} from '../../../../navigation-helper';
import {View} from 'react-native';
import {colors} from '@constants';

//----------------------------------------------
interface IProps {}

//----------------------------------------------
const mapStateToProps = (state: RootState) => {
  return {};
};

const HomeScreen = memo(({}: IProps) => {
  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{flex: 1}}>
      <PrimaryHeader onPress={openDrawer} title="Home" />
    </View>
  );
});
export default connect(mapStateToProps)(HomeScreen);
