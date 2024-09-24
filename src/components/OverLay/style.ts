import {StyleSheet} from 'react-native';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '@/assets/styles/scaling';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  text: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    marginTop: verticalScale(5),
    lineHeight: scaleFontSize(17),
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(10),
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(15),
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: horizontalScale(0.25),
    shadowRadius: horizontalScale(4),
    elevation: horizontalScale(5),
    borderWidth: horizontalScale(0.7),
  },
});

export default style;
