import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

interface WeightDashboardState {
  data: Array<{id: string; name: string}>;
  weightdata: any;
  totalDataWeight: {
    [key: string]: {
      timestamp: number;
      isDelete: boolean;
      weightData: {estimated_crate_weight: number};
    };
  };
  totalDataIdentity: any;
  loading: boolean;
  error: string | null;
}

const initialState: WeightDashboardState = {
  data: [],
  weightdata: [],
  totalDataWeight: {},
  totalDataIdentity: [],
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
    totalDataWeight: (state, action) => {
      state.totalDataWeight = action.payload;
    },
    totalDataIdentity: (state, action) => {
      state.totalDataIdentity = action.payload;
    },
    deleteIdentifyData: (state, action) => {
      const id = action.payload;
      state.totalDataIdentity = state.totalDataIdentity.filter(
        (item: any) => item.id !== id,
      );
    },
    deleteWeightData: (state, action) => {
      const id = action.payload;
      delete state.totalDataWeight[id]; // Use delete to remove item by ID
    },
    clearWeightData: state => {
      state.data = [];
      state.weightdata = [];
      state.totalDataWeight = {};
      state.totalDataIdentity = [];
    },
  },
});

const weightDashboardReducer = weightDashboardSlice.reducer;
export const {
  nameData,
  clearWeightData,
  weightData,
  totalDataWeight,
  totalDataIdentity,
  deleteIdentifyData,
  deleteWeightData,
} = weightDashboardSlice.actions;

export default weightDashboardReducer;
