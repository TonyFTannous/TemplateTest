import {StyleSheet} from 'react-native';

import {verticalScale} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusBar: {
    width: '50%',
    position: 'absolute',
    top: verticalScale(-8),
    height: verticalScale(2),
  },
});

export default style;
