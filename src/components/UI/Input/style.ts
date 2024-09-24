import {StyleSheet, Platform} from 'react-native';
import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  label: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(13),
    lineHeight: scaleFontSize(16),
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
    paddingRight: horizontalScale(35),
    borderBottomWidth: horizontalScale(1),
    paddingVertical:
      Platform.OS === 'android' ? verticalScale(7) : verticalScale(10),
    paddingLeft: Platform.OS === 'android' ? horizontalScale(0.5) : undefined,
  },
  iconBtnContainer: {
    top: '50%',
    position: 'absolute',
    right: horizontalScale(5),
    transform: [{translateY: verticalScale(-15)}],
  },
  error: {
    color: colors.danger,
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(13),
    marginTop: verticalScale(5),
    lineHeight: scaleFontSize(16),
  },
  bottomBorderShadow: {
    height: verticalScale(2),
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: horizontalScale(0.25),
    shadowRadius: horizontalScale(3.84),
    elevation: horizontalScale(5),
    marginTop: verticalScale(-2),
  },
});

export default style;
