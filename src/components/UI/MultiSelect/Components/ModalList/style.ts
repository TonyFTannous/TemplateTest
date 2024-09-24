import {StyleSheet} from 'react-native';

import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import colors from '@/assets/styles/colors';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  subContainer: {
    width: '90%',
    height: '90%',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    elevation: horizontalScale(5),
    shadowRadius: horizontalScale(4),
    borderRadius: horizontalScale(20),
    shadowOpacity: horizontalScale(0.25),
  },
  titleContainer: {
    paddingTop: verticalScale(25),
    marginBottom: verticalScale(10),
    paddingBottom: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
  },
  searchBox: {
    marginHorizontal: horizontalScale(24),
  },
  optionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(13),
    borderBottomWidth: verticalScale(1),
    paddingHorizontal: horizontalScale(30),
  },
  actionContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(70),
    justifyContent: 'space-between',
  },
  actionRight: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: horizontalScale(30),
  },
  ms30: {
    marginLeft: horizontalScale(30),
  },
  btnText: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
  btnTextOk: {
    fontSize: scaleFontSize(16),
  },
  optionTextContainer: {
    width: '90%',
  },
  optionText: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(20),
  },
  emptyContainer: {
    paddingTop: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(14),
    lineHeight: scaleFontSize(17),
  },
});

export default style;
