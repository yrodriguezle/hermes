import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../../Common/auth';
import Dimmer from '../CommonComponents/Dimmer';
import Header from './Header';

function Layout({
  children,
}) {
  const user = useSelector((state) => state.user);
  const isUserLogged = useMemo(() => !!(isAuthenticated() && user), [user]);

  if (!isUserLogged) {
    return (
      <Dimmer open={isUserLogged} />
    );
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
