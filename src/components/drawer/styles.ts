import {colors, fonts} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: colors.headingDark},
  container: {
    flex: 1,
    paddingTop: height * 0.07,
    backgroundColor: colors.primary,
  },
  userInfoSection: {
    paddingStart: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  line: {
    height: 0.5,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  userName: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_BOLD,
    paddingLeft: 10,
    paddingRight: 5,
  },
  role: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    paddingLeft: 10,
  },
  avatarWrapper: {
    backgroundColor: colors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 60,
  },
  title: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    width: '80%',
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
    width: 110,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  caption: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.MONTSERRAT_BOLD,
    paddingVertical: 10,
    backgroundColor: colors.primary,
  },
});

export default styles;
