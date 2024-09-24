import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '@/screens/Login';
import Profile from '@/screens/Profile';
import Settings from '@/screens/Settings';
import Notifications from '@/screens/Notifications';
// import Registration from '@/screens/Registration';
import DrawerNavigation from '@/navigation/Components/DrawerNavigator';

import {routes} from '@/navigation/routes';

const Stack = createNativeStackNavigator();

export const NonAuthenticated: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.Login}
      screenOptions={{
        header: () => null,
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={routes.Login} component={Login} />
      {/* <Stack.Screen name={routes.Registration} component={Registration} /> */}
    </Stack.Navigator>
  );
};

export const Authenticated: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes.Login}
      screenOptions={{
        header: () => null,
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={routes.Drawer} component={DrawerNavigation} />
      <Stack.Screen name={routes.Notifications} component={Notifications} />
      <Stack.Screen name={routes.Settings} component={Settings} />
      <Stack.Screen name={routes.Profile} component={Profile} />
    </Stack.Navigator>
  );
};

//*[a] screen option to animate from bottom to top
// presentation: 'modal', // Required to achieve the bottom-to-top animation
// animation: 'slide_from_bottom', // Defines the animation style
