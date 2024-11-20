import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen, HomeScreen, ProfileScreen} from '@screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BottomFabBar} from 'rn-wave-bottom-bar';

import {colors, fonts} from '@constants';
import React from 'react';
import {Alert} from 'react-native';

interface IProps {}

const Tab = createBottomTabNavigator<any>();
const BottomTabNav: React.FC<IProps> = () => {
  const tabs = [
    {
      name: 'Dashboard',
      component: DashboardScreen,
      icon: ({color}: any) => (
        <FontAwesome5 name="home" color={color} size={26} />
      ),
    },

    {
      name: 'Home',
      component: HomeScreen,
      icon: ({color}: any) => (
        <MaterialCommunityIcons name="camera-plus" color={color} size={30} />
      ),
    },
    {
      name: 'Profile',
      component: ProfileScreen,
      icon: ({color}: any) => (
        <FontAwesome name="user-circle-o" color={color} size={26} />
      ),
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.white,
        tabBarActiveBackgroundColor: colors.primary,

        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: fonts.MONTSERRAT_BOLD,
          color: colors.white,
        },
      }}
      tabBar={props => (
        <BottomFabBar
          mode={'default'}
          isRtl={false}
          focusedButtonStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
          }}
          bottomBarContainerStyle={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
          {...props}
        />
      )}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: tab.icon,
            // tabBarLabel: tab.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNav;
