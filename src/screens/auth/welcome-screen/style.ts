import {colors, fonts} from '@constants';
import {HelperService} from '@services';
import {StyleSheet} from 'react-native';
const isMobile = HelperService.getInstance().getIsDeviceMobile();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
