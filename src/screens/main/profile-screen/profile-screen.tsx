import {ButtonPrimary, PrimaryHeader} from '@components';
import {colors, fonts} from '@constants';
import {DrawerActions} from '@react-navigation/native';
import {Logout} from '@redux/slice/auth/auth-slice';
import {RootState} from '@redux/store';
import React, {memo, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import {navigationRef} from '../../../../navigation-helper';

interface IProps {
  uid: string;
  email: string;
  role: string;
  fullName: string;
  userData: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    uid: state.auth.uid,
    email: state.auth.email,
    role: state.auth.role,
    fullName: state.auth.fullName,
    userData: state.auth.userData,
  };
};
const ProfileScreen = memo(({userData}: IProps) => {
  const {name, email, role, uid} = userData;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  const handleLogout = () => {
    dispatch(Logout({undefined}));
  };

  return (
    <>
      <PrimaryHeader
        onPress={openDrawer}
        title="Profile"
        style={{paddingRight: 30}}
      />
      <View style={styles.container}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: ' userData.profileImage'}}
            style={styles.profileImage}
          />
        </View>
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{role}</Text>
        </View>

        <ButtonPrimary
          title="Logout"
          onPress={handleLogout}
          style={{marginHorizontal: 10}}
        />
      </View>
    </>
  );
});

export default connect(mapStateToProps)(ProfileScreen);

//----------------------------------------------
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    marginVertical: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    borderWidth: 1,
    borderColor: colors.black,
    height: 130,
    width: 130,
    borderRadius: 65,
    backgroundColor: '#dcdcdc', // Placeholder background
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 5,
    fontFamily: fonts.MONTSERRAT_SEMIBOLD,
  },
  value: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 15,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
});
