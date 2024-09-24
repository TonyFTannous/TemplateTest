import React, {useCallback, useEffect} from 'react';
import {
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import SideBarHeader from '@/navigation/Components/DrawerNavigator/Components/SideBarHeader';
import SideBarFooter from '@/navigation/Components/DrawerNavigator/Components/SideBarFooter';

import {useTheme} from '@/assets/hooks';
import {routes} from '@/navigation/routes';
import {handleDrawerIcon} from '@/navigation/Components/DrawerNavigator';

import style from '@/navigation/Components/DrawerNavigator/Components/CustomDrawerContent/style';
import {verticalScale} from '@/assets/styles/scaling';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {colors} = useTheme();

  const isDrawerOpen = useDrawerStatus() === 'open';

  const insets = useSafeAreaInsets();

  const handleStatusBarBackgroundColor = useCallback(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(
        isDrawerOpen ? colors.transparent : colors.background,
      );
    }
  }, [colors.background, colors.transparent, isDrawerOpen]);

  const handleNavigation = useCallback(
    (route: string) => () => {
      props.navigation.closeDrawer();
      props.navigation.navigate(route);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(
    () => handleStatusBarBackgroundColor(),
    [handleStatusBarBackgroundColor],
  );

  useEffect(() => {
    return () => handleStatusBarBackgroundColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        style.container,
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom || verticalScale(24),
        },
      ]}>
      <SideBarHeader />
      <DrawerItemList {...props} />
      <DrawerItem
        label={routes.Notifications}
        icon={handleDrawerIcon(routes.Notifications)}
        onPress={handleNavigation(routes.Notifications)}
      />
      <DrawerItem
        label={routes.Settings}
        icon={handleDrawerIcon(routes.Settings)}
        onPress={handleNavigation(routes.Settings)}
      />
      <DrawerItem
        label={routes.Profile}
        icon={handleDrawerIcon(routes.Profile)}
        onPress={handleNavigation(routes.Profile)}
      />
      <SideBarFooter />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
