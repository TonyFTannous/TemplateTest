import {StyleSheet} from 'react-native';

import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: verticalScale(50),
    borderRadius: horizontalScale(12),
  },
  disabled: {
    opacity: 0.6,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    transform: [{scale: 0.7}],
    marginLeft: horizontalScale(10),
  },
  title: {
    textAlign: 'center',
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontFamily: getFontFamily('500'),
  },
});

export default style;
