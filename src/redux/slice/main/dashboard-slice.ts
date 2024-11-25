import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

interface WeightDashboardState {
  data: Array<{id: string; name: string}>;
  loading: boolean;
  error: string | null;
}

const initialState: WeightDashboardState = {
  data: [],
  loading: false,
  error: null,
};

const weightDashboardSlice = createSlice({
  name: 'weightDashboard',
  initialState,
  reducers: {
    weightData: (state, action) => {
      state.data = action.payload;
    },
    clearWeightData: (state, action) => {
      state.data = [];
    },
  },
});

const weightDashboardReducer = weightDashboardSlice.reducer;
export const {weightData, clearWeightData} = weightDashboardSlice.actions;
export default weightDashboardReducer;
