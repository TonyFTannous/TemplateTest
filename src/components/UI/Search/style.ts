import {StyleSheet} from 'react-native';

import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(50),
    borderRadius: horizontalScale(10),
    paddingHorizontal: horizontalScale(16),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
    marginLeft: horizontalScale(6),
  },
  error: {
    color: colors.danger,
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(13),
    lineHeight: scaleFontSize(16),
    paddingLeft: horizontalScale(6),
    marginVertical: verticalScale(5),
  },
});

export default style;
