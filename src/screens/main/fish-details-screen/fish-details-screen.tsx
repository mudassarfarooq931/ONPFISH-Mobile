import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {colors} from '@constants';
import {CustomHeader} from '@components';

const FishDetailsScreen = ({route}: any) => {
  const {item} = route?.params;

  return (
    <>
      <CustomHeader title="Fish Details" />

      <ScrollView style={styles.container}>
        {/* Image Section */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 10,
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 2,
          }}>
          <Image source={{uri: item.image}} style={styles.image} />

          {/* Details Section */}
          <View style={styles.detailsContainer}>
            {/* <Text style={styles.titleText}>Fish Details</Text> */}

            {/* Display name and value in one line */}
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>ID:</Text>
              <Text style={styles.detailValue}>{item?.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailName}>Name:</Text>
              <Text style={styles.detailValue}>{item?.name}</Text>
            </View>
            {item?.estimatedWeight && (
              <View style={styles.detailRow}>
                <Text style={styles.detailName}>Estimated Weight:</Text>
                <Text style={styles.detailValue}>
                  {item?.estimatedWeight} kg
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default FishDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 16,
    backgroundColor: colors.gray, // Placeholder background color
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  detailName: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
