import {StyleSheet} from 'react-native';

import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  subContainer: {
    minWidth: '67%',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    margin: horizontalScale(30),
    padding: horizontalScale(30),
    elevation: horizontalScale(5),
    shadowRadius: horizontalScale(4),
    borderRadius: horizontalScale(20),
    shadowOpacity: horizontalScale(0.25),
  },
  datePicker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  mb20: {
    marginTop: verticalScale(20),
  },
  actionRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  me30: {
    marginRight: horizontalScale(30),
  },
  text: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
  hiddenTime: {
    display: 'none',
  },
  textTheme: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
});

export default style;
