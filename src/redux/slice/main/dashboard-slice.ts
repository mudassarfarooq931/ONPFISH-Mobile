import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

interface WeightDashboardState {
  data: Array<{id: string; name: string}>;
  weightdata: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeightDashboardState = {
  data: [],
  weightdata: [],
  loading: false,
  error: null,
};

const weightDashboardSlice = createSlice({
  name: 'weightDashboard',
  initialState,
  reducers: {
    nameData: (state, action) => {
      state.data = action.payload;
    },
    weightData: (state, action) => {
      state.weightdata = action.payload;
    },
    clearWeightData: (state, action) => {
      state.data = [];
    },
  },
});

const weightDashboardReducer = weightDashboardSlice.reducer;
export const {nameData, clearWeightData, weightData} =
  weightDashboardSlice.actions;
export default weightDashboardReducer;
