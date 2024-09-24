import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '@/components/Header';

import {useTheme} from '@/assets/hooks';

import gbStyle from '@/assets/styles';
import style from '@/screens/Settings/style';

const Settings: React.FC = () => {
  const {colors} = useTheme();

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        gbStyle.flex,
        {
          backgroundColor: colors.background,
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
      ]}>
      <Header
        hasBackButton
        title="Settings"
        headerStyle={style.header}
        titleStyle={style.title}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Settings;
