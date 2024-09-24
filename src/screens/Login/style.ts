import {StyleSheet} from 'react-native';

import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: verticalScale(30),
    marginHorizontal: horizontalScale(24),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(70),
  },
  logo: {
    height: verticalScale(50),
    width: horizontalScale(140),
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorContainer: {
    backgroundColor: colors.danger,
    marginBottom: verticalScale(24),
    paddingVertical: verticalScale(10),
  },
  error: {
    textAlign: 'center',
    color: colors.whiteSmoke,
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
    fontFamily: getFontFamily('500'),
  },
  actionContainer: {
    marginTop: verticalScale(20),
  },
});

export default style;
