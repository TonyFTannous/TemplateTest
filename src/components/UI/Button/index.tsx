import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextLayoutEventData,
  PressableStateCallbackType,
} from 'react-native';

import {useTheme} from '@/assets/hooks';
import {horizontalScale} from '@/assets/styles/scaling';

import style from '@/components/UI/Button/style';

type TProps = {
  title: string;
  width?: number;
  height?: number;
  isAction?: boolean;
  isAutoSize?: boolean;
  isDisabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const Button: React.FC<TProps> = ({
  title,
  width,
  height,
  isAction,
  isDisabled,
  isAutoSize,
  onPress,
}) => {
  const paddingHorizontal = 10;

  const {colors} = useTheme();

  const [autoWidth, setAutoWidth] = useState<number>(0);

  const handleTextLayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      const totalWidth = event.nativeEvent.lines.reduce(
        (accumulator, currentValue) => accumulator + currentValue.width,
        0,
      );
      setAutoWidth(totalWidth);
    },
    [],
  );

  const handleStyle = useCallback(
    ({pressed}: PressableStateCallbackType) => [
      style.button,
      {backgroundColor: pressed ? colors.secondary : colors.primary},
      isDisabled ? style.disabled : {},
      isAutoSize
        ? {width: horizontalScale(paddingHorizontal * 2 + autoWidth)}
        : {},
      width ? {width: width} : {},
      height ? {height: height} : {},
    ],
    [
      width,
      height,
      autoWidth,
      isAutoSize,
      isDisabled,
      colors.primary,
      colors.secondary,
    ],
  );

  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={handleStyle}>
      <View style={style.body}>
        <Text
          style={[style.title, {color: colors.buttonCaption}]}
          onTextLayout={isAutoSize ? handleTextLayout : undefined}>
          {title}
        </Text>
        {isAction && (
          <ActivityIndicator
            size="large"
            color={colors.accent}
            style={style.indicator}
          />
        )}
      </View>
    </Pressable>
  );
};

export default Button;
