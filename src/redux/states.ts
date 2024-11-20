import {Fish} from '@domain-models';

export type BaseState<T> = {
  message: string;
  error: boolean;
  loading: boolean;
  body?: T;
};

export type RejectState = {
  rejectValue: {
    status: number;
    message: string;
    networkError: boolean;
  };
};
export type ToastState = {
  message?: string;
};
export type AuthState = {
  isLogined?: boolean;
  uid: string;
  fullName: string;
  email: string;
  loginLoading: boolean;
  signupLoading: boolean;
  error: string;
  role: string | null;
  userData: any;
};

export type FishIdentifyState = BaseState<Fish> & {
  loading: false;
  error: false;
  message: '';
  data: '';
};
