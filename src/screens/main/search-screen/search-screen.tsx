import {PrimaryHeader} from '@components';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigationRef} from '../../../../navigation-helper';
import {DrawerActions} from '@react-navigation/native';
import {navigate} from '../../../../root-navigation';
import {ScreenEnum} from '@constants';
import {RootState} from '@redux/store';
import {useSelector} from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [viewType, setViewType] = useState<'card' | 'list'>('card');
  const [activeTab, setActiveTab] = useState('All');

  const {totalDataIdentity, totalDataWeight} = useSelector(
    (state: RootState) => state.weight,
  );

  const IdentityData = totalDataIdentity.map((identity: any) => {
    return {
      id: identity.id,
      names: identity.names,
      timestamp: identity.timestamp,
    };
  });
  const weightDataArray = Object.entries(totalDataWeight).map(
    ([id, data]: any) => ({
      id, // ID from the key
      estimatedWeight: data.weightData?.estimated_crate_weight || null, // Weight data
    }),
  );

  // Random data for the list
  const data = [
    {
      id: '1',
      name: "Abalone, Ass's Ear",
      image: 'https://via.placeholder.com/150',
    },
    {id: '2', name: 'Alewife', image: 'https://via.placeholder.com/150'},
    {
      id: '3',
      name: 'Amberjack, Greater',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Amberjack, Lesser',
      image: 'https://via.placeholder.com/150',
    },
    {id: '5', name: 'Anchovy, Bay', image: 'https://via.placeholder.com/150'},
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const onPress = () => {
    navigate(ScreenEnum?.FishDetails);
  };
  console.log('totalDataWeight', totalDataWeight);
  console.log('totalDataIdentity', totalDataIdentity);
  const renderCardView = ({item}: {item: (typeof totalDataIdentity)[0]}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.idText}>ID: {item.id}</Text>
        {item?.names && (
          <Text style={styles.namesText}>Names: {item?.names.join(',')}</Text>
        )}

        {item?.estimatedWeight && (
          <Text style={styles.namesText}>Weight: {item?.estimatedWeight}</Text>
        )}
      </View>
    );
  };
  const renderCardView1 = ({item}: {item: (typeof weightDataArray)[0]}) => {
    return (
      <View style={styles.card}>
        <Text style={styles.idText}>ID: {item.id}</Text>

        {item?.estimatedWeight && (
          <Text style={styles.namesText}>Weight: {item?.estimatedWeight}</Text>
        )}
      </View>
    );
  };

  // const renderListView = ({item}: {item: (typeof data)[0]}) => (
  //   <TouchableOpacity style={styles.listItem} onPress={onPress}>
  //     <Image source={{uri: item.image}} style={styles.listImage} />
  //     <Text style={styles.listText}>{item.name}</Text>
  //   </TouchableOpacity>
  // );
  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };
  return (
    <>
      <PrimaryHeader
        title="Search"
        onPress={openDrawer}
        style={{paddingRight: 35}}
      />
      <View style={styles.container}>
        {/* Search Bar */}
        {/* <View style={styles.searchBar}>
          <Icon
            name="search-outline"
            size={20}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View> */}
        {/* Heading and View Toggle */}
        {/* <Text style={styles.heading}>Search Species</Text> */}
        <Text style={styles.heading}>Names</Text>
        {/* Tabs */}
        {/* <View style={styles.tabs}>
          {['Local', 'Favorites', 'All'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
        {/* List */}
        <FlatList
          data={IdentityData}
          keyExtractor={item => item.id}
          renderItem={renderCardView}
          numColumns={viewType === 'card' ? 1 : 2}
          key={'card'} // Re-renders FlatList when viewType changes
          contentContainerStyle={styles.listContainer}
        />
        <Text style={styles.heading2}>Weight Species</Text>
        <FlatList
          data={weightDataArray}
          keyExtractor={item => item.id}
          renderItem={renderCardView1}
          numColumns={viewType === 'card' ? 1 : 2}
          key={'card'} // Re-renders FlatList when viewType changes
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  icon: {marginRight: 8},
  input: {flex: 1, fontSize: 16, height: 48, borderRadius: 10},
  header: {
    //flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  heading: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',

    marginHorizontal: 20,
  },
  heading2: {fontSize: 20, fontWeight: 'bold', marginHorizontal: 20},
  iconButtons: {flexDirection: 'row', gap: 10},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  idText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  namesText: {
    fontSize: 12,
    textAlign: 'center',
  },
  tab: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {backgroundColor: 'red'},
  tabText: {fontSize: 14, color: '#000'},
  activeTabText: {color: '#fff'},
  listContainer: {padding: 10},
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    // overflow: 'hidden',
    alignItems: 'center',
  },
  image: {height: 100, width: '100%'},
  cardText: {padding: 10, fontSize: 14, textAlign: 'center'},
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  listImage: {height: 50, width: 50, marginRight: 10, borderRadius: 8},
  listText: {fontSize: 16},
});

export default SearchScreen;
