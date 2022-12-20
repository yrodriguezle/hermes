import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

import { BellOutlined, SettingOutlined } from '@ant-design/icons';

import hermesBackgound from '../../assets/img/2222775.png';
import TextField from '../CommonComponents/formComponents/TextField';
import Persona from './Persona';

function Header() {
  const user = useSelector((state) => state.user);
  return (
    <Box sx={{ flexGrow: 1 }} className="header-bar">
      <Toolbar variant="dense">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img width={40} src={hermesBackgound} alt="" />
          <Typography component="h1" variant="h5" sx={{ marginLeft: 1, fontFamily: 'Anton' }}>
            Hermes ERP
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <TextField />
          <IconButton
            aria-label="notifications"
            size="small"
            sx={{
              marginLeft: 1,
            }}
          >
            <BellOutlined />
          </IconButton>
          <IconButton
            aria-label="settings"
            size="small"
            sx={{
              marginLeft: 1,
            }}
          >
            <SettingOutlined />
          </IconButton>
          <Persona
            alt={`${user.firstName} ${user.lastName}`}
            text={`${user.firstName} ${user.lastName}`}
            sx={{
              marginLeft: 1,
            }}
          />
        </Box>
      </Toolbar>
    </Box>
  );
}

export default Header;
