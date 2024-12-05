import {SignupUserPayload} from '@app-types/request-payload';
import {ScreenEnum} from '@constants';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {navigate} from '../../../../../root-navigation';

export const SignupUser = createAsyncThunk<any, SignupUserPayload>(
  'signup',
  async (payload, {rejectWithValue}) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        payload?.email,
        payload.password,
      );

      const userId = response?.user?.uid;

      if (userId) {
        const obj = {
          name: payload?.fullName,
          email: payload.email,
          role: payload?.role,
          uid: userId,
        };

        const userRef = database().ref(`users/${response?.user?.uid}`);
        userRef.set(obj).then(res => {
          navigate(ScreenEnum?.Login);
        });
      }

      if (response) {
      }
      return response;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
      }

      if (error.code === 'auth/invalid-email') {
      }
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);
