import React from 'react';
import {Platform, View} from 'react-native';
import {
  faPhone,
  faQuestion,
  faFileLines,
  faCommentDots,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '@/screens/Home';
import Call from '@/screens/Call';
import chatting from '@/screens/Chat';

import {useTheme} from '@/assets/hooks';
import {routes} from '@/navigation/routes';
import {getFontFamily} from '@/assets/fonts/helper';
import {verticalScale} from '@/assets/styles/scaling';

import style from '@/navigation/Components/BottomTabNavigator/style';

type TTabBarIcon = {
  focused?: boolean;
  color?: string;
  size?: number;
};

const handleTabBarIcon =
  (route: any, barColor: string) =>
  ({focused, color, size}: TTabBarIcon) => {
    let icon;
    switch (route.name) {
      case 'Home':
        icon = faHouseChimney;
        break;
      case 'WO':
        icon = faFileLines;
        break;
      case 'Call':
        icon = faPhone;
        break;
      case 'Chat':
        icon = faCommentDots;
        break;
      default:
        icon = faQuestion;
        break;
    }
    // You can return any component that you like here!
    return (
      <View style={style.iconWrapper}>
        {focused && (
          <View style={[style.focusBar, {backgroundColor: barColor}]} />
        )}
        <FontAwesomeIcon icon={icon} size={size} color={color} />
      </View>
    );
  };

const BottomTabNavigator: React.FC = () => {
  const {colors} = useTheme();

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={routes.Home}
      screenOptions={({route}: any) => ({
        header: () => null,
        headerShown: false,
        gestureEnabled: false,
        tabBarIcon: handleTabBarIcon(route, colors.primary),
        tabBarActiveTintColor: colors.primary,
        //tabBarInactiveTintColor: colors.secondary,
        tabBarStyle:
          Platform.OS === 'android'
            ? {
                height: verticalScale(50),
                paddingTop: verticalScale(5),
                paddingBottom: verticalScale(5),
              }
            : {
                paddingTop: verticalScale(5),
              },
        tabBarLabelStyle: {
          fontFamily: getFontFamily(),
        },
      })}>
      <Tab.Screen name={routes.Home} component={Home} />
      <Tab.Screen name={routes.Call} component={Call} />
      <Tab.Screen name={routes.Chat} component={chatting} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
