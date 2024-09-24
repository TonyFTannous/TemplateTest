import React, {useCallback} from 'react';
import {useColorScheme} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  faSliders,
  faQuestion,
  faEnvelope,
  faAddressCard,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import BottomTabNavigator from '@/navigation/Components/BottomTabNavigator';
import CustomDrawerContent from '@/navigation/Components/DrawerNavigator/Components/CustomDrawerContent';

import {useTheme} from '@/assets/hooks';
import {routes} from '@/navigation/routes';
import {scaleFontSize} from '@/assets/styles/scaling';

import style from '@/navigation/Components/DrawerNavigator/style';

type TDrawerIcon = {focused: boolean; color: string; size: number};

export const handleDrawerIcon =
  (routeName: string) =>
  ({color}: TDrawerIcon) => {
    let icon;

    switch (routeName) {
      case 'BottomTab':
        icon = faHouseChimney;
        break;
      case 'Notifications':
        icon = faEnvelope;
        break;
      case 'Settings':
        icon = faSliders;
        break;
      case 'Profile':
        icon = faAddressCard;
        break;
      default:
        icon = faQuestion;
        break;
    }
    return (
      <FontAwesomeIcon icon={icon} color={color} size={scaleFontSize(20)} />
    );
  };

const DrawerNavigation: React.FC = () => {
  const {colors} = useTheme();

  const scheme = useColorScheme();

  const Drawer = createDrawerNavigator();

  const handleCustomDrawerContent = useCallback(
    (props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />,
    [],
  );

  return (
    <Drawer.Navigator
      drawerContent={handleCustomDrawerContent}
      screenOptions={({route}) => ({
        drawerType: 'slide',
        header: () => null,
        headerShown: false,
        unmountOnBlur: true,
        drawerLabelStyle: style.drawerLabel,
        drawerActiveTintColor: colors.background,
        drawerIcon: handleDrawerIcon(route.name),
        drawerActiveBackgroundColor: colors.primary,
        drawerStyle: {
          backgroundColor:
            scheme === 'dark' ? colors.background : colors.secondaryVariant,
        },
      })}>
      <Drawer.Screen
        name={routes.BottomTab}
        component={BottomTabNavigator}
        options={{drawerLabel: 'Home'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
