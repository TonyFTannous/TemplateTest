import React from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {GestureResponderEvent, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useTheme} from '@/assets/hooks';
import {scaleFontSize, horizontalScale} from '@/assets/styles/scaling';

import style from '@/components/UI/IconButton/style';

type TProps = {
  icon: IconProp;
  size?: number;
  color?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  borderRadius?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

const IconButton: React.FC<TProps> = ({
  icon,
  size,
  color,
  width,
  height,
  bgColor,
  borderRadius,
  onPress,
}) => {
  const {colors} = useTheme();

  const customStyle = {
    width: width || horizontalScale(28),
    height: height || horizontalScale(28),
    backgroundColor: bgColor,
    borderRadius: borderRadius || horizontalScale(14),
  };
  return (
    <TouchableOpacity onPress={onPress} style={[style.container, customStyle]}>
      <FontAwesomeIcon
        icon={icon}
        color={color || colors.icons}
        size={size || scaleFontSize(16)}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
