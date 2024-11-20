import {colors, fonts} from '@constants';
import {HelperService} from '@services';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
let isMobile = HelperService.getInstance().getIsDeviceMobile();

//----------------------
interface IButtonProps {
  onPress?: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

//----------------------------------------------------------------------------
const ButtonPrimary: React.FC<IButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      style={[
        styles.container,
        disabled && {backgroundColor: colors.gray},
        style,
      ]}
      onPress={() => onPress && onPress()}>
      <Text style={[styles.title, disabled && {color: colors.gray}, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primary,

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
  title: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.MONTSERRAT_BOLD,
    fontSize: isMobile ? 14 : 18,
  },
});
