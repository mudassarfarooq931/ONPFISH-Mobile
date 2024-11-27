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

const screenWidth = Dimensions.get('window').width;

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [viewType, setViewType] = useState<'card' | 'list'>('card');
  const [activeTab, setActiveTab] = useState('All');

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
  const renderCardView = ({item}: {item: (typeof data)[0]}) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.image} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderListView = ({item}: {item: (typeof data)[0]}) => (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Image source={{uri: item.image}} style={styles.listImage} />
      <Text style={styles.listText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };
  return (
    <>
      <PrimaryHeader title="Search" onPress={openDrawer} />
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
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
        </View>

        {/* Heading and View Toggle */}
        <View style={styles.header}>
          <Text style={styles.heading}>Search Species</Text>
          <View style={styles.iconButtons}>
            <TouchableOpacity onPress={() => setViewType('card')}>
              <Icon
                name="grid-outline"
                size={24}
                color={viewType === 'card' ? 'red' : 'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewType('list')}>
              <Icon
                name="list-outline"
                size={24}
                color={viewType === 'list' ? 'red' : 'black'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
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
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={viewType === 'card' ? renderCardView : renderListView}
          numColumns={viewType === 'card' ? 2 : 1}
          key={viewType} // Re-renders FlatList when viewType changes
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
  input: {flex: 1, fontSize: 16},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  heading: {fontSize: 20, fontWeight: 'bold'},
  iconButtons: {flexDirection: 'row', gap: 10},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
    overflow: 'hidden',
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
