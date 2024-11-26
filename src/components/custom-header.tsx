import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {colors} from '@constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../../root-navigation';

interface IProps {
  title?: string;
}

const CustomHeader = memo(({title}: IProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => goBack()}>
        <Ionicons name="arrow-back-sharp" color={colors.white} size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
