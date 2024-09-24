import {StyleSheet} from 'react-native';

import colors from '@/assets/styles/colors';
import {verticalScale} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  marginBottom24: {
    marginBottom: verticalScale(24),
  },
});

export default style;
