import {StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {scaleFontSize} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  drawerLabel: {
    fontSize: scaleFontSize(14),
    fontFamily: getFontFamily('600'),
  },
});

export default style;
