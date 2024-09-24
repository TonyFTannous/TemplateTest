import React from 'react';
import {useTheme} from '@/assets/hooks';
import {useColorScheme, View} from 'react-native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import Title from '@/components/Title';
import Text from '@/components/UI/Text';

import {TThemeColor} from '@/theme';
import {scaleFontSize} from '@/assets/styles/scaling';
import {modules as data} from '@/screens/Home/declarations';

import style from '@/screens/Home/Components/Modules/style';

type TItemProps = {
  name: string;
  icon: IconProp;
  colors: TThemeColor;
};

const ModuleItem: React.FC<TItemProps> = ({name, icon, colors}) => {
  const scheme = useColorScheme();

  return (
    <View
      style={[
        style.itemContainer,
        {
          shadowColor: colors.primary,
          backgroundColor: colors.card,
        },
      ]}>
      <View style={style.textContainer}>
        <Text style={style.text}>{name}</Text>
      </View>
      <View style={style.iconContainer}>
        <FontAwesomeIcon
          icon={icon}
          size={scaleFontSize(30)}
          color={
            scheme === 'light' ? colors.primaryVariant : colors.primaryVariant
          }
        />
      </View>
    </View>
  );
};

const Modules: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View style={style.container}>
      <Title title="Modules" color={colors.caption} />
      <View style={style.innerContainer}>
        {data.map(item => (
          <ModuleItem
            key={item.code}
            name={item.name}
            icon={item.icon}
            colors={colors}
          />
        ))}
      </View>
    </View>
  );
};

export default Modules;
