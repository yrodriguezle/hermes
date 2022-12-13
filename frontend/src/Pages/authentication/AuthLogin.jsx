import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import hermesBackgound from '../../assets/img/2222775.png';
import LoginForm from './LoginForm';
import useSubmitLogin from '../../Graphql/user/useSubmitLogin';
import { setAuthToken, setRememberPassword } from '../../Common/auth';
import isEmpty from '../../Common/tools/isEmpty';
import useMakeLogin from '../../Graphql/user/useMakeLogin';

const Schema = Yup.object().shape({
  username: Yup.string().required('Il nome utente è obbligatorio.'),
  password: Yup.string().required('La password è obbligatoria.'),
  alwaysConnected: Yup.boolean(),
});

function Copyright(props) {
  return (
    <Typography variant="caption" color="text.secondary" align="center" {...props}>
      {global.COPYRIGHT}
    </Typography>
  );
}

function AuthLogin() {
  const [redirectCount, setRedirectCount] = useState(0);
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const submitLogin = useSubmitLogin();
  const makeLogin = useMakeLogin();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(user) && redirectCount < 3) {
      setRedirectCount((prev) => prev + 1);
      setTimeout(() => navigate(global.ROOT_URL, { replace: true }), 0);
    }
  }, [user, navigate, redirectCount]);

  const handleSubmit = useCallback(
    async (values) => {
      try {
        setMessage('');
        const { username, password } = values;
        const data = await submitLogin({ username, password });
        if (!isEmpty(data)) {
          const { token, refreshToken } = data;
          setAuthToken({ token, refreshToken });
          setRememberPassword(values.alwaysConnected);

          await makeLogin();
        }
      } catch (error) {
        setMessage(error.message);
      }
    },
    [makeLogin, submitLogin],
  );

  return (
    <div className="login-card" style={{ background: theme.palette.background.default }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {message ? (
            <Alert severity="error" sx={{ mb: 2 }}>{message}</Alert>
          ) : null}
          <div className="box" style={{ background: 'transparent' }}>
            <img width={60} src={hermesBackgound} alt="" />
            <Typography component="h1" variant="h5" sx={{ marginLeft: 1, fontFamily: 'Anton' }}>
              Hermes CRM
            </Typography>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              username: '',
              password: '',
              alwaysConnected: true,
            }}
            initialStatus={{
              formStatus: 'INSERT',
              isFormLocked: false,
            }}
            validationSchema={Schema}
            onSubmit={handleSubmit}
          >
            <LoginForm />
          </Formik>
        </Box>
        <Copyright sx={{ mt: 1, mb: 1, fontSize: '0.7rem' }} />
      </Container>
    </div>
  );
}

export default AuthLogin;
