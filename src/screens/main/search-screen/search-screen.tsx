import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {CustomHeader} from '@components';
import {colors, ScreenEnum} from '@constants';
import {RootState} from '@redux/store';
import {getCurrentRoute, navigate} from '../../../../root-navigation';
import database from '@react-native-firebase/database';
import {
  deleteIdentifyData,
  deleteWeightData,
} from '@redux/slice/main/dashboard-slice';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const searchRoute = getCurrentRoute()?.name;

  const {totalDataIdentity, totalDataWeight} = useSelector(
    (state: RootState) => state.weight,
  );
  const {uid} = useSelector((state: RootState) => state.auth.userData);

  const IdentityData = totalDataIdentity.map((identity: any) => ({
    id: identity.id,
    names: identity.names,
    timestamp: identity.timestamp,
  }));

  const weightDataArray = Object.entries(totalDataWeight).map(
    ([id, data]: any) => ({
      id,
      estimatedWeight: data.weightData?.estimated_crate_weight || null,
    }),
  );

  const filteredIdentityData = IdentityData.filter((item: any) =>
    item.names?.join(',').toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredWeightData = weightDataArray.filter(item =>
    item.estimatedWeight
      ?.toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const handleDelete = (id: string, type: 'identify' | 'weight') => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const path =
            type === 'identify'
              ? `identify/${uid}/${id}`
              : `weight/${uid}/${id}`;
          database()
            .ref(`fishes/${path}`)
            .remove()
            .then(() => {
              dispatch(
                type === 'identify'
                  ? deleteIdentifyData(id)
                  : deleteWeightData(id),
              );
            })
            .catch(error =>
              console.error(`Error deleting item with ID ${id}:`, error),
            );
        },
      },
    ]);
  };

  const renderCardView = ({item}: {item: (typeof totalDataIdentity)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate(ScreenEnum?.FishDetails, {identifyitem: item, searchRoute})
      }>
      <View style={styles.cardHeader}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id, 'identify')}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {item?.names && (
        <Text style={styles.namesText}>Names: {item?.names.join(', ')}</Text>
      )}
    </TouchableOpacity>
  );

  const renderCardView1 = ({item}: {item: (typeof weightDataArray)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigate(ScreenEnum?.FishDetails, {weightItem: item, searchRoute})
      }>
      <View style={styles.cardHeader}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id, 'weight')}>
          <Icon name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
      {item?.estimatedWeight && (
        <Text style={styles.namesText}>Weight: {item.estimatedWeight}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <CustomHeader title="Search" />
      <View style={styles.container}>
        <TextInput
          placeholderTextColor={colors.black}
          style={styles.searchBar}
          placeholder="Search by name or weight..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <View style={styles.sectionContainer}>
          <View style={styles.section}>
            <Text style={styles.heading}>Fishes Names</Text>
            {filteredIdentityData.length > 0 ? (
              <FlatList
                data={filteredIdentityData}
                keyExtractor={item => item.id}
                renderItem={renderCardView}
                numColumns={1}
                contentContainerStyle={styles.listContainer}
              />
            ) : (
              <Text style={styles.noDataText}>
                No data found for fishes names.
              </Text>
            )}
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Fish Weight Species</Text>
            {filteredWeightData.length > 0 ? (
              <FlatList
                data={filteredWeightData}
                keyExtractor={item => item.id}
                renderItem={renderCardView1}
                numColumns={1}
                contentContainerStyle={styles.listContainer}
              />
            ) : (
              <Text style={styles.noDataText}>
                No data found for fish weight.
              </Text>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  searchBar: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    fontSize: 16,
    height: 50,
    color: colors.black,
  },
  sectionContainer: {flex: 1, flexDirection: 'column'},
  section: {flex: 1, paddingHorizontal: 20},
  heading: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  card: {
    flex: 1,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idText: {fontSize: 18, fontWeight: 'bold', color: colors.black},
  namesText: {fontSize: 16, fontWeight: 'bold', color: colors.black},
  listContainer: {padding: 10},
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SearchScreen;
