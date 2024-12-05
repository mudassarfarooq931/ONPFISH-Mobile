import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import database from '@react-native-firebase/database';
import {LoginPayload} from '@app-types/request-payload';

interface LoginResponse {
  userCredential: FirebaseAuthTypes.UserCredential;
  name: string;
  uid: string;
  email?: string;
  role?: string;
}
export const handleLogin = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await auth().signInWithEmailAndPassword(
        payload?.email,
        payload?.password,
      );

      const userSnapshot = await database()
        .ref(`users/${response.user.uid}`)
        .once('value');

      const userData = userSnapshot.val();

      if (userData) {
        const {name, uid, role, email} = userData;

        return {userCredential: response, name, uid, role, email};
      } else {
        throw new Error('User data not found');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Invalid email or password. Please try again.');
      return rejectWithValue(error.message);
    }
  },
);
