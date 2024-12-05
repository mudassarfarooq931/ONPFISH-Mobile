import ProgressDialog from '@components/progress-dialog';
import {colors, ScreenEnum} from '@constants';
import {DrawerItem} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerActions} from '@react-navigation/native';
import {Logout} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import React, {memo} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionInfo from 'react-native-version-info';
import {connect, useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../../root-navigation';
import styles from './styles';
import {clearWeightData} from '@redux/slice/main/dashboard-slice';

//-----------------------------
interface IDrawerContentProps {
  navigation: DrawerNavigationHelpers;
}
interface IProps {
  navigation: DrawerNavigationHelpers;
  userData: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    userData: state.auth.userData,
  };
};
//-----------------------------------------------------------------
const Drawer = memo(({navigation, userData}: IProps) => {
  const dispatch = useDispatch();
  const {isLogined, loading, error} = useSelector(
    (state: RootState) => state.auth,
  );
  const logout = () => {
    navigation?.dispatch(DrawerActions.closeDrawer());
    dispatch(Logout({undefined}));
  };

  const onEditProfile = () => {
    navigate(ScreenEnum?.Profile);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <ProgressDialog visible={loading} />}
      <View style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarWrapper}>
            {/* <CustomImage
              imageStyles={styles.avatar}
              url={
                'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
            /> */}
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.userName}>{userData?.name}</Text>
            <Text style={styles.role}>{userData?.email}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={{paddingStart: 10}}>
          <DrawerItem
            inactiveTintColor={colors.primary}
            label={({focused, color}) => {
              return (
                <View style={styles.drawerItemContainer}>
                  <Text style={styles.itemText}>Profile</Text>
                </View>
              );
            }}
            icon={({color, size}) => (
              <TouchableOpacity onPress={onEditProfile}>
                <FontAwesome
                  name="user-circle-o"
                  color={colors.white}
                  size={size}
                />
              </TouchableOpacity>
            )}
            onPress={onEditProfile}
          />
          <DrawerItem
            inactiveTintColor={colors.primary}
            label={({focused, color}) => {
              return (
                <View style={styles.drawerItemContainer}>
                  <Text style={styles.itemText}>Logout</Text>
                </View>
              );
            }}
            icon={({color, size}) => (
              <TouchableOpacity onPress={logout}>
                <MaterialCommunityIcons
                  name="logout"
                  color={colors.white}
                  size={size}
                />
              </TouchableOpacity>
            )}
            onPress={logout}
          />
        </View>
      </View>
      <Text style={styles.caption}>Version {VersionInfo.appVersion}</Text>
      <ProgressDialog visible={false} />
    </SafeAreaView>
  );
});

export default connect(mapStateToProps)(Drawer);
