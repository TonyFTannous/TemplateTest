import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleProp,
  ViewStyle,
  ColorValue,
  ActivityIndicator,
} from 'react-native';

import {useTheme} from '@/assets/hooks';

import style from '@/components/OverLay/style';

type TProps = {
  text?: string;
  isIndicator?: boolean;
  transparent?: boolean;
  textColor?: ColorValue;
  hasSubContainer?: boolean;
  indicatorColor?: ColorValue;
  backgroundColor?: ColorValue;
  subContainerStyle?: StyleProp<ViewStyle>;
};

const OverLay: React.FC<TProps> = ({
  text,
  textColor,
  isIndicator,
  transparent,
  indicatorColor,
  backgroundColor,
  hasSubContainer,
  subContainerStyle,
}) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible
      animationType="fade"
      statusBarTranslucent
      transparent={transparent ?? true}>
      <View
        style={[
          style.container,
          backgroundColor && {backgroundColor: backgroundColor},
        ]}>
        <View
          style={[
            hasSubContainer && {
              ...style.subContainer,
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
            subContainerStyle,
          ]}>
          {isIndicator && (
            <ActivityIndicator
              size="large"
              color={indicatorColor || colors.text}
            />
          )}
          {text && (
            <Text style={[style.text, {color: textColor || colors.text}]}>
              {text}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default OverLay;
