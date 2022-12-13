import React from 'react';
import { useFormikContext } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormikTextField from '../../Components/CommonComponents/formComponents/FormikTextField';
import FormikCheckbox from '../../Components/CommonComponents/formComponents/FormikCheckbox';
import useFocusToFieldError from '../../Components/CommonComponents/hooks/useFocusToFieldError';

function LoginForm() {
  const { isSubmitting, handleSubmit } = useFormikContext();
  useFocusToFieldError();
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box sx={{ mt: 1 }}>
        <FormikTextField
          label="Nome utente:"
          placeholder="Nome utente"
          name="username"
          margin="normal"
          autoComplete="off"
          autoFocus
          required
          fullWidth
        />
        <FormikTextField
          label="Password:"
          placeholder="Password"
          name="password"
          type="password"
          margin="normal"
          autoComplete="off"
          required
          fullWidth
        />
        <FormikCheckbox
          label="Rimani connesso"
          name="alwaysConnected"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          disabled={isSubmitting}
        >
          Connetti
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
