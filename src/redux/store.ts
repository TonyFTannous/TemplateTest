import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import user from '@/redux/reducers/user';

// Configuring the redux-persist library to persist the user reducer with AsyncStorage
const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  version: 1,
};

// Apply the persist reducer to the user reducer
const persistedUserReducer = persistReducer(userPersistConfig, user);

const rootReducer = combineReducers({
  user: persistedUserReducer,
});

const store = configureStore({
  reducer: rootReducer,

  // Using the getDefaultMiddleware function from the Redux Toolkit to add default middleware to the store
  // We're passing in an object with the serializableCheck key set to false to avoid serialization errors with non-serializable data
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// Create the persistor to persist the store
export const persistor = persistStore(store);

export default store;
