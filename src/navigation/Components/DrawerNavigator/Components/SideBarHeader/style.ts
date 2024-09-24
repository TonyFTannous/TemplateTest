import {Platform, StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: horizontalScale(16),
    height: verticalScale(Platform.OS === 'ios' ? 135 : 150),
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(62),
    padding: horizontalScale(1),
    borderWidth: horizontalScale(1.5),
    borderRadius: horizontalScale(50),
    height: verticalScale(Platform.OS === 'android' ? 62 : 55),
  },
  iconContainer: {
    width: horizontalScale(62),
    height: verticalScale(Platform.OS === 'android' ? 62 : 55),
  },
  image: {
    width: horizontalScale(57),
    borderRadius: horizontalScale(30),
    height: verticalScale(Platform.OS === 'android' ? 57 : 50),
  },
  info: {
    marginTop: verticalScale(7),
  },
  userInfo: {
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontFamily: getFontFamily('700'),
  },
  emailInfo: {
    fontSize: scaleFontSize(13),
    marginTop: verticalScale(2),
    fontFamily: getFontFamily(),
    lineHeight: scaleFontSize(16),
  },
});

export default style;
