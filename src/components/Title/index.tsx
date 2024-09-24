import React from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@/assets/hooks';

import style from '@/components/Title/style';

type TProps = {
  title: string;
  type?: number;
  color?: string;
  numberOfLines?: number;
  titleStyle?: {[key: string]: any};
  titleTextStyle?: {[key: string]: any};
};

const Title: React.FC<TProps> = ({
  type,
  color,
  title,
  titleStyle,
  numberOfLines,
  titleTextStyle,
}) => {
  const {colors} = useTheme();

  const styleToApply = () => {
    switch (type) {
      case 24:
        return style.title24;
      case 22:
        return style.title22;
      case 20:
        return style.title20;
      case 18:
        return style.title18;
      case 16:
        return style.title16;
      default:
        return style.title14;
    }
  };
  return (
    <View style={titleStyle}>
      <Text
        numberOfLines={numberOfLines && numberOfLines}
        style={[
          styleToApply(),
          titleTextStyle,
          color ? {color} : {color: colors.text},
        ]}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
