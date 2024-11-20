import {colors, fonts} from '@constants';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps {
  title?: string;
  onPress?: () => void;
}

const PrimaryHeader = memo(({title, onPress}: IProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="menu" color={colors.white} size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.MONTSERRAT_BOLD,
    flex: 1,
    textAlign: 'center',
  },
});
