import React, {
  Suspense,
  lazy,
  useMemo,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Layout from '../../Layout/Layout';
import HomePage from '../../../Pages/HomePage';
import ModuleErrorBoundary from './ModuleErrorBoundary';
import ViewAccessDenied from './ViewAccessDenied';
import ProfilePage from '../../../Pages/ProfilePage';

const Loader = (
  <Box sx={{ display: 'flex', height: 'calc(100vh - 88px)' }}>
    <CircularProgress />
  </Box>
);

function PrivateRoutes({
  userPermissions = [],
  menuLinks = [],
}) {
  const userRoutes = useMemo(
    () => ((menuLinks.length)
      ? menuLinks.filter((route) => route.filePath && route.viewName && route.urlPath)
      : []),
    [menuLinks],
  );

  return (
    <Layout menuLinks={menuLinks}>
      <Routes>
        <Route path="/" element={<HomePage routes={userRoutes} />} />
        <Route exact path="profilo" element={<ProfilePage />} />
        {
          userRoutes.map(({
            filePath, viewName, urlPath = '', description, functionName,
          }) => {
            const accessDenied = userPermissions.find((permission) => (permission.functionName === functionName && permission.userCannotShowView));
            const path = urlPath.startsWith('/') ? urlPath.replace('/', '') : urlPath;
            if (accessDenied) {
              return (
                <Route key={path} path={path} element={<ViewAccessDenied />} />
              );
            }
            const Component = lazy(
              () => {
                window.document.title = `Hermes - ${description}`;
                return import(`../../${filePath}/${viewName}`);
              },
              'default',
            );
            return (
              <Route
                key={path}
                exact
                path={path}
                element={(
                  <ModuleErrorBoundary>
                    <Suspense fallback={Loader}>
                      <Component
                        urlPath={path}
                        viewName={viewName}
                        description={description}
                        functionName={functionName}
                        userPermissions={userPermissions}
                      />
                    </Suspense>
                  </ModuleErrorBoundary>
                )}
              />
            );
          })
        }
      </Routes>
    </Layout>
  );
}

export default PrivateRoutes;
