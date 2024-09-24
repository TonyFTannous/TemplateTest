import {Platform, StyleSheet} from 'react-native';

import {horizontalScale} from '@/assets/styles/scaling';

const style = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
  },
  title: {
    paddingLeft: horizontalScale(Platform.OS === 'ios' ? 7 : 10),
  },
});

export default style;
