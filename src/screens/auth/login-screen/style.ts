import {colors, fonts} from '@constants';
import {HelperService} from '@services';
import {StyleSheet} from 'react-native';
const isMobile = HelperService.getInstance().getIsDeviceMobile();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: isMobile ? 16 : 28,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: fonts.MONTSERRAT_BOLD,
    color: colors.black,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
  },
  inputIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
  },
  linkLabel1: {
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    fontSize: isMobile ? 14 : 16,
    color: colors.black,
  },
  linkLabel2: {
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: isMobile ? 14 : 18,
    color: colors.primary,
  },
});
