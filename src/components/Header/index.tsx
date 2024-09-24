import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {
  faCircleUser,
  faArrowLeft,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Image, Platform, TouchableOpacity, Text, View} from 'react-native';

import Title from '@/components/Title';
import Search from '@/components/UI/Search';

import {useTheme} from '@/assets/hooks';
import {scaleFontSize} from '@/assets/styles/scaling';
import {TState as userTState} from '@/redux/reducers/user';

import style from '@/components/Header/style';

type TProps = {
  title?: string;
  titleType?: number;
  backIcon?: IconProp;
  iosBackIcon?: IconProp;
  hasBackButton?: boolean;
  titleStyle?: {[key: string]: any};
  headerStyle?: {[key: string]: any};
  titleTextStyle?: {[key: string]: any};
  handleDrawer?: () => void;
  headerLeft?: () => JSX.Element;
  headerRight?: () => JSX.Element;
  handleSearch?: (value: string) => Promise<void>;
};

const Header: React.FC<TProps> = ({
  title,
  backIcon,
  titleType,
  headerLeft,
  titleStyle,
  headerRight,
  iosBackIcon,
  headerStyle,
  handleDrawer,
  handleSearch,
  hasBackButton,
  titleTextStyle,
}) => {
  const {colors} = useTheme();

  const user = useSelector((state: {user: userTState}) => state.user);

  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <View style={[style.container, headerStyle]}>
        {hasBackButton && (
          <TouchableOpacity onPress={handleBack}>
            <View>
              <FontAwesomeIcon
                size={scaleFontSize(23)}
                color={colors.text}
                icon={
                  Platform.OS === 'ios'
                    ? (iosBackIcon ?? backIcon ?? faChevronLeft)
                    : (backIcon ?? faArrowLeft)
                }
              />
            </View>
          </TouchableOpacity>
        )}
        {headerLeft && headerLeft()}
        {title ? (
          <Title
            title={title}
            type={titleType || 18}
            titleStyle={titleStyle}
            titleTextStyle={titleTextStyle}
          />
        ) : (
          <View style={style.intro}>
            <Text style={[style.introText, {color: colors.text}]}>
              Welcome,{' '}
            </Text>
            <View style={style.user}>
              <Title
                type={16}
                title={
                  (user.fullName || user.userName || 'Guest@idp.com') + ' 👋'
                }
              />
            </View>
          </View>
        )}
        {headerRight && headerRight()}
        {handleDrawer && (
          <TouchableOpacity onPress={handleDrawer}>
            <View style={[style.imageContainer, {borderColor: colors.bgImg}]}>
              {user.image ? (
                <Image
                  resizeMode="cover"
                  source={{uri: user.image}}
                  style={style.profileImage}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  color={colors.bgImg}
                  size={scaleFontSize(40)}
                />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
      {handleSearch && (
        <View style={style.searchBox}>
          <Search onSearch={handleSearch} />
        </View>
      )}
    </View>
  );
};

export default Header;
