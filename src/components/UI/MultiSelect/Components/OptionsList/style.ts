import {StyleSheet} from 'react-native';
import {
  scaleFontSize,
  horizontalScale,
  verticalScale,
} from '@/assets/styles/scaling';

import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  scrollContentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingRight: horizontalScale(53),
  },
  option: {
    maxWidth: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    margin: horizontalScale(2),
    justifyContent: 'space-between',
    paddingLeft: horizontalScale(7),
    paddingRight: horizontalScale(5),
    borderRadius: horizontalScale(50),
    paddingVertical: verticalScale(4),
  },
  titleContainer: {
    maxWidth: '90%',
  },
  title: {
    textAlign: 'center',
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
  },
  actionContainer: {
    marginLeft: horizontalScale(3),
  },
});

export default style;
