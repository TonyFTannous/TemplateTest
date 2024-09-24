/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
//import {NativeModules} from 'react-native';

//* dayjs configuration
import 'dayjs/locale/en';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import App from './App';

import {name as appName} from './app.json';

// if (__DEV__) {
//   NativeModules.DevSettings.setIsDebuggingRemotely(true);
// }

dayjs.extend(customParseFormat);

AppRegistry.registerComponent(appName, () => App);
