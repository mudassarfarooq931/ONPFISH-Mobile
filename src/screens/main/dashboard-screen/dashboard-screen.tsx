import {CustomInput, PrimaryHeader, ProgressDialog} from '@components';
import {colors} from '@constants';
import database from '@react-native-firebase/database'; // Import Firebase Realtime Database
import {DrawerActions} from '@react-navigation/native';
import axios from 'axios';
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
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {navigationRef} from '../../../../navigation-helper';

interface IProps {}

const DashboardScreen = memo(({}: IProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<any[]>([]); // State to hold response data
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setResponseData([]);
    };
  }, []);

  const fetchFirebaseData = () => {
    setLoading(true);
    database()
      .ref('/fishes') // Reference to the "fishes" node
      .once('value')
      .then(snapshot => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setResponseData(formattedData);
        } else {
          setResponseData([]);
        }
      })
      .catch(err => {
        console.error('Firebase Fetch Error:', err);
        Alert.alert('Error', 'Failed to fetch data from Firebase.');
      })
      .finally(() => setLoading(false));
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
        uploadImageToAPI(image.path); // Call the API after selecting the image
      })
      .catch(err => console.error(err));
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
    })
      .then(image => {
        setSelectedImage(image.path);
        setModalVisible(false);
        uploadImageToAPI(image.path);
      })
      .catch(err => console.error(err));
  };

  const uploadImageToAPI = async (imagePath: string) => {
    try {
      setLoading(true);
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
      console.log('Responsee======>', JSON.stringify(data, null, 2));
      const formattedData = Object.keys(data)
        .filter(key => key !== 'total_fishes')
        .map(key => ({id: key, name: data[key].Name}));

      setResponseData(formattedData);
      saveToFirebase(formattedData);
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Failed to upload image.');
    } finally {
      setLoading(false);
    }
  };

  const saveToFirebase = (data: any[]) => {
    database()
      .ref('/fishes')
      .set(data.reduce((acc, item) => ({...acc, [item.id]: item}), {}))
      .then(() => {
        Alert.alert('Success', 'Data saved to Firebase!');
      })
      .catch(err => {
        console.error('Firebase Save Error:', err);
        Alert.alert('Error', 'Failed to save data to Firebase.');
      });
  };

  const renderItem = ({item}: {item: {id: string; name: string}}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Name: {item.name}</Text>
    </View>
  );

  const openDrawer = () => {
    navigationRef.current.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={{flex: 1}}>
      <PrimaryHeader title="Dashboard" onPress={openDrawer} />
      <View style={{flex: 1, paddingTop: 15}}>
        <CustomInput
          placeholder="Search items here"
          value={searchText}
          onChangeText={setSearchText}
        />

        {loading && <ProgressDialog visible={loading} />}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={responseData.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase()),
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>

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
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={openCamera}>
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
    </View>
  );
});

export default DashboardScreen;

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
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 8,
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  itemContainer: {
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  itemText: {
    fontSize: 14,
    color: colors.black,
  },
  listContent: {
    paddingBottom: 80,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
