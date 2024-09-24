import {StyleSheet} from 'react-native';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
  },
  title: {
    textAlign: 'center',
    fontSize: scaleFontSize(10),
    lineHeight: scaleFontSize(13),
    fontFamily: getFontFamily('600'),
  },
});

export default style;
