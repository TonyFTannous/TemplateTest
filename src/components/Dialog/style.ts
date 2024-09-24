import {StyleSheet} from 'react-native';

import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  subContainer: {
    width: '80%',
    maxWidth: horizontalScale(450),
    borderRadius: horizontalScale(10),
    paddingVertical: verticalScale(15),
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: horizontalScale(0.25),
    shadowRadius: horizontalScale(4),
    elevation: horizontalScale(5),
  },
  body: {
    paddingHorizontal: horizontalScale(20),
  },
  text: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
  caption: {
    marginBottom: verticalScale(5),
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: verticalScale(30),
    paddingBottom: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
  },
  cancelBtn: {
    width: horizontalScale(60),
  },
  cancelText: {
    color: colors.red,
    textAlign: 'center',
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
  confirmBtn: {
    width: horizontalScale(50),
  },
  confirmText: {
    color: colors.green,
    textAlign: 'center',
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
});

export default style;
