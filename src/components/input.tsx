import {colors, fonts} from '@constants';
import {HelperService} from '@services';
import React from 'react';
import {
  KeyboardType,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
let isMobile = HelperService.getInstance().getIsDeviceMobile();

//---------------------
interface IInputProps {
  props?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
  children?: JSX.Element;
  fromChatScreen?: boolean;
  placeholder?: string;
  multiLine?: boolean;
  value: string;
  textStyle?: StyleProp<TextStyle>;
  secure?: boolean;
  placeholderTextColor?: string;
  editable?: boolean;
  keyboardType?: KeyboardType;
}

//-------------------------------------
const Input: React.FC<IInputProps> = ({
  style,
  props,
  children,
  multiLine,
  value,
  placeholder,
  placeholderTextColor,
  textStyle = {},
  onChangeText = () => {},
  secure = false,
  editable = true,
  keyboardType = 'default',
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        {...props}
        secureTextEntry={secure}
        style={[
          styles.input,
          {
            textAlignVertical: 'center',
            paddingVertical: Platform.OS === 'ios' ? 2.5 : 5,
          },
          textStyle,
        ]}
        placeholderTextColor={colors.gray}
        selectionColor={colors.gray}
        multiline={multiLine}
        placeholder={placeholder ?? 'Type here ...'}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
      />
      {children}
    </View>
  );
};

export default Input;

//--------------------------------
const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',

    // ///////////---shadow---///////////
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 2,
  },
  input: {
    paddingHorizontal: 0,
    fontFamily: fonts.MONTSERRAT_MEDIUM,
    color: colors.black,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: 'center',
  },
});
