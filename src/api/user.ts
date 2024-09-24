import store from '@/redux/store';

import {delay} from '@/assets/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TState as TUser, logIn} from '@/redux/reducers/user';

export const signInHandler = async (
  username: string,
  password: string,
  isRememberMe: boolean,
): Promise<void> => {
  try {
    await delay(500);

    const user: TUser = {
      userId: new Date().toISOString(),
      userName: 'Guest',
      email: username,
      fullName: username,
      image: '',
    };

    if (isRememberMe) {
      await AsyncStorage.setItem('rememberMe', username);
    } else {
      await AsyncStorage.removeItem('rememberMe');
    }

    store.dispatch(logIn(user));
  } catch (error: any) {
    throw error;
  }
};
