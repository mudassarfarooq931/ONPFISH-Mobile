import {createSlice} from '@reduxjs/toolkit';
import {AuthState} from '@redux/states';
import {SignupUser} from './actions/signup';
import {handleLogin} from './actions/login';

const initialState: AuthState = {
  fullName: '',
  email: '',
  uid: '',
  loginLoading: false,
  signupLoading: false,
  error: '',
  role: null,
  isLogined: false,
  userData: undefined,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    Logout: (state, action) => {
      state.uid = '';
      state.email = '';
      state.loginLoading = false;
      state.signupLoading = false;
      state.role = null;
      state.fullName = '';
      state.error = '';
      state.isLogined = false;
      state.userData = undefined;
    },
    clearState: (state, action) => {
      state.loginLoading = false;
      state.userData = undefined;
      state.signupLoading = false;
      state.email = '';
      state.uid = '';
      state.fullName = '';
      state.role = null;
      state.error = '';
      state.isLogined = false;
    },
    setSignUpLoading: (state, action) => {
      state.signupLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(SignupUser.pending, state => ({
      ...state,
      signupLoading: true,
      error: '',
    }));
    builder.addCase(SignupUser.rejected, (state, {payload}) => ({
      ...state,
      signupLoading: false,
    }));
    builder.addCase(SignupUser.fulfilled, (state, {payload}) => ({
      ...state,
      signupLoading: false,
      uid: payload?.user?.uidfalse,
      email: payload?.user?.email ?? '',
      fullName: payload?.user?.email ?? '',
      role: payload?.role ?? null,
    }));
    builder.addCase(handleLogin.pending, state => {
      state.loginLoading = true;
      state.error = '';
      state.isLogined = false;
    });
    builder.addCase(handleLogin.rejected, state => {
      state.loginLoading = false;
      state.isLogined = false;
    });
    builder.addCase(handleLogin.fulfilled, (state, {payload}) => {
      state.loginLoading = false;
      // state.uid = payload?.uid;
      // state.email = payload?.email ?? '';
      // state.fullName = payload.name ?? '';
      // state.role = payload?.role ?? null;
      state.userData = payload;
      state.isLogined = true;
    });
  },
});
export const {Logout, clearState, setSignUpLoading} = authSlice.actions;

export default authSlice.reducer;
