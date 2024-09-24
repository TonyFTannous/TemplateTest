import React from 'react';
import {useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native';

import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useTheme} from '@/assets/hooks';
import {scaleFontSize} from '@/assets/styles/scaling';
import {TState as userTState} from '@/redux/reducers/user';

import style from '@/navigation/Components/DrawerNavigator/Components/SideBarHeader/style';

const SideBarHeader: React.FC = () => {
  const {colors} = useTheme();

  const user = useSelector((state: {user: userTState}) => state.user);

  return (
    <View style={style.container}>
      <View
        style={[
          style.imageContainer,
          {borderColor: colors.bgImg},
          !user.image && style.iconContainer,
        ]}>
        {user.image ? (
          <Image
            source={{
              uri: user.image,
            }}
            style={style.image}
            resizeMode={'contain'}
          />
        ) : (
          <FontAwesomeIcon
            icon={faCircleUser}
            size={scaleFontSize(65)}
            color={colors.bgImg}
          />
        )}
      </View>
      <View style={style.info}>
        <Text numberOfLines={2} style={[style.userInfo, {color: colors.text}]}>
          {user.userName || 'Guest'}
        </Text>
        <Text numberOfLines={2} style={[style.emailInfo, {color: colors.text}]}>
          {user.email || 'Guest@Idp.com'}
        </Text>
      </View>
    </View>
  );
};

export default SideBarHeader;
