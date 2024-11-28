import React, {memo, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect, useDispatch, useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
import {PrimaryHeader, ProgressDialog} from '@components';
import {colors, ScreenEnum} from '@constants';
import database from '@react-native-firebase/database';
import {DrawerActions} from '@react-navigation/native';
import {
  clearWeightData,
  nameData,
  totalDataWeight,
  totalDataIdentity,
  weightData,
} from '@redux/slice/main/dashboard-slice';
import {RootState} from '@redux/store';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigationRef} from '../../../../navigation-helper';

import {navigate} from '../../../../root-navigation';
interface IProps {
  userData: any;
}

const mapStateToProps = (state: RootState) => {
  return {
    userData: state.auth.userData,
    data: state.weight.data,
  };
};

const staticData = [
  {id: 1, title: 'Identify', icon: 'fish', screen: 'IdentifyScreen'},
  {id: 2, title: 'Search', icon: 'magnify', screen: 'SearchScreen'},
  {id: 3, title: 'Weight', icon: 'calendar', screen: 'CatchLogScreen'},
  {id: 4, title: 'Weather', icon: 'weather-sunny', screen: 'WeatherScreen'},
  {id: 5, title: 'Location', icon: 'map-marker', screen: 'LocationScreen'},
  {
    id: 6,
    title: 'Licenses & Permits',
    icon: 'card-text',
    screen: 'LicenseScreen',
  },
  {id: 7, title: 'Blog', icon: 'chat', screen: 'BlogScreen'},
  {id: 9, title: 'Get Help', icon: 'help-circle', screen: 'HelpScreen'},
  {id: 10, title: 'More', icon: 'dots-horizontal', screen: 'MoreScreen'},
];
const DashboardScreen = memo(({userData}: IProps) => {
  const renderItemDashboard = ({item}: {item: (typeof data)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        console.log('helloo');
        if (item?.title === 'Identify') {
          setModalVisible(true);
        } else if (item?.title === 'Search') {
          console.log('..hit...');
          navigate(ScreenEnum?.Search);
        } else if (item?.title === 'Weight') {
          setModal(true);
          console.log('..hit...');
        }
      }}>
      <Icon name={item.icon} size={40} color={colors.primary} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImage1, setSelectedImage1] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {data} = useSelector((state: RootState) => state.weight);

  useEffect(() => {
    return () => {
      dispatch(clearWeightData([]));
    };
  }, []);

  const fetchReduxData = () => {
    database()
      .ref(`/fishes/identify/${userData.uid}`)
      .once('value')
      .then(snapshot => {
        const firebaseData = snapshot.val();
        console.log(firebaseData, 'firebaseData');

        const sortedKeys = Object.keys(firebaseData).sort(
          (a, b) =>
            (firebaseData[b].timestamp || 0) - (firebaseData[a].timestamp || 0),
        );
        console.log(sortedKeys, 'sortedKeys');

        const recentId: any = sortedKeys.shift();
        console.log(recentId, 'recentId');

        const recentData = firebaseData[recentId];

        console.log(recentData, 'recentData');
        const listData = recentData.names.map(
          (name: string, index: string) => ({
            id: index.toString(),
            name,
          }),
        );
        console.log(listData, 'listData');

        const names = Object.values(firebaseData)
          .filter((item: any) => item.names && Array.isArray(item.names))
          .flatMap((item: any) => item.names);

        console.log('names', names);
        dispatch(nameData(listData));

        if (firebaseData) {
          const alldata = Object.keys(firebaseData).map(key => ({
            id: key,
            ...firebaseData[key],
          }));
          console.log(alldata, 'alldata');
          dispatch(totalDataIdentity(alldata));
        }

        // .catch(err => {
        //   console.error('Firebase Fetch Error:', err);
        //   Alert.alert('Error', 'Failed to fetch data from Firebase.');
        // })
        // .finally(() => setLoading(false)
      });
  };

  const handleImageSelection = async (imagePath: string) => {
    try {
      setLoading(true);
      const identifyResponse = await uploadImageToAPI(imagePath);
      // const weightResponse = await uploadImageToWeightAPI(imagePath);
      console.log(identifyResponse, 'identifyResponse');
      if (
        identifyResponse.success

        // && weightResponse.success
      ) {
        const formattedData = identifyResponse.data.map(
          fish => fish.name,
          //   ({
          //     // ...fish,
          //     // estimatedWeight: weightResponse.data.estimated_crate_weight, // Attach weight to each item
          //   }),
        );

        // const names = data.map(item => item.name);
        console.log(formattedData, 'formattedData');

        saveToFirebase(
          formattedData,
          //  /  weightResponse.data
        );
        fetchReduxData();

        // dispatch(weightData(formattedData));
      }
    } catch (error) {
      console.error('Image Handling Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleImageSelection1 = async (imagePath: string) => {
    try {
      setLoading(true);
      const weightResponse = await uploadImageToWeightAPI(imagePath);
      console.log('weightResponse', weightResponse);

      if (
        weightResponse.success

        // && weightResponse.success
      ) {
        const formattedData = weightResponse.data;

        console.log(formattedData, 'formattedData');

        saveToFirebaseWeight(formattedData);
        fetchReduxDataWeight();
      }
    } catch (error) {
      console.error('Image Handling Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchReduxDataWeight = () => {
    database()
      .ref(`/fishes/weight/${userData.uid}`)
      .once('value')
      .then(snapshot => {
        const firebaseData = snapshot.val();
        console.log(firebaseData, 'firebaseData');

        const sortedKeys = Object.keys(firebaseData).sort(
          (a, b) =>
            (firebaseData[b].timestamp || 0) - (firebaseData[a].timestamp || 0),
        );
        console.log(sortedKeys, 'sortedKeys');

        const recentId: any = sortedKeys.shift();
        const recentData = firebaseData[recentId].weightData;
        console.log(recentData, 'recentData');
        console.log(recentId, 'recentId');
        dispatch(weightData(recentData));
        dispatch(totalDataWeight(firebaseData));
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        setModalVisible(false);

        handleImageSelection(image.path);
      })
      .catch(err => console.error(err));
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
        setModal(false);
        handleImageSelection(image.path);
      })
      .catch(err => console.error(err));
  };

  const openCamera1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage1(image.path);
        setModal(false);
        handleImageSelection1(image.path);
      })
      .catch(err => console.error(err));
  };

  const openGallery1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage1(image.path);
        setModal(false);
        handleImageSelection1(image.path);
      })
      .catch(err => console.error(err));
  };

  const uploadImageToWeightAPI = async (imagePath: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imagePath,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(
        'https://7727771d44d4.ngrok.app/weight/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return {success: true, data: response.data};
    } catch (error) {
      console.error('Weight API Error:', error);
      Alert.alert('Error', 'Failed to upload image to Weight API.');
      return {success: false, data: []};
    }
  };
  const uploadImageToAPI = async (imagePath: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imagePath,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.post(
        'https://7727771d44d4.ngrok.app/identify/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const data = response.data;
      const formattedData = Object.keys(data)
        .filter(key => key !== 'total_fishes')
        .map(key => ({id: key, name: data[key].Name}));

      return {success: true, data: formattedData};
    } catch (error) {
      console.error('Identify API Error:', error);
      Alert.alert('Error', 'Failed to upload image to Identify API.');
      return {success: false, data: []};
    }
  };

  const saveToFirebase = (identifyData: any[]) => {
    // const data = {identifyData};
    database()
      .ref(`/fishes/identify/${userData.uid}`)
      .push()
      .set({names: identifyData, timestamp: Date.now()})
      .then(() =>
        Alert.alert(
          'Alert',
          'Success',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Alert button pressed');
                // Add your action here, e.g., navigate to another screen:
                navigate(ScreenEnum?.Home, 'identity'); // Replace 'Home' with your desired screen
              },
            },
          ],
          {cancelable: false}, // Prevent dismissing the alert by tapping outside
        ),
      )

      .catch(err => {
        console.error('Firebase Save Error:', err);
        Alert.alert('Error', 'Failed to save data to Firebase.');
      });
  };
  const saveToFirebaseWeight = (weightData: any) => {
    // const data = {weight: weightData};
    database()
      .ref(`/fishes/weight/${userData.uid}`)
      .push()
      .set({weightData, timestamp: Date.now()})
      .then(() =>
        Alert.alert(
          'Alert',
          'Success',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Alert button pressed');
                // Add your action here, e.g., navigate to another screen:
                navigate(ScreenEnum?.Home, 'weight'); // Replace 'Home' with your desired screen
              },
            },
          ],
          {cancelable: false}, // Prevent dismissing the alert by tapping outside
        ),
      )

      .catch(err => {
        console.error('Firebase Save Error:', err);
        Alert.alert('Error', 'Failed to save data to Firebase.');
      });
  };

  const renderItem = ({
    item,
  }: {
    item: {id: string; name: string; estimatedWeight?: number};
  }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigate(ScreenEnum?.FishDetails, {item})}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}>
        <Icon name="fish" color={colors.primary} size={40} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemText}>Name: {item.name}</Text>
        {item.estimatedWeight && (
          <Text style={styles.itemText}>
            Estimated Weight: {item.estimatedWeight} kg
          </Text>
        )}
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

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{flex: 1}}>
      {loading && <ProgressDialog visible={loading} />}
      <PrimaryHeader
        title="Dashboard"
        onPress={openDrawer}
        style={{paddingRight: 40}}
      />

      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileText}>M</Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.emailText}>{userData?.email}</Text>
          </View>
        </View>
      </View> */}

      {/* Grid Layout */}
      <FlatList
        data={staticData}
        renderItem={renderItemDashboard}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
      {modal && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModal(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openCamera1}>
                <Icon name="camera" size={24} color={colors.primary} />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery1}>
                <Icon name="image" size={24} color={colors.primary} />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {modalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalContainer}
            onPress={() => setModalVisible(false)}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
                <Icon name="camera" size={24} color={colors.primary} />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery}>
                <Icon name="image" size={24} color={colors.primary} />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
});

export default connect(mapStateToProps)(DashboardScreen);

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    color: colors.black,
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal: 10,
    paddingTop: 10,
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
