import {horizontalScale, verticalScale} from '@/assets/styles/scaling';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: verticalScale(50),
    paddingHorizontal: horizontalScale(20),
  },
});

export default style;
