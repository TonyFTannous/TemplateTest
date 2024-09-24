import {Platform, StyleSheet} from 'react-native';

import {
  scaleFontSize,
  verticalScale,
  horizontalScale,
} from '@/assets/styles/scaling';
import {getFontFamily} from '@/assets/fonts/helper';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(20),
  },
  intro: {
    paddingLeft: horizontalScale(3),
  },
  introText: {
    fontSize: scaleFontSize(15),
    lineHeight: scaleFontSize(18),
    fontFamily: getFontFamily('400'),
  },
  user: {
    marginTop: verticalScale(5),
  },
  imageContainer: {
    padding: horizontalScale(1),
    borderWidth: horizontalScale(1.5),
    borderRadius: horizontalScale(30),
  },
  profileImage: {
    width: horizontalScale(45),
    borderRadius: horizontalScale(30),
    height: verticalScale(Platform.OS === 'ios' ? 40 : 45),
  },
  searchBox: {
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(20),
  },
});

export default style;
