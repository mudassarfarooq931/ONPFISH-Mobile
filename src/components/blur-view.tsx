import {colors} from '@constants';
import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type IProps = {
  children?: Array<JSX.Element> | JSX.Element;
  style?: StyleProp<ViewStyle>;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BackgroundBlurView: React.FC<IProps> = ({style, children}) => {
  if (Platform.OS === 'ios') {
    if (children) {
      return (
        <BlurView
          style={[styles.container, style]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor={colors.white}
        >
          {children}
        </BlurView>
      );
    }
    return (
      <BlurView
        style={[styles.container, style]}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor={colors.white}
      />
    );
  } else {
    if (children) {
      return (
        <View style={[styles.container, style]}>
          <BlurView
            style={[styles.container, style]}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor={colors.white}
          />
          {children}
        </View>
      );
    }
    return (
      <View style={[styles.container, style]}>
        <BlurView
          style={[styles.container, style]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor={colors.white}
        />
      </View>
    );
  }
};

export default BackgroundBlurView;

//------------------------------------
const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
