import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {colors} from '@constants';
import {CustomHeader} from '@components';

const FishDetailsScreen = ({route}: any) => {
  // const {item, weightItem, homeRoute, searchRoute, identifyitem, weightdata} =route?.params;
  const {item, weightdata, isIdentity, identifyitem, weightItem} =
    route?.params;

  return (
    <>
      <CustomHeader title="Fish Details" />
      <ScrollView style={styles.container}>
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
          <View style={styles.image} />

          <View style={styles.detailsContainer}>
            {item && isIdentity && (
              <>
                <View style={styles.detailRow}>
                  <>
                    <Text style={styles.detailName}>ID:{item?.id}</Text>
                  </>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailName}>Name:{item?.name}</Text>
                </View>
              </>
            )}
            {identifyitem && weightItem === undefined && (
              <>
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailName}>ID:{identifyitem.id}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailName}>
                      Name:{identifyitem.names}
                    </Text>
                  </View>
                </>
              </>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <>
              {item === null && isIdentity === false && weightdata && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailName}>
                    Estimated Weight:{weightdata?.estimated_crate_weight}
                  </Text>

                  <Text style={styles.detailValue}>kg</Text>
                </View>
              )}
            </>

            <>
              {identifyitem === undefined && weightItem && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailName}>ID:{weightItem?.id}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailName}>
                      Weight:{weightItem?.estimatedWeight}
                    </Text>
                  </View>
                </>
              )}
            </>
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
