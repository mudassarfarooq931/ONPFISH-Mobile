import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//------------------------------
export type AuthNavParamList = {
  Login: undefined;
  ChangePassword: undefined;
  Signup: undefined;
  Welcome: undefined;
};

export type AuthRouteProp<T extends keyof AuthNavParamList> = RouteProp<
  AuthNavParamList,
  T
>;

export type AuthNavigationProp<T extends keyof AuthNavParamList> =
  NativeStackNavigationProp<AuthNavParamList, T>;

//------------------------------
export type PhysicianNavParamList = {
  PhysicianBottomTabNav: undefined;
  Chat: undefined;
  PatientDetail: {patientId: string; patientName: string};
  OrderTracking: {orderId: number; name: string};
};

//------------------------------
export type MainNavParamList = {
  BottomTabNav: undefined;
  FishDetails: undefined;
};

export type PhysicianRouteProp<T extends keyof PhysicianNavParamList> =
  RouteProp<PhysicianNavParamList, T>;

export type PatientRouteProp<T extends keyof MainNavParamList> = RouteProp<
  MainNavParamList,
  T
>;

export type MainNavigationProp<T extends keyof PhysicianNavParamList> =
  NativeStackNavigationProp<PhysicianNavParamList, T>;

//------------------------------------
export type BottomTabsNavParamList = {
  Profile: undefined;
  Dashboard: undefined;
  Home: undefined;
};

//------------------------------------
export type DrawerNavParamList = {
  Drawer: undefined;
  MainNav: undefined;
};

//------------------------------------
export type AmbassadorNavParamList = {
  Ambassador: undefined;
};

export type BottomTabsRouteProp<T extends keyof BottomTabsNavParamList> =
  RouteProp<BottomTabsNavParamList, T>;

export type BottomTabsNavigationProp<T extends keyof BottomTabsNavParamList> =
  NativeStackNavigationProp<BottomTabsNavParamList, T>;

export type RoleNavParamList = {
  RoleSelection: undefined;
};

export type RoleRouteProp<T extends keyof RoleNavParamList> = RouteProp<
  RoleNavParamList,
  T
>;

export type RoleNavigationProp<T extends keyof RoleNavParamList> =
  NativeStackNavigationProp<RoleNavParamList, T>;
