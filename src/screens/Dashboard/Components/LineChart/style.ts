import {StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    borderRadius: horizontalScale(10),
  },
});

export default style;
