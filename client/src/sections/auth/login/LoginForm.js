import { useState , useContext, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Axios from 'axios';
// import Account from '../../../_mock/account';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  // const history = useHistory();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth) {
      navigate('/dashboard', { replace: true });
    }
  },[])

  const handleClick = async() => {
  //   Axios.post('http://localhost:3001/login', {
  //     email,
  //     password
  //   } ,headers={"Content-Type": "application/json"}).then((response) => {
  //     // console.log(email);
  //     // alert('successful')
  //     if(response.data.message){
  //       alert("Please enter correct credential");
  //     }
  //     else{
  //       console.log(response);
  //       if(response.data.auth){
  //         localStorage.setItem("user" , JSON.stringify(response.data));
  //         navigate('/dashboard', { replace: true });
  //         // response.cookie("token",response.data.auth ,{httpOnly : true, expires:"2h"})

  //         // const userid =  localStorage.getItem("user");
  //         const id = response.data.result[0].idusers;
  //         const date= new Date();
  //         const localDate = date.toLocaleDateString()
  //         Axios.post('http://localhost:3001/loggedstatus' , {
  //         id,
  //         localDate,
  //         }).then((response)=>{
  //           console.log(response.data.res[0]);
  //           if(response.data.res[0].status === 0){
  //           localStorage.setItem("start",response.data.res[0].clockInTime)
  //   //         localStorage.removeItem("loggedtime")
  //   // localStorage.removeItem("loggedDuration")
  //   // localStorage.removeItem("break")
  //   localStorage.setItem("breakduration",response.data.res[0].break)
  //         }
  //         })


  //       }
  //     }
  // });


      // const { email, password } = loginData;

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        
      });

      // const body = await res.json();

      const data = await response.json()
      console.log(data)

      if(response.status !== 200){
              alert("Please enter correct credential");
            }
      else{
          console.log(response);
            if(data.auth){
                localStorage.setItem("user" , JSON.stringify(data));
                navigate('/dashboard', { replace: true });
                // response.cookie("token",response.data.auth ,{httpOnly : true, expires:"2h"})
      
                // const userid =  localStorage.getItem("user");
                const id = data.result[0].idusers;
                const date= new Date();
                const localDate = date.toLocaleDateString()
                Axios.post('http://localhost:3001/loggedstatus' , {
                id,
                localDate,
                }).then((response)=>{
                  console.log(response.data.res[0]);
                  if(response.data.res[0].status === 0){
                  localStorage.setItem("start",response.data.res[0].clockInTime)
          //         localStorage.removeItem("loggedtime")
          // localStorage.removeItem("loggedDuration")
          // localStorage.removeItem("break")
          localStorage.setItem("breakduration",response.data.res[0].break)
                }
                })
      
      
              }
            }
    
  };


  

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }} 
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
      {/* <Account firstName = "ghdg" Email = "hjdhfjdh" /> */}
    </>
  );
}
