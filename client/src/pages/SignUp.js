import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';    
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Textarea } from 'react-rainbow-components';
import { useState , useEffect } from 'react';
import { useForm } from "react-hook-form";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  
  const { register, handleSubmit } = useForm();
  
  const navigate = useNavigate();

  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [firstErr , setfirstErr] = useState("")
  const [lastErr , setlastErr] = useState("")
  const [emailErr , setemailErr] = useState("")
  const [passwordErr , setpasswordErr] = useState("")
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth) {
      navigate('/dashboard', { replace: true });
    }
  },[])



  const handlSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (firstName !== "" && lastName !=="" && email !=="" && password !=="" ){
    await Axios.post('http://localhost:3001/signup', {
      firstName,
      lastName, 
      email,
      password,
    }).then((response) => {
      alert('successful')
      // console.log(response.data.auth);
      console.log(response.data);
      localStorage.setItem("user" , JSON.stringify(response.data));

      navigate('/dashboard', { replace: true });
      
    });
  }
  else{
    if(firstName === ""){
      // const err = "firstName" ;
      setfirstErr("firstname");
    }
    if(lastName === ""){
      // const err = "lastName" ;
      setlastErr("lastname");

    }
    if(email === ""){
      // const err = "email" ;
      setemailErr("email");
    }
    if(password ===""){
      // const err = "password"
      setpasswordErr("password");

    }
  }
  console.log(firstErr);
};


  const handleClick = () => {
    navigate('/login', { replace: true });
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handlSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                
                { firstErr === "" ?
                  <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  label="First Name"
                  autoFocus
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                   />
                  : 
                  <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setfirstErr("");
                  }}
                  /> 
                }                
              </Grid>
              <Grid item xs={12} sm={6}>
                { lastErr === "" ? 
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    //   setErr("LastName");
                    }}
                  />
                  :
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setlastErr("");
                    }}
                  />
                }
              </Grid>
              <Grid item xs={12}>
                { emailErr === "" ? 
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  :
                  <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setemailErr("");
                      }}
                  />
              }
              </Grid>
              <Grid item xs={12}>
                { passwordErr === "" ? 

                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    //   setErr("password")

                    }}
                  />
                  :
                  <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setpasswordErr("")

                  }}
                />
              }
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={handleClick}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}