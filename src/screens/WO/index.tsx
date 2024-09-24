import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '@/components/Header';

import {useTheme} from '@/assets/hooks';

import gbStyle from '@/assets/styles';
//import style from '@/screens/WO/style';

type TProps = {
  navigation: any;
};

const WO: React.FC<TProps> = ({navigation}) => {
  const {colors} = useTheme();

  const insets = useSafeAreaInsets();

  const handleDrawer = useCallback(() => {
    navigation.openDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = useCallback(async (value: string) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(value);
    }
  }, []);

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
      <Header handleDrawer={handleDrawer} handleSearch={handleSearch} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default WO;
