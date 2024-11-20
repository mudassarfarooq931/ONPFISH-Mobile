import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

interface DashboardState {
  data: Array<{id: string; name: string}>;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: [],
  loading: false,
  error: null,
};

export const uploadDataToFirebase = createAsyncThunk(
  'dashboard/uploadData',
  async (
    {uid, data}: {uid: string; data: {id: string; name: string}},
    {rejectWithValue},
  ) => {
    try {
      await database().ref(`/users/${uid}/items/${data.id}`).set(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Async thunk to fetch data for the logged-in user
export const fetchDataFromFirebase = createAsyncThunk(
  'dashboard/fetchData',
  async (uid: string, {rejectWithValue}) => {
    try {
      const snapshot = await database()
        .ref(`/users/${uid}/items`)
        .once('value');
      const data = snapshot.val();
      if (data) {
        return Object.keys(data).map(key => ({id: key, name: data[key].name}));
      }
      return [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearData: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadDataToFirebase.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDataToFirebase.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.data.push(payload);
      })
      .addCase(uploadDataToFirebase.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(fetchDataFromFirebase.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataFromFirebase.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchDataFromFirebase.rejected, (state, {payload}) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

const dashboardReducer = dashboardSlice.reducer;
export const {clearData} = dashboardSlice.actions;
export default dashboardReducer;
