import {Platform, StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {horizontalScale, verticalScale} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: verticalScale(10),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(30),
    paddingLeft: horizontalScale(18),
    borderTopWidth: verticalScale(0.3),
    paddingVertical: horizontalScale(20),
  },
  btnText: {
    top: verticalScale(-0.6),
    fontFamily: getFontFamily('500'),
    marginLeft: horizontalScale(28.5),
  },
  toggleThemeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: horizontalScale(5),
    transform: [
      {scaleX: Platform.OS === 'ios' ? 0.85 : 1.2},
      {scaleY: Platform.OS === 'ios' ? 0.85 : 1.2},
    ],
    width: Platform.OS === 'ios' ? '57%' : '40%',
    paddingVertical:
      Platform.OS === 'ios' ? verticalScale(5) : verticalScale(3),
  },
});

export default style;
