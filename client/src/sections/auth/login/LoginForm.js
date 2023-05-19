import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Checkbox, IconButton, InputAdornment, Link, Snackbar, Stack, TextField } from '@mui/material';
// components
import CloseIcon from '@mui/icons-material/Close';
// import { Snackbar } from '@mui/material';
import Axios from 'axios';
import Iconify from '../../../components/iconify';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/dashboard', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    // Validate email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputValue);

    setEmailError(!isValidEmail);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    // Perform validation before sending request to the server
    if (emailError) {
      // Display an error message or perform any other action
      return;
    }
    Axios.post('http://localhost:3001/login', {
      email,
      password,
    }).then((response) => {
      if (response.data.message) {
        // alert('Please enter correct credential');
        setOpen(true);
      } else {
        console.log(response);
        if (response.data.auth) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('jwt', response.data.auth);

          navigate('/dashboard', { replace: true });
        }
      }
    });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          helperText={emailError ? 'Invalid email format' : ''}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        message="Please enter correct credential"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleNotificationClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      {/* <Account firstName = "ghdg" Email = "hjdhfjdh" /> */}
    </>
  );
}
