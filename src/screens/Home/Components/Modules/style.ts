import {StyleSheet} from 'react-native';

import {getFontFamily} from '@/assets/fonts/helper';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  container: {
    marginTop: verticalScale(15),
  },
  innerContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: verticalScale(5),
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '49%',
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowRadius: 7.68,
    shadowOpacity: 0.21,
    marginVertical: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(60),
    justifyContent: 'space-around',
    borderRadius: horizontalScale(7),
    paddingHorizontal: horizontalScale(7),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: getFontFamily(),
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
  },
});

export default style;
