import React from 'react';
import {useSelector} from 'react-redux';

import {Authenticated, NonAuthenticated} from '@/navigation/MainNavigation';

import {TState as userTState} from '@/redux/reducers/user';

const RootNavigation = () => {
  const user = useSelector((state: {user: userTState}) => state.user);

  return user.email ? <Authenticated /> : <NonAuthenticated />;
};

export default RootNavigation;
