import {Platform, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  switchContainer: {
    transform: [
      {scaleX: Platform.OS === 'ios' ? 0.8 : 1.3},
      {scaleY: Platform.OS === 'ios' ? 0.8 : 1.3},
    ],
  },
});

export default style;
