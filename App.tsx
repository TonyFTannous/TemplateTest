import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import BootSplash from 'react-native-bootsplash';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Appearance, StatusBar, useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OverLay from '@/components/OverLay';
import RootNavigation from '@/navigation/RootNavigation';

import {darkTheme, lightTheme} from '@/theme';
import store, {persistor} from '@/redux/store';

const App = () => {
  const scheme = useColorScheme();

  useEffect(() => {
    const populateTheme = async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (theme !== null && ['dark', 'light'].indexOf(theme) >= 0) {
        Appearance.setColorScheme(theme as 'dark' | 'light');
      } else {
        Appearance.setColorScheme(null);
      }
    };
    populateTheme();
    BootSplash.hide({fade: true});
  }, []);

  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <StatusBar
          translucent
          backgroundColor={
            scheme === 'dark'
              ? darkTheme.colors.background
              : lightTheme.colors.background
          }
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        />
        <Provider store={store}>
          <PersistGate
            persistor={persistor}
            loading={<OverLay text="Loading ..." isIndicator />}>
            <NavigationContainer
              theme={scheme === 'dark' ? darkTheme : lightTheme}>
              <RootNavigation />
              {/* <SwitchToRNDebuger /> */}
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
