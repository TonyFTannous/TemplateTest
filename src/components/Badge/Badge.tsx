import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextLayoutEventData,
  NativeSyntheticEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {useTheme} from '@/assets/hooks';
import {horizontalScale} from '@/assets/styles/scaling';

import style from '@/components/Badge/style';

type TProps = {
  title: string;
  numberOfLines?: number;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const Badge: React.FC<TProps> = ({
  title,
  titleStyle,
  numberOfLines,
  containerStyle,
}) => {
  const {colors} = useTheme();

  const textRef = useRef<Text>(null);

  const [width, setWidth] = useState<number>(0);

  const textLayoutHandler = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      setWidth(event.nativeEvent.lines[0].width);
    },
    [],
  );

  const paddingHorizontal = 10;

  const badgeWidth = {
    width: horizontalScale(paddingHorizontal * 2 + width),
  };

  return (
    <View
      style={[
        style.badge,
        {backgroundColor: colors.secondary},
        badgeWidth,
        containerStyle,
      ]}>
      <Text
        ref={textRef}
        numberOfLines={numberOfLines}
        onTextLayout={textLayoutHandler}
        style={[style.title, {color: colors.text}, titleStyle]}>
        {title}
      </Text>
    </View>
  );
};

export default Badge;
