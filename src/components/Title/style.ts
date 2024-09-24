import {StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {scaleFontSize} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  title24: {
    fontSize: scaleFontSize(24),
    lineHeight: scaleFontSize(27),
    fontFamily: getFontFamily('600'),
  },
  title22: {
    fontSize: scaleFontSize(22),
    lineHeight: scaleFontSize(25),
    fontFamily: getFontFamily('600'),
  },
  title20: {
    fontSize: scaleFontSize(20),
    lineHeight: scaleFontSize(23),
    fontFamily: getFontFamily('600'),
  },
  title18: {
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(21),
    fontFamily: getFontFamily('600'),
  },
  title16: {
    fontSize: scaleFontSize(16),
    lineHeight: scaleFontSize(19),
    fontFamily: getFontFamily('600'),
  },
  title14: {
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
    fontFamily: getFontFamily('600'),
  },
});

export default style;
