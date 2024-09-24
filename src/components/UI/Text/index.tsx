import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

import {useTheme} from '@/assets/hooks';

import style from '@/components/UI/Text/style';

const Text: React.FC<TextProps> = props => {
  const {colors} = useTheme();

  return (
    <RNText
      {...props}
      style={[style.text, {color: colors.text}, props.style]}
    />
  );
};

export default Text;
