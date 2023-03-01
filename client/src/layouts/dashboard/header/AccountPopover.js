import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
// mocks_
// import LogOut from '../../../sections/auth/login/Logout';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../App'

import account from '../../../_mock/account';
// import LogOut from 'src/sections/auth/login/Logout';
// import (logOut) from '../../sections/@dashboard/logout'

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
    // LogOut();

    // navigate('/login', { replace: true });
    // localStorage.removeItem("user")

  };

  const LogOut = () => {
    

    navigate('/login', { replace: true });
    localStorage.removeItem("user")
    localStorage.removeItem("loggedtime")
    localStorage.removeItem("start")
    localStorage.removeItem("loggedDuration")
    localStorage.removeItem("break")
    localStorage.removeItem("breakduration")
    // localStorage.removeItem("jwt")



  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <MyContext.Consumer>
                  {
                    (data) => {
                      return(
                        <Typography variant="subtitle2" noWrap>
                        {data.data.name}
                        </Typography>
                      )
                    }
                  }
          </MyContext.Consumer>
          <MyContext.Consumer>
                  {
                    (data) => {
                      return(
                        
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {data.data.email}
                        </Typography>
                      )
                    }
                  }
          </MyContext.Consumer>
          
            {/* {account.displayName} */}


        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={LogOut} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
