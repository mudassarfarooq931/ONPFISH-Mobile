import {colors, fonts} from '@constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.black,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_REGULAR,
    color: colors.black,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.border,

    ///////////---shadow---///////////
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  card: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: colors.yellow_lighter,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',

    ///////////---shadow---///////////
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  labelWrapper: {
    flex: 1.5,
  },
  valuesWrapper: {
    flex: 2,
  },
  label: {
    fontFamily: fonts.POPPINS_MEDIUM,
    color: colors.black,
    fontSize: 15,
  },
  value: {
    fontFamily: fonts.POPPINS_REGULAR,
    color: colors.black,
    fontSize: 14,
  },
  flex1: {flex: 1},
  password: {
    paddingTop: 2,
    color: colors.primary,
  },
});
