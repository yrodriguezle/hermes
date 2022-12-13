import React, {
  useEffect, useRef,
} from 'react';
import {
  useSelector,
} from 'react-redux';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { isAuthenticated } from './Common/auth';
import useClearCache from './useClearCache';
import darkTheme from './Common/theme/darkTheme';
import lightTheme from './Common/theme/lightTheme';
import PrivateRoutes from './Components/CommonComponents/router/PrivateRoutes';
import LoginPage from './Pages/LoginPage';
import useThemeDetector from './Components/CommonComponents/hooks/useThemeDetector';
import useBootstrapUser from './Graphql/user/useBootstrapUser';

function App() {
  const effectRan = useRef(false);
  const user = useSelector((state) => state.user);
  const isThemeDark = useSelector((state) => state.settings?.darkTheme);
  const bootstrapUser = useBootstrapUser();
  useClearCache();
  useThemeDetector();

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== 'development') {
      if (isAuthenticated() && !user) {
        bootstrapUser();
      }
    }
    return () => { effectRan.current = true; };
  }, [bootstrapUser, user]);

  return (
    <ThemeProvider theme={isThemeDark ? darkTheme : lightTheme}>
      <Routes>
        <Route
          index
          path={`${global.ROOT_URL}/*`}
          element={
            isAuthenticated()
              ? (
                <PrivateRoutes
                  uiFunctions={[]}
                />
              ) : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/login"
          element={(
            <LoginPage
              uiFunctions={[]}
            />
          )}
        />
        <Route path="*" element={<Navigate to={global.ROOT_URL} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
