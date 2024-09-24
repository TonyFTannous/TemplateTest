import {StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {scaleFontSize} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  text: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
});

export default style;
