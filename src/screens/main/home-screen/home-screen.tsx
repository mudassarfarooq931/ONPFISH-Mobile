import {CustomInput, PrimaryHeader} from '@components';
import {colors, ScreenEnum} from '@constants';
import {DrawerActions, useRoute} from '@react-navigation/native';
import {RootState} from '@redux/store';
import React, {memo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect, useSelector} from 'react-redux';
import {navigationRef} from '../../../../navigation-helper';
import {navigate} from '../../../../root-navigation';
import {weightData} from '@redux/slice/main/dashboard-slice';

interface FishData {
  id: string;
  name: string;
}
interface weightdata {
  weightdata: any;
}

interface IProps {
  userData: any;
  data: FishData[];
  weightdata: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    userData: state.auth.userData,
    data: state.weight.data,
    weightdata: state.weight.weightdata,
  };
};

const HomeScreen = memo(({data, weightdata}: IProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const route = useRoute();

  console.log(data, 'usama');
  console.log(weightdata, 'weightdata');

  const renderItem = ({item}: {item: any}) => {
    return <ItemView item={item} isIdentity={true}></ItemView>;
  };

  const ItemView = ({item, isIdentity}: {item: any; isIdentity: boolean}) => {
    console.log('item ', item);
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigate(ScreenEnum?.FishDetails, {
            item,
            weightdata,
          })
        }>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Icon name="fish" color={colors.primary} size={40} />
        </View>
        <View style={{flex: 1}}>
          {isIdentity && <IdentityView item={item} />}
          {!isIdentity && <WeightView />}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Icon name="arrow-forward" color={colors.primary} size={30} />
        </View>
      </TouchableOpacity>
    );
  };

  const WeightView = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.itemText}>
          Estimated Weight: {weightdata.estimated_crate_weight} kg
        </Text>
      </View>
    );
  };
  const IdentityView = ({item}: any) => {
    return (
      <View style={{flex: 1}}>
        <>
          <Text style={styles.itemText}>ID: {item.id}</Text>
          <Text style={styles.itemText}>Name: {item.name}</Text>
        </>
      </View>
    );
  };

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <PrimaryHeader
        title="Home"
        onPress={openDrawer}
        style={{paddingRight: 40}}
      />
      <CustomInput
        placeholder="Search items here"
        value={searchText}
        onChangeText={setSearchText}
      />
      {typeof route.params == 'string' && route.params == 'identity' && (
        <FlatList
          // data={data.filter(
          //   (item: any) => {},
          //   //item.name.toLowerCase().includes(searchText.toLowerCase()),
          // )}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
      {typeof route.params == 'string' && route.params == 'weight' && (
        <ItemView item={null} isIdentity={false} />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 6,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    color: colors.black,
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#FFFFFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  welcomeText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  emailText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,

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
  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps)(HomeScreen);
