import {colors, fonts} from '@constants';
import {HelperService} from '@services';
import {StyleSheet} from 'react-native';
const isMobile = HelperService.getInstance().getIsDeviceMobile();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 20,
  },
  description: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    // flex: 1,
    backgroundColor: colors.primary,
    // paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  signupButtonText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
