import {Drawer} from '@components';
import {colors} from '@constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootState} from '@redux/store';
import {DrawerNavParamList} from '@routes/param-list';
import React, {useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {connect} from 'react-redux';
import MainNav from './main.routes';

//-----------------
interface IProps {}

//------------------------------------------------------------------------
const mapStateToProps = (state: RootState) => {
  return {};
};

//------------------------------------------------------------------------
const {Navigator, Screen} = createDrawerNavigator<DrawerNavParamList>();
const MainDrawerNav: React.FC<IProps> = ({}) => {
  useEffect(() => {}, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: colors.primary}}></SafeAreaView>
      <View style={{flex: 1}}>
        <Navigator
          drawerContent={({navigation}) => <Drawer navigation={navigation} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'back',
            swipeEnabled: false,
          }}>
          <Screen name={'MainNav'} component={MainNav} />
        </Navigator>
      </View>
    </>
  );
};
export default connect(mapStateToProps)(MainDrawerNav);
