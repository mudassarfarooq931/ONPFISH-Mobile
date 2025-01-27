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
import {PrimaryHeader, ProgressDialog, ToastView} from '@components';
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
import {styles} from './style';
import {setToastMessage} from '@redux/slice/toast-slice';
interface IProps {
  userData: any;
  message: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    userData: state.auth.userData,
    data: state.weight.data,
    message: state.toast.message,
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
const DashboardScreen = memo(({userData, message}: IProps) => {
  const renderItemDashboard = ({item}: {item: (typeof data)[0]}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item?.title === 'Identify') {
          setModalVisible(true);
        } else if (item?.title === 'Search') {
          navigate(ScreenEnum?.Search);
        } else if (item?.title === 'Weight') {
          setModal(true);
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
    return () => {};
  }, []);

  const fetchReduxData = () => {
    database()
      .ref(`/fishes/identify/${userData.uid}`)
      .once('value')
      .then(snapshot => {
        const firebaseData = snapshot.val();

        const sortedKeys = Object.keys(firebaseData).sort(
          (a, b) =>
            (firebaseData[b].timestamp || 0) - (firebaseData[a].timestamp || 0),
        );

        const recentId: any = sortedKeys.shift();

        const recentData = firebaseData[recentId];

        const listData = recentData.names.map(
          (name: string, index: string) => ({
            id: index.toString(),
            name,
          }),
        );

        const names = Object.values(firebaseData)
          .filter((item: any) => item.names && Array.isArray(item.names))
          .flatMap((item: any) => item.names);

        dispatch(nameData(listData));

        if (firebaseData) {
          const alldata = Object.keys(firebaseData).map(key => ({
            id: key,
            ...firebaseData[key],
          }));

          dispatch(totalDataIdentity(alldata));
        }
      });
  };

  const handleImageSelection = async (imagePath: string) => {
    try {
      setLoading(true);
      const identifyResponse = await uploadImageToAPI(imagePath);
      if (identifyResponse?.data?.length > 0) {
        const formattedData = identifyResponse.data.map(fish => fish.name);
        saveToFirebase(formattedData);
        fetchReduxData();
      } else {
        setModalVisible(false);
        Alert.alert('No fish identified in the image.');
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

      if (weightResponse?.success) {
        const formattedData = weightResponse.data;
        saveToFirebaseWeight(formattedData);
        fetchReduxDataWeight();
      } else {
        setModal(false);
        Alert.alert('No fish Weight Detect in the image.');
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

        const sortedKeys = Object.keys(firebaseData).sort(
          (a, b) =>
            (firebaseData[b].timestamp || 0) - (firebaseData[a].timestamp || 0),
        );

        const recentId: any = sortedKeys.shift();
        const recentData = firebaseData[recentId].weightData;

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
        setModalVisible(false);
        setSelectedImage(image.path);
        handleImageSelection(image.path);
      })
      .catch(err => {
        setModalVisible(false);
      });
  };

  const openCamera1 = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setModal(false);
        setSelectedImage1(image.path);
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
        setModal(false);
        setSelectedImage1(image.path);
        handleImageSelection1(image.path);
      })
      .catch(err => {
        setModal(false);
        console.error(err);
      });
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
        'https://fish.ngrok.app/weight/',
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
        'https://fish.ngrok.app/identify/',
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
      .set({names: identifyData, timestamp: Date.now(), isDelete: false})
      .then(() =>
        Alert.alert(
          'Alert',
          'Identify Fish Successfully ',
          [
            {
              text: 'View',
              onPress: () => {
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
      .set({weightData, timestamp: Date.now(), isDelete: false})
      .then(() =>
        Alert.alert(
          'Alert',
          'Identify Weight Successfully',
          [
            {
              text: 'View',
              onPress: () => {
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

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      {loading && <ProgressDialog visible={loading} />}
      <PrimaryHeader
        title="Dashboard"
        onPress={openDrawer}
        style={{paddingRight: 40}}
      />

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
                <Icon name="camera" size={30} color={colors.primary} />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={openGallery}>
                <Icon name="image" size={30} color={colors.primary} />
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
