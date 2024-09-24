import {createSlice} from '@reduxjs/toolkit';

export type TState = {
  userId: string;
  userName: string;
  email: string;
  fullName: string;
  image: string;
};

const initialState: TState = {
  userId: '',
  userName: '',
  email: '',
  fullName: '',
  image: '',
};

// Creating a new slice of the store named "user" with its own set of reducers
export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    resetToInitialState: () => {
      return initialState;
    },
    logIn: (state, action) => {
      return {...state, ...action.payload};
    },
    updateToken: (state, action) => {
      return {...state, ...action.payload};
    },
  },
});

export const {logIn, resetToInitialState, updateToken} = user.actions;

export default user.reducer;
