import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleProp,
  ViewStyle,
  ColorValue,
  TouchableOpacity,
} from 'react-native';

import Title from '@/components/Title';

import {useTheme} from '@/assets/hooks';

import style from '@/components/Dialog/style';

type TProps = {
  text: string;
  caption?: string;
  cancelText?: string;
  confirmText?: string;
  transparent?: boolean;
  backgroundColor?: ColorValue;
  subContainerStyle?: StyleProp<ViewStyle>;
  handleCancel: () => void;
  handleConfirm: () => void;
};

const Dialog: React.FC<TProps> = ({
  text,
  caption,
  cancelText,
  confirmText,
  transparent,
  backgroundColor,
  subContainerStyle,
  handleCancel,
  handleConfirm,
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
            {
              ...style.subContainer,
              borderColor: colors.border,
              backgroundColor: colors.background,
            },
            subContainerStyle,
          ]}>
          <View style={style.body}>
            {caption && (
              <Title title={caption} type={18} titleStyle={style.caption} />
            )}
            <Text style={[style.text, {color: colors.text}]}>{text}</Text>
          </View>
          <View style={style.actionContainer}>
            <TouchableOpacity onPress={handleCancel} style={style.cancelBtn}>
              <Text style={style.cancelText}>{cancelText || 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm} style={style.confirmBtn}>
              <Text style={style.confirmText}>{confirmText || 'Ok'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Dialog;
