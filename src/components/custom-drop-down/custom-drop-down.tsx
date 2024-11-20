import {colors, fonts} from '@constants';
import React, {useState} from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

type PickerItem = {
  label: string;
  value: string;
};

type DropDownProps = {
  style?: StyleProp<ViewStyle>;
  items: Array<PickerItem>;
  placeholder: string;
  isReset?: boolean;
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  listItemContainerStyle?: StyleProp<ViewStyle>;
  dropDownStyle?: StyleProp<ViewStyle>;
  selectedValue?: any;
  setSelectedValue?: any;
  onValueChange: (item: ItemType<any>) => void;
  placeholderStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  searchable: boolean;
};

const CustomDropDown: React.FC<DropDownProps> = ({
  style,
  items,
  placeholder,
  onValueChange,
  dropDownStyle,
  selectedValue,
  setSelectedValue,
  isReset,
  placeholderStyle,
  textStyle,
  searchable,
  dropDownContainerStyle,
  listItemContainerStyle,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <View
      style={[
        Platform.OS === 'ios'
          ? styles.dropDownIOSContainer
          : styles.dropDownAndroidContainer,
        style,
      ]}>
      <DropDownPicker
        listMode={'SCROLLVIEW'}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        closeOnBackPressed={true}
        closeAfterSelecting={true}
        searchable={searchable}
        autoScroll={true}
        items={items}
        searchPlaceholder={'Search...'}
        searchContainerStyle={{height: 35, padding: 0}}
        searchTextInputStyle={{
          borderWidth: 0,
        }}
        open={dropdownOpen}
        value={isReset ? placeholder : selectedValue}
        setValue={setSelectedValue}
        setOpen={setDropdownOpen}
        onSelectItem={onValueChange}
        placeholder={placeholder}
        containerStyle={{minHeight: 35}}
        style={[dropDownStyle, {zIndex: 1000}]}
        placeholderStyle={placeholderStyle ?? null}
        textStyle={textStyle ?? null}
        dropDownContainerStyle={{
          borderColor: colors.lighterGray,
          position: 'relative', // to fix scroll issue ... it is by default 'absolute'
          top: 0, //to fix gap between label box and container
        }}
        listItemContainerStyle={listItemContainerStyle ?? null}
      />
    </View>
  );
};

export {CustomDropDown};

const styles = StyleSheet.create({
  dropDownIOSContainer: {
    zIndex: 1,
  },
  dropDownAndroidContainer: {},
});
